type NextSearchParams = Record<string, string | string[] | undefined>;

export default function normalizeParams(searchParams: NextSearchParams): Record<string, string> {
    return Object.entries(searchParams).reduce((acc, [key, value]) => {
        if (value === undefined) return acc;

        acc[key] = Array.isArray(value) ? value.join(',') : value;

        return acc;
    }, {} as Record<string, string>);
}