import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, X, Image } from "lucide-react"
import { projectApi } from "@/lib/projects/projectMethods"
import toast from "react-hot-toast"
import NextImage from "next/image"

interface ImageUploadProps {
  projectId: string
  photos: string[]
  onPhotosUpdate: (photos: string[]) => void
}

export function ImageUpload({ projectId, photos, onPhotosUpdate }: ImageUploadProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [previewUrls, setPreviewUrls] = useState<string[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Convert image to WebP format (helper function)
  const convertToWebP = async (file: File, options: {
    maxSizeMB: number
    maxWidthOrHeight: number
    quality: number
  }): Promise<File> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const img = document.createElement('img')
      
      img.onload = () => {
        // Calculate new dimensions
        const { maxWidthOrHeight } = options
        let { width, height } = img
        
        if (width > height) {
          if (width > maxWidthOrHeight) {
            height = (height * maxWidthOrHeight) / width
            width = maxWidthOrHeight
          }
        } else {
          if (height > maxWidthOrHeight) {
            width = (width * maxWidthOrHeight) / height
            height = maxWidthOrHeight
          }
        }
        
        canvas.width = width
        canvas.height = height
        
        // Draw and convert
        ctx?.drawImage(img, 0, 0, width, height)
        canvas.toBlob((blob) => {
          if (blob) {
            const webpFile = new File([blob], file.name.replace(/\.[^/.]+$/, '.webp'), {
              type: 'image/webp',
              lastModified: Date.now()
            })
            resolve(webpFile)
          } else {
            resolve(file) // Fallback to original
          }
        }, 'image/webp', options.quality)
      }
      
      img.src = URL.createObjectURL(file)
    })
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return

    // Validate file types
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
    const invalidFiles = files.filter(file => !allowedTypes.includes(file.type))
    
    if (invalidFiles.length > 0) {
      toast.error(`Invalid file types: ${invalidFiles.map(f => f.name).join(', ')}. Only JPEG, PNG, WebP, and GIF are allowed.`)
      return
    }

    // Check file size (10MB limit per file)
    const oversizedFiles = files.filter(file => file.size > 10 * 1024 * 1024)
    if (oversizedFiles.length > 0) {
      toast.error(`Files too large: ${oversizedFiles.map(f => f.name).join(', ')}. Maximum 10MB per file.`)
      return
    }

    // Check total number of files (max 10 per upload)
    if (selectedFiles.length + files.length > 10) {
      toast.error(`Too many files. Maximum 10 images per upload. Currently selected: ${selectedFiles.length}`)
      return
    }

    setSelectedFiles(prev => [...prev, ...files])
    
    // Create preview URLs
    const newPreviewUrls = files.map(file => URL.createObjectURL(file))
    setPreviewUrls(prev => [...prev, ...newPreviewUrls])
  }

  const removeSelectedFile = (index: number) => {
    // Revoke the object URL to prevent memory leaks
    URL.revokeObjectURL(previewUrls[index])
    
    setSelectedFiles(prev => prev.filter((_, i) => i !== index))
    setPreviewUrls(prev => prev.filter((_, i) => i !== index))
  }

  const clearSelectedFiles = () => {
    // Revoke all object URLs
    previewUrls.forEach(url => URL.revokeObjectURL(url))
    
    setSelectedFiles([])
    setPreviewUrls([])
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleUploadImages = async () => {
    if (selectedFiles.length === 0) {
      toast.error('Please select images to upload')
      return
    }

    setIsUploading(true)
    try {
      // Convert images to WebP format
      const convertedFiles = await Promise.all(
        selectedFiles.map(async (file) => {
          try {
            return await convertToWebP(file, {
              maxSizeMB: 2,
              maxWidthOrHeight: 1920,
              quality: 0.85
            })
          } catch (error) {
            console.error(`Failed to convert ${file.name}:`, error)
            // Fallback to original file if conversion fails
            return file
          }
        })
      )

      // Upload the converted images
      const response = await projectApi.uploadProjectImages(projectId, convertedFiles)
      
      if (response.data.uploadedImages) {
        // Update the photos array
        const newPhotos = [...photos, ...response.data.uploadedImages]
        onPhotosUpdate(newPhotos)
        
        toast.success(`Successfully uploaded ${response.data.count} images`)
        clearSelectedFiles()
      }
    } catch (error) {
      console.error('Error uploading images:', error)
      toast.error('Failed to upload images. Please try again.')
    } finally {
      setIsUploading(false)
    }
  }

  const removePhoto = (index: number) => {
    const newPhotos = photos.filter((_, i) => i !== index)
    onPhotosUpdate(newPhotos)
    toast.success('Photo removed from project')
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Images</CardTitle>
        <CardDescription>Upload project images or manage existing photos</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Photos */}
        {photos.length > 0 && (
          <div>
            <Label>Current Photos ({photos.length})</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
              {photos.map((photo, index) => (
                <div key={index} className="relative group">
                  <NextImage
                    src={photo}
                    alt={`Project photo ${index + 1}`}
                    width={200}
                    height={128}
                    className="w-full h-32 object-cover rounded-lg border"
                  />
                  <button
                    type="button"
                    onClick={() => removePhoto(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* File Upload */}
        <div>
          <Label htmlFor="photos">Upload New Images</Label>
          <div className="flex gap-2 mt-1">
            <Input
              ref={fileInputRef}
              id="photos"
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="flex-1"
            >
              <Image className="mr-2 h-4 w-4" aria-hidden="true" />
              Browse Images
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Select up to 10 images (JPEG, PNG, WebP, GIF). Max 10MB per file.
          </p>
        </div>

        {/* Selected Files Preview */}
        {selectedFiles.length > 0 && (
          <div>
            <Label>Selected Files ({selectedFiles.length})</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
              {previewUrls.map((url, index) => (
                <div key={index} className="relative group">
                  <NextImage
                    src={url}
                    alt={`Preview ${index + 1}`}
                    width={200}
                    height={128}
                    className="w-full h-32 object-cover rounded-lg border"
                  />
                  <button
                    type="button"
                    onClick={() => removeSelectedFile(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-3 w-3" />
                  </button>
                  <div className="absolute bottom-1 left-1 bg-black bg-opacity-50 text-white text-xs px-1 rounded">
                    {selectedFiles[index].name.length > 15 
                      ? selectedFiles[index].name.substring(0, 15) + '...'
                      : selectedFiles[index].name
                    }
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Upload Actions */}
        {selectedFiles.length > 0 && (
          <div className="flex gap-2">
            <Button
              type="button"
              onClick={handleUploadImages}
              disabled={isUploading}
              className="flex-1"
            >
              {isUploading ? (
                <>
                  <Upload className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload {selectedFiles.length} Image{selectedFiles.length > 1 ? 's' : ''}
                </>
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={clearSelectedFiles}
              disabled={isUploading}
            >
              Clear
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}