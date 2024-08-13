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

export const getDateFromWeek = (year: number, week: number): Date => {
  const simple = new Date(year, 0, 1 + (week - 1) * 7);
  const dow = simple.getDay();
  const ISOweekStart = simple;
  if (dow <= 4) ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
  else ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
  return ISOweekStart;
};

export const getCurrentWeek = () => {
  const today = new Date();
  const utcToday = new Date(
    Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate())
  );
  const startOfYear = new Date(utcToday.getFullYear(), 0, 1);
  const weekNumber = Math.ceil(
    ((utcToday.getTime() - startOfYear.getTime()) / 86400000 +
      startOfYear.getDay() +
      1) /
      7
  );
  return `${utcToday.getFullYear()}-W${weekNumber.toString().padStart(2, "0")}`;
};

export const getStartOfWeek = (date: Date = new Date()): Date => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
  return new Date(d.setDate(diff));
};

export const isWeekPassed = (weekStr: string): boolean => {
  const [year, week] = weekStr.split("-W").map(Number);
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentWeek = getCurrentWeek().split("-W")[1];

  if (year < currentYear) return true;
  if (year > currentYear) return false;
  return week < Number(currentWeek);
};

export function getNextWeekStartUT(): Date {
  const now = new Date();
  const dayOfWeek = now.getUTCDay(); // 0 (Sunday) to 6 (Saturday)
  const daysUntilNextWeek = 7 - dayOfWeek;

  const nextWeekStart = new Date(now);
  nextWeekStart.setUTCDate(now.getUTCDate() + daysUntilNextWeek);
  nextWeekStart.setUTCHours(0, 0, 0, 0);
  return nextWeekStart;
}
