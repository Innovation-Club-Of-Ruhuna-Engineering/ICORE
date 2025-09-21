"use client";

import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import imageCompression from "browser-image-compression";

interface Point {
  x: number;
  y: number;
}

interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface ImageCropperProps {
  imageSrc: string;
  onCancel: () => void;
  onCropComplete: (croppedFile: File) => Promise<void>;
  isLoading: boolean;
}

export const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const image = document.createElement("img") as HTMLImageElement;
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error: Event) => reject(error));
    image.setAttribute("crossOrigin", "anonymous");
    image.src = url;
  });

export const getCroppedImage = async (
  imageSrc: string, 
  cropPixels: CropArea
): Promise<File> => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  canvas.width = cropPixels.width;
  canvas.height = cropPixels.height;
  const ctx = canvas.getContext("2d");

  if (!ctx) throw new Error("Canvas context not found");

  ctx.drawImage(
    image,
    cropPixels.x,
    cropPixels.y,
    cropPixels.width,
    cropPixels.height,
    0,
    0,
    cropPixels.width,
    cropPixels.height
  );

  return new Promise<File>((resolve) => {
    // Use WebP format instead of JPEG for better compression and quality
    canvas.toBlob(async (blob) => {
      if (!blob) throw new Error("Canvas is empty");
      const compressedBlob = await imageCompression(
        new File([blob], "temp.webp", { type: "image/webp" }), 
        {
          maxSizeMB: 1,
          maxWidthOrHeight: 1024,
        }
      );
      const file = new File([compressedBlob], "cropped.webp", { type: "image/webp" });
      resolve(file);
    }, "image/webp", 0.9); // 0.9 quality for WebP offers good balance between quality and size
  });
};

export default function ImageCropper({
  imageSrc,
  onCancel,
  onCropComplete,
  isLoading,
}: ImageCropperProps) {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CropArea | null>(null);

  const handleCropComplete = useCallback(
    (_: CropArea, croppedAreaPixels: CropArea) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const handleCrop = async () => {
    if (!croppedAreaPixels) return;
    
    try {
      const croppedFile = await getCroppedImage(imageSrc, croppedAreaPixels);
      await onCropComplete(croppedFile);
    } catch (error) {
      console.error("Error cropping image:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-4 w-[400px] h-[500px] flex flex-col">
        <div className="relative h-[320px] mb-4">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={1} // Square for profile
            onCropChange={setCrop}
            onCropComplete={handleCropComplete}
            onZoomChange={setZoom}
            objectFit="contain"
          />
        </div>
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">Zoom</p>
          <input
            type="range"
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            aria-labelledby="Zoom"
            onChange={(e) => setZoom(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="mt-auto flex justify-between">
          <button
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={handleCrop}
            disabled={isLoading}
          >
            {isLoading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </div>
    </div>
  );
}