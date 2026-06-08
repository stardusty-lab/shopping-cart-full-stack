import type { ElementType, ReactNode } from "react";

import type { PolymorphicProps } from "@/core/components/View";

export type AS = "div";

export type OwnProps = {
  children: ReactNode;
};

export type Props<T extends ElementType = AS> = PolymorphicProps<T, OwnProps>;

type ItemHeaderProps = {
  left?: ReactNode;
  right?: ReactNode;
};

export type ItemProps = PolymorphicProps<
  "div",
  {
    header?: ItemHeaderProps;
    children?: ReactNode;
  }
>;

export type ItemLeftProps = PolymorphicProps<
  "div",
  {
    children?: ReactNode;
  }
>;

export type ItemBoxProps = PolymorphicProps<
  "div",
  {
    title?: ReactNode;
    content?: ReactNode;
    description?: ReactNode;
  }
>;

export type ItemRightProps = PolymorphicProps<
  "div",
  {
    children?: ReactNode;
  }
>;
