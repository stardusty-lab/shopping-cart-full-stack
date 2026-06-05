import type { ElementType, HTMLAttributes, ReactNode } from "react";

import type { PolymorphicProps } from "@/core/components/View";

export type AS = "div";

export type OwnProps = {
  children: ReactNode;
};

export type ItemProps = PolymorphicProps<
  "div",
  {
    headerLeft?: React.ReactNode;
    headerRight?: React.ReactNode;

    left?: ReactNode;
    right?: ReactNode;

    title?: ReactNode;
    content?: ReactNode;
    description?: ReactNode;
  }
>;

export type Props<T extends ElementType = AS> = PolymorphicProps<T, OwnProps>;
