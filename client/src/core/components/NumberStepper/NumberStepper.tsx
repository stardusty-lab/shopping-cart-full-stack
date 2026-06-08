import type { ElementType } from "react";

import { createClassName } from "@/core/utils/classname";

import { View } from "@/core/components/View";

import styles from "./NumberStepper.module.css";

import type { Props } from "./";

const classnameDefault = "ui-number-stepper";

export const NumberStepper = <T extends ElementType>(props: Props<T>) => {
  const {
    as = "div",
    className,
    value,
    onIncrement,
    onDecrement,
    ...restProps
  } = props;

  const modifiers = {};

  const classname = createClassName({
    styles,
    baseName: classnameDefault,
    modifiers,
    className,
  });

  return (
    <View as={as} className={classname} {...restProps}>
      <button
        className={styles[`button-minus`]}
        aria-label="-"
        onClick={() => {
          onDecrement();
        }}
      ></button>
      <span className={styles[`value-item`]}>{value}</span>
      <button
        className={styles[`button-plus`]}
        aria-label="+"
        onClick={() => {
          onIncrement();
        }}
      ></button>
    </View>
  );
};
