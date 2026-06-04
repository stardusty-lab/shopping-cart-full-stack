import type { ElementType } from "react";

import type { PolymorphicProps } from "@/core/components/View";

export type AS = "div";

export type OwnProps = { img: string };

export type Props<T extends ElementType = AS> = PolymorphicProps<T, OwnProps>;
