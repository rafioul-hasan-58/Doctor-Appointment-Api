export const isOverlapOrDuplicate = (existingSlots: string[], newSlots: string[]): boolean => {
    return newSlots.some(slot => existingSlots.includes(slot));
}