import type { ElementType } from "react";

import { createClassName } from "@/core/utils/classname";

import { View } from "@/core/components/View";

import styles from "./Alert.module.css";

import type { Props } from "./";

const classnameDefault = "ui-alert";

export const Alert = <T extends ElementType>(props: Props<T>) => {
  const { as = "div", className, children, onClose, ...restProps } = props;

  const modifiers = {};

  const classname = createClassName({
    styles,
    baseName: classnameDefault,
    modifiers,
    className,
  });

  return (
    <View as={as} className={classname} {...restProps}>
      {children}
      <button onClick={onClose}>x</button>
    </View>
  );
};
