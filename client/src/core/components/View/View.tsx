import styles from "./View.module.css";

import type { Props } from ".";

export const View = ({ children }: Props) => {
  return <div className={styles.component}>{children}</div>;
};
