import clsx from "clsx";
import cls from "./Box.module.scss";

const justifyClasses = {
  start: cls.justifyStart,
  center: cls.justifyCenter,
  end: cls.justifyEnd,
  between: cls.justifyBetween,
};

const alignClasses = {
  start: cls.alignStart,
  center: cls.alignCenter,
  end: cls.alignEnd,
};

const directionClasses = {
  row: cls.directionRow,
  column: cls.directionColumn,
};

export const Box = (props) => {
  const {
    children,
    classNames,
    justify = "start",
    align = "center",
    direction = "row",
    card,
    padding = "20px",
    shadow,
    fullWidth,
  } = props;
  const layoutModes = [
    justifyClasses[justify],
    alignClasses[align],
    directionClasses[direction],
  ];
  const modes = {
    [cls.card]: card,
    [cls.shadow]: shadow,
    [cls.fullWidth]: fullWidth,
  };

  if (typeof padding === "number") {
    return (
      <div
        style={{ padding: padding }}
        className={clsx(classNames, cls.box, layoutModes, modes)}
      >
        {children}
      </div>
    );
  }
  return (
    <div className={clsx(classNames, cls.box, layoutModes, modes)}>
      {children}
    </div>
  );
};
