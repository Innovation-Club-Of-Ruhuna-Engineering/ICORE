'use client';

import { PublicProject } from '@/lib/projects/projectMethods';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Users, Pen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { formatProjectType } from '@/lib/projects/projectUtils';
import { Button as MovingBorderButton } from '../ui/moving-border';

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

  // Determine what media to show based on priority:
  // 1. If both images and video exist, show video (if valid video ID)
  // 2. If only video exists, show video (if valid video ID)
  // 3. If only images exist, show first image
  // 4. If neither exists or video is invalid, show backdrop/image
  const hasImages = project.photos && project.photos.length > 0;
  const hasVideo = project.youtubeURL && project.youtubeURL.trim() !== '';
  const isRextro2025 = project.type === 'REXTRO_2025';

  // Extract YouTube video ID for embed
  const getYouTubeVideoId = (url: string) => {
    if (!url) return null;
    // Handle various YouTube URL formats:
    // - https://www.youtube.com/watch?v=VIDEO_ID
    // - https://youtu.be/VIDEO_ID
    // - https://www.youtube.com/embed/VIDEO_ID
    // - https://youtube.com/watch?v=VIDEO_ID
    const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^&\n?#]+)/);
    return match ? match[1] : null;
  };

  const videoId = hasVideo && project.youtubeURL ? getYouTubeVideoId(project.youtubeURL) : null;
  const showVideo = hasVideo && videoId; // Only show video if we have a valid video ID
  const showImage = !showVideo && hasImages;
  const showBackdrop = !showVideo && !hasImages;

  return (
    <Card className="hover:shadow-lg transition-shadow overflow-hidden p-0">
      <div className="relative h-48 w-full">
        {showVideo && (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            title={project.name}
            className="w-full h-full object-cover"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
        {showImage && (
          <Image
            src={project.photos[0]}
            alt={project.name}
            fill
            className="object-cover transition-transform hover:scale-105"
            priority={false}
          />
        )}
        {showBackdrop && (
          <Image
            src="/backdrop.jpg"
            alt={project.name}
            fill
            className="object-cover transition-transform hover:scale-105"
            priority={false}
          />
        )}
      </div>
      <CardHeader className="p-4 pb-0">
        <div className="flex items-center justify-between">
          <div className="space-y-1">

            <CardTitle className="text-lg">
              <Link href={`/projects/view/${project.id}`} className="hover:text-blue-600 transition-colors">
                {project.name}
              </Link>
            </CardTitle>
            <p className="text-muted-foreground text-sm line-clamp-2">{project.description}</p>
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

        <div className="flex items-center flex-wrap gap-1.5">
          {isRextro2025 && (
            <MovingBorderButton
              borderRadius="1.75rem"
              className="bg-gradient-to-r from-[#800000] to-[#0d6efd] dark:bg-slate-900 text-white dark:text-white border-neutral-200 dark:border-slate-800"
              containerClassName='h-8 w-26 b-1'
            >
              {formatProjectType(project.type)}
            </MovingBorderButton>
          )}

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