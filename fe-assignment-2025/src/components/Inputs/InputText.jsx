import { Field, ErrorMessage } from "formik";

const InputText = ({
  label,
  name,
  required = false,
  placeholder,
  type = "text",
  ...props
}) => {
  return (
    <div className="inputGroup">
      <label>
        {label}
        {required && <span className="required"> * </span>}
      </label>
      <Field name={name} type={type} placeholder={placeholder} {...props} />
      <ErrorMessage name={name} component="div" className="error" />
    </div>
  );
};

export default InputText;
