import { State, Action } from "../types/types";
import { AUTO_LANGUAGE } from "../utils/constants";

// 1: create initial state
export const initialState: State = {
  fromLanguage: "auto",
  toLanguage: "en",
  fromText: "",
  result: "",
  loading: false,
};

// 2: create a reducer function
export function languageReducer(state: State, action: Action) {
  const { type } = action;

  if (type === "SWAP_LANGUAGES") {
    if (state.fromLanguage === AUTO_LANGUAGE) return state;

    const loading = state.fromText !== "";

    return {
      ...state,
      loading,
      fromLanguage: state.toLanguage,
      toLanguage: state.fromLanguage,
    };
  }

  if (type === "SET_FROM_LANGUAGE") {
    if (state.fromLanguage === action.payload) return state;

    const loading = state.fromText !== "";

    return {
      ...state,
      loading,
      fromLanguage: action.payload,
    };
  }

  if (type === "SET_TO_LANGUAGE") {
    if (state.toLanguage === action.payload) return state;

    const loading = state.fromText !== "";

    return {
      ...state,
      loading,
      toLanguage: action.payload,
    };
  }

  if (type === "SET_FROM_TEXT") {
    const loading = action.payload !== "";

    return {
      ...state,
      fromText: action.payload,
      loading,
      result: "",
    };
  }

  if (type === "SET_RESULT") {
    return {
      ...state,
      result: action.payload,
      loading: false,
    };
  }

  return state;
}
