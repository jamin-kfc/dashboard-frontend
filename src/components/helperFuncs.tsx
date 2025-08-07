export function convertDateToQueryFormat(date: Date) {
    return date.toISOString().split('T')[0]
}