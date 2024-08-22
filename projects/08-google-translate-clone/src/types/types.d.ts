import { SUPPORTED_LANGUAGES, AUTO_LANGUAGE } from "../utils/constants";

export type Language = keyof typeof SUPPORTED_LANGUAGES;
export type AutoLanguate = typeof AUTO_LANGUAGE;
export type FromLanguage = Language | AutoLanguate;

export interface State {
  fromLanguage: FromLanguage;
  toLanguage: string;
  fromText: string;
  result: string;
  loading: boolean;
}

export type Action =
  | { type: "SET_FROM_LANGUAGE"; payload: FromLanguage }
  | { type: "SET_TO_LANGUAGE"; payload: Language }
  | { type: "SET_FROM_TEXT"; payload: string }
  | { type: "SET_RESULT"; payload: string }
  | { type: "SWAP_LANGUAGES" };

export enum SectionType {
  From = "from",
  To = "to",
}
