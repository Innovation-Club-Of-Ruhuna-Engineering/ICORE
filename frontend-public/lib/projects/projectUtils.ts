export const PROJECT_TYPE_LABELS: Record<string, string> = {
    RESEARCH: 'Research',
    DESIGN: 'Design',
    DEVELOPMENT: 'Development',
    REXTRO_2025: 'REXTRO 2025',
    FYP: 'FYP',
    OTHER: 'Other',
};

export function formatProjectType(type?: string | null): string {
    if (!type) return '';
    const normalized = String(type).replace(/\s+/g, '_').toUpperCase(); // REXTRO 2025 => REXTRO_2025
    return PROJECT_TYPE_LABELS[normalized] ?? String(type).replace(/_/g, ' ');
}