import type { ElementType } from "react";

import cn from "classnames";

import { View } from "@/core/components/View";

import styles from "./Component.module.css";

import type { Props } from "./";

export const Component = <T extends ElementType>(props: Props<T>) => {
  const { as = "div", children, ...restProps } = props;
  return (
    <View as={as} className={cn(styles.component)} {...restProps}>
      {children}
    </View>
  );
};
