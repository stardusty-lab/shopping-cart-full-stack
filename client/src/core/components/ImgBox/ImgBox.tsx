import type { ElementType } from "react";

import { createClassName } from "@/core/utils/classname";

import { View } from "@/core/components/View";

import styles from "./ImgBox.module.css";

import type { Props } from "./";

const classnameDefault = "ui-img-box";

export const ImgBox = <T extends ElementType>(props: Props<T>) => {
  const { as = "div", className, img, ...restProps } = props;

  const modifiers = {};

  const classname = createClassName({
    styles,
    baseName: classnameDefault,
    modifiers,
    className,
  });

  return (
    <View as={as} className={classname} {...restProps}>
      <img src={img} alt="" />
    </View>
  );
};
