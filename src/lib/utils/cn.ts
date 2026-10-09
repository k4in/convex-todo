import { type ClassValue, cn as mergeClassNames } from "cn";

export function cn(...inputs: ClassValue[]) {
  return mergeClassNames(...inputs);
}
