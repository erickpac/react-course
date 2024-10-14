import { useReducer } from "react";
import { languageReducer, initialState } from "../reducers/language";
import { type FromLanguage, type Language } from "../types/types.d";

export function useStore() {
  // 3: use the hook reducer to manage the state
  const [{ fromLanguage, toLanguage, fromText, result, loading }, dispatch] =
    useReducer(languageReducer, initialState);

  const swapLanguages = () => {
    dispatch({ type: "SWAP_LANGUAGES" });
  };

  const setFromLanguage = (payload: FromLanguage) => {
    dispatch({ type: "SET_FROM_LANGUAGE", payload });
  };

  const setToLanguage = (payload: Language) => {
    dispatch({ type: "SET_TO_LANGUAGE", payload });
  };

  const setFromText = (payload: string) => {
    dispatch({ type: "SET_FROM_TEXT", payload });
  };

  const setResult = (payload: string) => {
    dispatch({ type: "SET_RESULT", payload });
  };

  return {
    fromLanguage,
    toLanguage,
    fromText,
    result,
    loading,
    swapLanguages,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult,
  };
}
