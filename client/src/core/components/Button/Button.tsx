import type { ElementType } from "react";

import cn from "classnames";

import { View } from "@/core/components/View";

import styles from "./Button.module.css";

import type { Props } from "./";

export const Button = <T extends ElementType>(props: Props<T>) => {
  const { as = "button", children, variant, block, ...restProps } = props;
  return (
    <View
      as={as}
      className={cn(
        styles["ui-button"],
        styles[`variant-${variant}`],
        block && styles[`is-block`],
      )}
      {...restProps}
    >
      {children}
    </View>
  );
};
