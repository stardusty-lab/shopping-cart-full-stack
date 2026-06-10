import type { ElementType } from "react";

import type { PolymorphicProps } from "@/core/components/View";

export type AS = "button";

export type OwnProps = {
  variant?: "default" | "primary" | "secondary";
  size?: "large" | "small";
  block?: boolean;
};

export type Props<T extends ElementType = AS> = PolymorphicProps<T, OwnProps>;
