import styles from "./errorMessage.module.css";

const ErrorMessage: React.FC<{ message: string; isValid: boolean }> = ({
  message,
  isValid,
}) => {
  if (!message) return null;
  return (
    <span
      className={isValid ? styles["valid-message"] : styles["invalid-message"]}
    >
      {message}
    </span>
  );
};

export default ErrorMessage;
