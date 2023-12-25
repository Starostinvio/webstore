import { useCallback, useContext } from "react";
import { I18nContext } from "../i18n/context";
import useServices from "./use-services";

/**
 * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
 */
export default function useTranslate() {
  return useServices().I18n;
}
