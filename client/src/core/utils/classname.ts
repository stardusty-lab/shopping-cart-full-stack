import cn from "classnames";

type Modifiers = Record<string, string | false | undefined>;

type Options = {
  styles: Record<string, string>;
  baseName: string;
  modifiers?: Modifiers;
  className?: string | undefined;
};

export const createClassName = ({
  styles,
  baseName,
  modifiers,
  className,
}: Options) => {
  return cn(
    styles[baseName],
    baseName,
    styles.root,
    modifiers && Object.values(modifiers),
    className,
  );
};
