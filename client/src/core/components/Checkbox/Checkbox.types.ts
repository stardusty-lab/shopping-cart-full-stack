import type { ElementType, ReactNode } from "react";

import type { PolymorphicProps } from "@/core/components/View";

export type AS = "input";

export type OwnProps = {
  label?: ReactNode;
};

export type Props<T extends ElementType = AS> = PolymorphicProps<T, OwnProps>;
