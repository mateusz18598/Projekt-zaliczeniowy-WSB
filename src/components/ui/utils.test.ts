
import { cn } from './utils';

describe('cn utility', () => {
    it('merges class names correctly', () => {
        const result = cn('bg-red-500', 'text-white');
        expect(result).toContain('bg-red-500');
        expect(result).toContain('text-white');
    });

    it('handles conditional classes', () => {
        const result = cn('bg-red-500', true && 'text-white', false && 'text-black');
        expect(result).toContain('bg-red-500');
        expect(result).toContain('text-white');
        expect(result).not.toContain('text-black');
    });

    it('merges tailwind classes using tailwind-merge', () => {
        // p-4 should override p-2
        const result = cn('p-2', 'p-4');
        expect(result).toBe('p-4');
    });
});
