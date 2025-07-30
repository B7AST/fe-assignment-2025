import { ErrorMessage } from "formik";
import ReactSelect from "react-select";

const EmailSelect = ({ name, label, required = false, options, value, setFieldValue, placeholder }) => (
  <div className="inputGroup">
    <label>{label}{required && <span className="required"> * </span>}</label>
    <ReactSelect
      isMulti
      name={name}
      options={options}
      value={value}
      onChange={(selectedOptions) =>
        setFieldValue(
          name,
          selectedOptions ? selectedOptions.map((option) => option.value) : []
        )
      }
      placeholder={placeholder}
      className="react-select"
      classNamePrefix="select"
    />
    <ErrorMessage name={name} component="div" className="error" />
  </div>
);

export default EmailSelect;