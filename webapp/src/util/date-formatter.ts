import { format, parseISO } from "date-fns";

const secondaryFormat = 'dd/MM/yyyy HH:mm'

export const formatToSecondary = (value: string): string => format(parseISO(value), secondaryFormat)

export const formatToDateRange = (start: string, end: string): string =>
  `${new Date(start).toDateString()} - ${new Date(end).toDateString()}`
