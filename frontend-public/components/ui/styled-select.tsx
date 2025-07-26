import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";
import { cn } from "@/lib/utils";

interface StyledSelectProps {
    options: { value: string; label: string }[];
    defaultValue?: string;
    placeholder?: string;
    id?: string;
    className?: string;
}

export const StyledSelect = ({
    options,
    defaultValue,
    placeholder = "Select an option",
    id,
    className
}: StyledSelectProps) => {
    return (
        <Select defaultValue={defaultValue}>
            <SelectTrigger
                className={cn("w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                    className)}
                id={id}
            >
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                {options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};