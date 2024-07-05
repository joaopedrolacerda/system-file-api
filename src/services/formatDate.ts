
import { parse, format } from 'date-fns';

export function formatDateToDB(dateStr: string): string {
  const date = parse(dateStr, 'dd/MM/yyyy', new Date());
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date format');
  }
  return format(date, 'yyyy-MM-dd');
}
