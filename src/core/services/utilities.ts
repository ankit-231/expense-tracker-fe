import type { RouteLocationNormalized } from "vue-router";
import toast from "@/core/services/toast";

export function isEmpty(obj: Object | undefined | null) {
  if (obj === undefined || obj === null) {
    return true;
  }
  return Object.keys(obj).length === 0;
}

import type { UserMe } from "@/core/dtos/user";
export function generatePriorityColors(priority: string) {
  let p = priority.toString();
  switch (p) {
    case "1":
      console.log("1", priority);
      return "text-red-200";
    case "2":
      return "text-blue-200";
    case "3":
      return "text-green-200";
    case "4":
      return "text-yellow-200";
  }
}

// export const mapBackendErrors = (
//   backendErrors: BackendErrors
// ): Record<string, string> => {
//   const errors: Record<string, string> = {};
//   Object.entries(backendErrors).forEach(([field, messages]) => {
//     errors[field] = messages.join(" ");
//     // Join messages if there are multiple
//   });
//   return errors;
// };

export function toastSerializerError(errors: Record<string, string[]>) {
  Object.entries(errors).forEach(([key, value]) => {
    const messages = value.join(" ");
    toast.add({ severity: "error", summary: `${key}:`, detail: messages });
  });
}

/**
 * This function is used to determine if a user has access to a particular route.
 * It should be used for role based authentication only as it assumes the user is already authenticated.
 *
 * @param to The route the user is trying to access
 * @param userData The user's information
 * @returns true if the user has access, false otherwise
 */
export const getAccessInfo = (
  to: RouteLocationNormalized,
  userData: UserMe
) => {
  // imp: this function should be used for authenticated routes only
  return true;
};

export function getTransactionDateTime(
  transaction_date: string,
  transaction_time: string
) {
  return new Date(transaction_date + " " + transaction_time);
}

export function getTransactionDate(transaction_date_time: Date): string {
  const year = transaction_date_time.getFullYear();
  const month = String(transaction_date_time.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const day = String(transaction_date_time.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`; // Format as YYYY-MM-DD
}

export function getTransactionTime(transaction_date_time: Date): string {
  const hours = String(transaction_date_time.getHours()).padStart(2, "0");
  const minutes = String(transaction_date_time.getMinutes()).padStart(2, "0");
  const seconds = String(transaction_date_time.getSeconds()).padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`; // Format as HH:MM:SS
}

const utilities = { isEmpty, generatePriorityColors };

export default utilities;
