const ErrorMessage = ({ message, isValid }) => {
  if (isValid) {
    return <span className="valid-message">{message}</span>;
  }
  return <span className="invalid-message">{message}</span>;
};

export default ErrorMessage;
