import styles from "./DataInfo.module.css";

import type { ItemProps } from "./";

export const Item = (props: ItemProps) => {
  const { title, content } = props;

  return (
    <div className={styles.item}>
      {title && <div className={styles[`item-title`]}>{title}</div>}
      {content && <div className={styles[`item-content`]}>{content}</div>}
    </div>
  );
};
