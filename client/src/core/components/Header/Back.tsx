import type { ElementType } from "react";

import { View } from "@/core/components/View";

import styles from "./Header.module.css";

import type { BackProps } from "./";

export const Back = <T extends ElementType>(props: BackProps<T>) => {
  const {
    as = "button",

    ...restProps
  } = props;

  return <View as={as} className={styles[`header-back`]} {...restProps} />;
};
