import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onSelect: () => void;
}

export default function Button({ children, onSelect }: ButtonProps) {
  return <button onClick={onSelect}>{children}</button>;
}
