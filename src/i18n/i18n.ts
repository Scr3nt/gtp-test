import * as Localization from "expo-localization";
import { I18n, TranslateOptions } from "i18n-js";

import en from "./lang/en";
import fr from "./lang/fr";

type ExcludeSymbolKeys<T> = {
  [K in keyof T]: T[K] extends symbol ? never : K;
}[keyof T];

type FlattenKeys<T, Prefix extends string = ""> = T extends object
  ? {
      [K in ExcludeSymbolKeys<T>]:
        | `${Prefix}${Prefix extends "" ? "" : "."}${K & string}`
        | FlattenKeys<
            T[K],
            `${Prefix}${Prefix extends "" ? "" : "."}${K & string}`
          >;
    }[ExcludeSymbolKeys<T>]
  : Prefix;

type I18nKeys = FlattenKeys<typeof en>;

//@ts-ignore
interface CustomI18n extends I18n {
  t: (key: I18nKeys, options?: TranslateOptions | undefined) => string;
}

const i18n = new I18n({ fr, en }) as CustomI18n;

i18n.t = (key: I18nKeys, options?: TranslateOptions | undefined) => {
  return i18n.translate(key, options);
};

i18n.defaultLocale = "en";
i18n.locale = Localization.getLocales()[0].languageCode;
i18n.enableFallback = true;
export default i18n;
