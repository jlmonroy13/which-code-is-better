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
