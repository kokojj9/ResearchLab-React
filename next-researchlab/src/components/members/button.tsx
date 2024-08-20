export default function Button({ children, onSelect }) {
    return <button onClick={onSelect}>{children}</button>;
  }
  