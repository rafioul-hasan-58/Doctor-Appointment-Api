"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isOverlapOrDuplicate = void 0;
const isOverlapOrDuplicate = (existingSlots, newSlots) => {
    return newSlots.some(slot => existingSlots.includes(slot));
};
exports.isOverlapOrDuplicate = isOverlapOrDuplicate;
