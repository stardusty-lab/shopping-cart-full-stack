import type { ElementType, ReactNode } from "react";

import type { PolymorphicProps } from "@/core/components/View";

export type AS = "div";

export type OwnProps = {
  title?: ReactNode;
  leading?: ReactNode;
  trailing?: ReactNode;
};

export type Props<T extends ElementType = AS> = PolymorphicProps<T, OwnProps>;

export type BackProps<T extends ElementType = "button"> = PolymorphicProps<
  T,
  OwnProps
>;
