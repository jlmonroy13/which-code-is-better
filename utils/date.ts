export const getCurrentDate = () => {
  const today = new Date();
  const year = today.getUTCFullYear();
  const month = String(today.getUTCMonth() + 1).padStart(2, "0");
  const day = String(today.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const getNextMidnightUT = () => {
  const now = new Date();
  const nextMidnightUTC = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1)
  );
  nextMidnightUTC.setUTCHours(0, 0, 0, 0);
  return nextMidnightUTC;
};

export const isAfterToday = (dateStr: string) => {
  const inputDate = new Date(dateStr + "T00:00:00Z");

  const today = new Date();
  const todayUTC = Date.UTC(
    today.getUTCFullYear(),
    today.getUTCMonth(),
    today.getUTCDate()
  );

  return inputDate.getTime() > todayUTC;
};

export function getDateFromWeek(week: number) {
  const now = new Date();
  const yearStart = new Date(now.getFullYear(), 0, 1);
  return new Date(yearStart.getTime() + week * 7 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];
}

export const getCurrentWeek = (): string => {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const weekNumber = Math.ceil((((now.getTime() - startOfYear.getTime()) / 86400000) + startOfYear.getDay() + 1) / 7);
  return `${now.getFullYear()}-W${weekNumber.toString().padStart(2, '0')}`;
};

export const getStartOfWeek = (date: Date = new Date()): Date => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
  return new Date(d.setDate(diff));
};

export const isWeekPassed = (weekStr: string): boolean => {
  const [year, week] = weekStr.split('-W').map(Number);
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentWeek = getCurrentWeek().split('-W')[1];

  if (year < currentYear) return true;
  if (year > currentYear) return false;
  return week < Number(currentWeek);
};
