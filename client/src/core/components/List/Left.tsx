import styles from "./List.module.css";

import type { ItemLeftProps } from ".";

export const Left = ({ children, ...restProps }: ItemLeftProps) => {
  return (
    <div className={styles.left} {...restProps}>
      {children}
    </div>
  );
};
