"use client";

import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
}

function Skeleton({ className, ...props }: SkeletonProps) {
    return (
        <div
            className={cn(
                "animate-pulse rounded-md bg-gray-200 dark:bg-gray-800",
                className
            )}
            {...props}
        />
    );
}

// Profile Card Skeleton
function ProfileCardSkeleton() {
    return (
        <div className="h-[480px] rounded-2xl overflow-hidden bg-white">
            <Skeleton className="h-[240px] w-full" />
            <div className="flex flex-col items-center -mt-22 px-3 pb-5 gap-5">
                <Skeleton className="size-44 rounded-full" />
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-5 w-32" />
                <div className="flex gap-4">
                    <Skeleton className="h-6 w-6 rounded" />
                    <Skeleton className="h-6 w-6 rounded" />
                    <Skeleton className="h-6 w-6 rounded" />
                    <Skeleton className="h-6 w-6 rounded" />
                </div>
            </div>
        </div>
    );
}

// Form Field Skeleton
function FormFieldSkeleton() {
    return (
        <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full rounded-md" />
        </div>
    );
}

// Settings Panel Skeleton
function SettingsPanelSkeleton() {
    return (
        <div className="flex flex-col bg-white rounded-2xl shadow-[0_0_4px_rgba(0,0,0,0.25)] py-5 px-4">
            <Skeleton className="h-8 w-40 mb-6" />
            <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                <FormFieldSkeleton />
                <FormFieldSkeleton />
                <FormFieldSkeleton />
                <FormFieldSkeleton />
                <FormFieldSkeleton />
                <FormFieldSkeleton />
            </div>
        </div>
    );
}

// Project Card Skeleton
function ProjectCardSkeleton() {
    return (
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            <Skeleton className="w-full h-40" />
            <div className="p-4">
                <Skeleton className="h-5 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3 mt-1" />
            </div>
        </div>
    );
}

export {
    Skeleton,
    ProfileCardSkeleton,
    FormFieldSkeleton,
    SettingsPanelSkeleton,
    ProjectCardSkeleton
};
