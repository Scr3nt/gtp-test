export const formatHour = (inputText: string) => {
  const cleanedInput = inputText.replace(/[^0-9]/g, "");

  if (cleanedInput.length <= 2) {
    return cleanedInput;
  } else {
    const hours = cleanedInput.slice(0, 2);
    const minutes = cleanedInput.slice(2);

    return `${hours}:${minutes}`;
  }
};

export const isMoreThan8HoursApart = (time1: string, time2: string) => {
  // Convertir les heures au format "hh:mm" en minutes depuis minuit
  const [hour1, minute1] = time1.split(":").map(Number);
  const [hour2, minute2] = time2.split(":").map(Number);
  const totalMinutes1 = hour1 * 60 + minute1;
  const totalMinutes2 = hour2 * 60 + minute2;

  const diffMinutes = Math.abs(totalMinutes2 - totalMinutes1);

  return diffMinutes > 480;
};
