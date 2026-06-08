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
    min,
    max,
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

  const isMinDisabled = typeof min !== "undefined" && value <= min;
  const isMaxDisabled = typeof max !== "undefined" && value >= max;

  return (
    <View as={as} className={classname} {...restProps}>
      <button
        className={styles[`button-minus`]}
        aria-label="-"
        disabled={isMinDisabled}
        onClick={() => {
          if (isMinDisabled) return;
          onDecrement();
        }}
      ></button>
      <span className={styles[`value-item`]}>{value}</span>
      <button
        className={styles[`button-plus`]}
        aria-label="+"
        disabled={isMaxDisabled}
        onClick={() => {
          if (isMaxDisabled) return;
          onIncrement();
        }}
      ></button>
    </View>
  );
};
