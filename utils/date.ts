export const getCurrentWeek = () => {
  const now = new Date();
  const startOfYearUTC = new Date(Date.UTC(now.getUTCFullYear(), 0, 1));
  const nowUTC = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
  );
  const timeDifference = nowUTC.getTime() - startOfYearUTC.getTime();
  const dayOfYearUTC = Math.floor(timeDifference / (1000 * 60 * 60 * 24)) + 1;
  const weekNumber = Math.ceil((dayOfYearUTC + 1) / 7);

  return `${now.getUTCFullYear()}-W${weekNumber.toString().padStart(2, "0")}`;
};

export const getIsWeekPassed = (weekStr: string) => {
  const [year, week] = weekStr.split("-W").map(Number);
  const currentDate = new Date();
  const currentYear = currentDate.getUTCFullYear();
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
