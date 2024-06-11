export type User = {
  backgroundImageUrl: string;
  profilePictureUrl: string;
  name: string;
  title: string;
  followers: number;
  following: number;
};

export enum Person {
  PersonA = "PersonA",
  PersonB = "PersonB",
  PersonC = "PersonC",
}

//Current date and time.
export const FormatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${day}-${month}-${year} : ${hours}:${minutes}:${seconds}`;
};
