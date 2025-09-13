'use client';

import { PublicProject, Status } from '@/lib/projects/projectMethods';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Users, Pen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface ProjectCardProps {
  project: PublicProject;
  isAdmin?: boolean;
  onToggleVisibility?: (projectId: string, isVisible: boolean) => void;
}

export function ProjectCard({ project, isAdmin = false, onToggleVisibility }: ProjectCardProps) {
  const [isVisible, setIsVisible] = useState(project.isVisible);

  const handleVisibilityToggle = (checked: boolean) => {
    setIsVisible(checked);
    onToggleVisibility?.(project.id, checked);
  };

  return (
    <Card className="hover:shadow-lg transition-shadow overflow-hidden p-0">
      <div className="relative h-48 w-full">
        <Image
          src={project.photos?.[0] || "/backdrop.jpg"}
          alt={project.name}
          fill
          className="object-cover transition-transform hover:scale-105"
          priority={false}
        />
      </div>
      <CardHeader className="p-4 pb-0">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg">
              <Link href={`/projects/view/${project.id}`} className="hover:text-blue-600 transition-colors">
                {project.name}
              </Link>
            </CardTitle>
            <p className="text-muted-foreground text-sm line-clamp-2">{project.about}</p>
          </div>
          {isAdmin && (
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                asChild
              >
                <Link href={`/projects/edit/${project.id}`}>
                  <Pen className="h-4 w-4" />
                </Link>
              </Button>
              <div className="flex items-center gap-1">
                <Switch
                  checked={isVisible}
                  onCheckedChange={handleVisibilityToggle}
                />
              </div>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-3 p-4 pt-3">

        <div className="flex flex-wrap gap-1.5">
          {project.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {project.tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{project.tags.length - 3}
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            <span>{new Date(project.startDate).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5" />
            <span>{project.membersCount + project.guestMembersCount} members</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          {project.status && (
            <Badge
              variant={
                project.status === 'ACTIVE'
                  ? 'default'
                  : project.status === 'PENDING'
                  ? 'secondary'
                  : 'destructive'
              }
              className="text-xs"
            >
              {project.status}
            </Badge>
          )}
          <Button variant="outline" size="sm" asChild>
            <Link href={`/projects/view/${project.id}`}>
              Read More
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}