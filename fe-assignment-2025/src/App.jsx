import React, { useState } from "react";
import { AddButton, CancelButton, SubmitButton } from "./components/Buttons";
import Modal from "./components/Modal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./index.css";
import "./App.css";
import InputText from "./components/Inputs/InputText";
import InputTextArea from "./components/Inputs/InputTextArea";
import InputEmail from "./components/Inputs/InputEmail";

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
                  <InputText
                    label="Subject"
                    name="subject"
                    required
                    placeholder="Enter subject"
                  />
                  <InputTextArea
                    label="Description"
                    name="description"
                    required
                    placeholder="Enter description"
                  />
                  <div className="emailListSection">
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
                    <div className="actionButtons">
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
                    </div>
                    <InputEmail
                      label="Destination Emails"
                      name="destinationEmails"
                      required
                      type="text"
                      placeholder="Enter emails"
                      list="user-emails"
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
