import { FunctionComponent, PropsWithChildren } from "react";

type ButtonProps = {
  onClick: () => void;
  className: string;
};

export const Button: FunctionComponent<PropsWithChildren<ButtonProps>> = ({
  children,
  onClick,
  className,
}) => {
  const handleClick = () => {
    onClick(); //Called from props
  };

  return (
    <button type="button" className={className} onClick={handleClick}>
      {children}
    </button>
  );
};
