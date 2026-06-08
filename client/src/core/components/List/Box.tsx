import styles from "./List.module.css";

import type { ItemBoxProps } from ".";

export const Box = ({
  title,
  content,
  description,
  ...restProps
}: ItemBoxProps) => {
  return (
    <div className={styles.box} {...restProps}>
      {title && <div className={styles.title}>{title}</div>}
      {content && <div className={styles.content}>{content}</div>}
      {description && <div className={styles.description}>{description}</div>}
    </div>
  );
};
