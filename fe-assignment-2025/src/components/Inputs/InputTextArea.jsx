import { Field, ErrorMessage } from "formik";

const InputTextArea = ({ label, name, required, placeholder }) => (
  <div className="inputGroup">
    <label>
      {label}
      {required && <span className="required"> * </span>}
    </label>
    <Field name={name} as="textarea" placeholder={placeholder} />
    <ErrorMessage name={name} component="div" className="error" rows={30} columns={30} />
  </div>
);

export default InputTextArea;
