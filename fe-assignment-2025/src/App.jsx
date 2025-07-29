import React, { useState } from "react";
import { AddButton, CancelButton, SubmitButton } from "./components/Buttons";
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
  const [userEmails, setUserEmails] = useState([]);
  const [loading, setLoading] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  // Fetch user emails from the API
  React.useEffect(() => {
    async function fetchUserEmails() {
      setLoading(true);
      try {
        const response = await fetch(
          "https://686547495b5d8d0339808f5d.mockapi.io/spitogatos/api/customer-email-lookup"
        );
        const users = await response.json();
        const emails = users.map((user) => user?.email);
        setUserEmails(emails);
      } catch (error) {
        console.error("Failed to fetch user emails:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchUserEmails();
  }, []);

  return (
    <>
      <AddButton onClick={toggleOpen} text="Form" />
      <Modal isOpen={isOpen} onClose={toggleOpen}>
        {loading ? (
          <div className="loading">Loading emails...</div>
        ) : (
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
            {({ isSubmitting, setFieldValue, values }) => {
              // Filter emails based on input
              const filterText = values?.destinationEmails.trim().toLowerCase();
              const filteredEmails = filterText
                ? userEmails.filter((email) =>
                    email.toLowerCase().includes(filterText)
                  )
                : userEmails;
              return (
                <Form className="emailForm">
                  <h2>Email Sent Form</h2>
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
                    <label>Available Emails</label>
                    <div className="emailListTable">
                      <ul>
                        {filteredEmails.map((email, index) => (
                          <li key={index}>
                            {email} <span className="deleteMail">x</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <SubmitButton
                      type="button"
                      onClick={() =>
                        setFieldValue(
                          "destinationEmails",
                          filteredEmails.join(", ")
                        )
                      }
                    >
                      Add All Emails
                    </SubmitButton>
                    <CancelButton
                      type="button"
                      onClick={() => setFieldValue("destinationEmails", "")}
                    >
                      Remove All Emails
                    </CancelButton>
                    <label>Destination Emails (comma separated)</label>
                    <Field
                      name="destinationEmails"
                      type="text"
                      placeholder="Enter emails"
                      list="user-emails"
                    />
                    <ErrorMessage
                      name="destinationEmails"
                      component="div"
                      className="error"
                    />
                  </div>
                  <div className="actions">
                    <CancelButton type="button" onClick={toggleOpen}>
                      Close
                    </CancelButton>
                    <SubmitButton type="submit" disabled={isSubmitting}>
                      Submit
                    </SubmitButton>
                  </div>
                </Form>
              );
            }}
          </Formik>
        )}
      </Modal>
    </>
  );
}

export default App;
