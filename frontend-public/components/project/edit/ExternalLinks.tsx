import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface ExternalLinksProps {
  formData: {
    websiteURL: string
    githubURL: string
    youtubeURL: string
  }
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function ExternalLinks({ formData, onChange }: ExternalLinksProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>External Links</CardTitle>
        <CardDescription>Add links to relevant external resources</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="websiteURL">Website URL</Label>
          <Input
            id="websiteURL"
            name="websiteURL"
            type="url"
            value={formData.websiteURL}
            onChange={onChange}
            placeholder="https://example.com"
          />
        </div>

        <div>
          <Label htmlFor="githubURL">GitHub URL</Label>
          <Input
            id="githubURL"
            name="githubURL"
            type="url"
            value={formData.githubURL}
            onChange={onChange}
            placeholder="https://github.com/username/repo"
          />
        </div>

        <div>
          <Label htmlFor="youtubeURL">YouTube URL</Label>
          <Input
            id="youtubeURL"
            name="youtubeURL"
            type="url"
            value={formData.youtubeURL}
            onChange={onChange}
            placeholder="https://youtube.com/watch?v=..."
          />
        </div>
      </CardContent>
    </Card>
  )
}