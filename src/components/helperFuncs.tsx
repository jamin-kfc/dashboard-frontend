import type { DateNul } from "./types";

export function convertDateToQueryFormat(date: DateNul) {

    if (date == undefined) {
        // Default value 
        return '20250101'
    }
    return date.toISOString().split('T')[0]
}