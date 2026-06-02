import styles from "./Component.module.css";

import type { Props } from ".";

export const Component = ({ children }: Props) => {
  return <div className={styles.component}>{children}</div>;
};
