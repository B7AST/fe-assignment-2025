import React, { useState } from "react";
import Modal from "./components/Modal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./index.css";
import "./App.css";

const validationSchema = Yup.object().shape({
  subject: Yup.string().required("Subject is required"),
  description: Yup.string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters"),
  destinationEmails: Yup.string()
    .required("At least one email is required")
    .test(
      "is-valid-emails",
      "Enter valid email(s), separated by commas",
      (value) => {
        if (!value) return false;
        const emails = value.split(",").map((e) => e.trim());
        return emails.every((email) =>
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        );
      }
    ),
});

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button onClick={toggleOpen}>Form</button>
      <Modal isOpen={isOpen} onClose={toggleOpen}>
        <Formik
          initialValues={{
            subject: "",
            description: "",
            destinationEmails: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            alert(JSON.stringify(values, null, 2));
            resetForm();
            setIsOpen(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <h2>Form</h2>
              <div>
                <label>Subject</label>
                <Field name="subject" type="text" />
                <ErrorMessage
                  name="subject"
                  component="div"
                  className="error"
                />
              </div>
              <div>
                <label>Description</label>
                <Field name="description" as="textarea" />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="error"
                />
              </div>
              <div>
                <label>Destination Emails (comma separated)</label>
                <Field name="destinationEmails" type="text" />
                <ErrorMessage
                  name="destinationEmails"
                  component="div"
                  className="error"
                />
              </div>
              <button type="button" onClick={toggleOpen}>
                Close
              </button>
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
}

export default App;
