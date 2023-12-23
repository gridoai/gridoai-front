import { createI18nServer } from "next-international/server";

export const { getI18n, getScopedI18n, getStaticParams } = createI18nServer({
  en: () => import(`./en`),
  pt: () => import(`./pt`),
  undefined: () => import(`./pt`),
});

export type Scope = Parameters<typeof getScopedI18n>[0];

type ApplyFunction<F, A> = F extends (arg: A) => infer R ? R : never;

export type ScopedTranslator<S extends Scope> = Awaited<
  ApplyFunction<typeof getScopedI18n, S>
>;
