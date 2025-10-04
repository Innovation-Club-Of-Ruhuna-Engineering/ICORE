import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface BasicInformationProps {
  formData: {
    name: string
    description: string
    techDetails: string
  }
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

export function BasicInformation({ formData, onChange }: BasicInformationProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Basic Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="name">Project Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={onChange}
            placeholder="Enter project name"
            required
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={onChange}
            placeholder="Describe your project"
            rows={4}
            required
          />
        </div>

        <div>
          <Label htmlFor="techDetails">Technical Details</Label>
          <Textarea
            id="techDetails"
            name="techDetails"
            value={formData.techDetails}
            onChange={onChange}
            placeholder="Technical specifications, architecture, methodologies used..."
            rows={3}
          />
        </div>
      </CardContent>
    </Card>
  )
}