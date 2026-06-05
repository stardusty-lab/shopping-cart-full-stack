import type { ElementType } from "react";

import { createClassName } from "@/core/utils/classname";

import { View } from "@/core/components/View";

import styles from "./Checkbox.module.css";

import type { Props } from "./";

const classnameDefault = "ui-checkbox";

export const Checkbox = <T extends ElementType>(props: Props<T>) => {
  console.log(props);
  const { as = "input", id, label, checked, className, ...restProps } = props;

  const modifiers = {
    checked: checked && styles[`checked`],
  };

  const classname = createClassName({
    styles,
    baseName: classnameDefault,
    modifiers,
    className,
  });

  return (
    <div className={classname}>
      <View as={as} id={id} type="checkbox" checked={checked} {...restProps} />
      <label htmlFor={id}>{label || id}</label>
    </div>
  );
};
