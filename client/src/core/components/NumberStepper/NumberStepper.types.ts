import type { ElementType } from "react";

import type { PolymorphicProps } from "@/core/components/View";

export type AS = "div";

export type OwnProps = {
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
};

export type Props<T extends ElementType = AS> = PolymorphicProps<T, OwnProps>;
