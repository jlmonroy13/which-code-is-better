export const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return "2024-06-17" || `${year}-${month}-${day}`; // Change this when push to prod
};

export const getNextMidnightUT = () => {
  const now = new Date();
  const nextMidnightUTC = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1)
  );
  nextMidnightUTC.setUTCHours(0, 0, 0, 0);
  return nextMidnightUTC;
};
