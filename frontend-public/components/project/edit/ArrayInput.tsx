import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, X } from "lucide-react"

interface ArrayInputProps {
  title: string
  description?: string
  items: string[]
  inputValue: string
  inputName: string
  placeholder: string
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onAddItem: (field: string, inputField: string, value: string) => void
  onRemoveItem: (field: string, index: number) => void
  fieldName: string
  inputFieldName: string
}

export function ArrayInput({
  title,
  description,
  items,
  inputValue,
  inputName,
  placeholder,
  onInputChange,
  onAddItem,
  onRemoveItem,
  fieldName,
  inputFieldName
}: ArrayInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      onAddItem(fieldName, inputFieldName, inputValue)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            name={inputName}
            value={inputValue}
            onChange={onInputChange}
            placeholder={placeholder}
            onKeyDown={handleKeyDown}
          />
          <Button
            type="button"
            onClick={() => onAddItem(fieldName, inputFieldName, inputValue)}
            size="sm"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        
        {items.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {items.map((item, index) => (
              <div key={index} className="flex items-center gap-1 bg-secondary px-2 py-1 rounded-md text-sm">
                <span>{item}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 hover:bg-destructive hover:text-destructive-foreground"
                  onClick={() => onRemoveItem(fieldName, index)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}