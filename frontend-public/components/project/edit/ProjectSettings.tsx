import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Info } from "lucide-react"
import { type ProjectType } from "@/lib/projects/projectMethods"

interface ProjectSettingsProps {
  formData: {
    type: ProjectType
    startDate: string
    endDate: string
    isVisible: boolean
  }
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onTypeChange: (type: ProjectType) => void
  onVisibilityChange: (checked: boolean) => void
}

export function ProjectSettings({ 
  formData, 
  onChange, 
  onTypeChange, 
  onVisibilityChange 
}: ProjectSettingsProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Project Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="type">Project Type</Label>
            <Select 
              value={formData.type} 
              onValueChange={onTypeChange}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="RESEARCH">Research</SelectItem>
                <SelectItem value="DESIGN">Design</SelectItem>
                <SelectItem value="DEVELOPMENT">Development</SelectItem>
                <SelectItem value="OTHER">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch
              id="isVisible"
              checked={formData.isVisible}
              onCheckedChange={onVisibilityChange}
            />
            <Label htmlFor="isVisible">Make project public</Label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Timeline</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="startDate">Start Date</Label>
            <Input
              id="startDate"
              name="startDate"
              type="date"
              value={formData.startDate}
              onChange={onChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="endDate">End Date</Label>
            <Input
              id="endDate"
              name="endDate"
              type="date"
              value={formData.endDate}
              onChange={onChange}
            />
          </div>
        </CardContent>
      </Card>

      <Alert className="bg-blue-50 border-blue-200">
        <Info className="h-4 w-4" />
        <AlertDescription>
          Changes to project members may take some time to reflect in the system.
        </AlertDescription>
      </Alert>
    </div>
  )
}