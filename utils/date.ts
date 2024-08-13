const getNowUTC = () => {
  const now = new Date();
  return new Date(
    Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      now.getUTCHours(),
      now.getUTCMinutes(),
      now.getUTCSeconds()
    )
  );
};

export const getCurrentWeek = () => {
  const now = getNowUTC();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const weekNumber = Math.ceil(
    ((now.getTime() - startOfYear.getTime()) / 86400000 +
      startOfYear.getDay() +
      1) /
      7
  );
  return `${now.getFullYear()}-W${weekNumber.toString().padStart(2, "0")}`;
};

export const isWeekPassed = (weekStr: string) => {
  const [year, week] = weekStr.split("-W").map(Number);
  const currentDate = getNowUTC();
  const currentYear = currentDate.getFullYear();
  const currentWeek = getCurrentWeek().split("-W")[1];

  if (year < currentYear) return true;
  if (year > currentYear) return false;
  return week < Number(currentWeek);
};

export const getNextWeekStartUTC = () => {
  const now = new Date();
  const dayOfWeek = now.getUTCDay();
  const daysUntilNextWeek = 7 - dayOfWeek;

  const nextWeekStart = new Date(now);
  nextWeekStart.setUTCDate(now.getUTCDate() + daysUntilNextWeek);
  nextWeekStart.setUTCHours(0, 0, 0, 0);
  return nextWeekStart;
};
