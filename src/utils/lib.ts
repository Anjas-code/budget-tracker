import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

//handling className management
export const cn = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs));
};