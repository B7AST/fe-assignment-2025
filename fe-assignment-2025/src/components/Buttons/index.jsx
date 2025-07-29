export const AddButton = ({ onClick, text }) => {
  return (
    <button type="button" className="Button addButton" onClick={onClick}>
      {text}
    </button>
  );
};

export const AddAllButton = ({ onClick, children }) => {
  return (
    <button type="button" className="Button addAllButton" onClick={onClick}>
      {children}
    </button>
  );
};

export const CancelButton = ({ onClick, children }) => {
  return (
    <button type="button" className="Button cancelButton" onClick={onClick}>
      {children}
    </button>
  );
};

export const SubmitButton = ({ onClick, children}) => {
  return (
    <button type="submit" className="Button submitButton" onClick={onClick}>
      {children}
    </button>
  );
};
