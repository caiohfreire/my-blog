import { format, isValid } from "date-fns";

export const Format = (data: any) => {
  const dateObject = new Date(data);

  if (!isValid(dateObject)) {
    return "Invalid Date";
  }

  const formattedData = format(dateObject, "MMM dd', ' yyyy HH:mm");
  return formattedData;
}