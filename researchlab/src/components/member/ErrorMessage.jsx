const ErrorMessage = ({ message, isValid }) => {
  if (!message) return null;
  return (
    <span className={isValid ? 'valid-message' : 'invalid-message'}>
      {message}
    </span>
  );
};

export default ErrorMessage;
