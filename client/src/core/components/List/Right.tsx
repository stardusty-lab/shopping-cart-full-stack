import styles from "./List.module.css";

import type { ItemRightProps } from ".";

export const Right = ({ children, ...restProps }: ItemRightProps) => {
  return (
    <div className={styles.right} {...restProps}>
      {children}
    </div>
  );
};
