import styles from "./List.module.css";

import type { ItemProps } from ".";

import { Left } from "./Left";
import { Box } from "./Box";
import { Right } from "./Right";

export const Item = ({ header, children, ...restProps }: ItemProps) => {
  return (
    <div className={styles.item} {...restProps}>
      {header && (
        <div className={styles.header}>
          {header.left && (
            <div className={styles.headerLeft}>{header.left}</div>
          )}
          {header.right && (
            <div className={styles.headerRight}>{header.right}</div>
          )}
        </div>
      )}

      <div className={styles.body}>{children}</div>
    </div>
  );
};

Item.Left = Left;
Item.Box = Box;
Item.Right = Right;
