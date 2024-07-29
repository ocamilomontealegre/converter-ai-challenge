import { IButtonProps } from "./interfaces/button-interface";

export const Button = ({ text, ...props }: Readonly<IButtonProps>) => (
  <button {...props}>{text}</button>
);

export default Button;
