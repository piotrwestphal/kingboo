import { format, parseISO } from "date-fns";

const secondaryFormat = 'dd/MM/yyyy HH:mm'

export const formatToSecondary = (value: string): string => format(parseISO(value), secondaryFormat)
