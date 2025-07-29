import { Field, ErrorMessage } from "formik";

const InputEmail = ({
  label,
  name,
  required = false,
  type,
  placeholder,
  list = [],
}) => (
  <div className="inputGroup">
    <label>
      {label}
      {required && <span className="required"> * </span>}
    </label>
    <Field name={name} type={type} placeholder={placeholder} list={list} />
    <ErrorMessage name={name} component="div" className="error" />
  </div>
);

export default InputEmail;
