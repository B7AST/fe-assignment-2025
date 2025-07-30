import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import {
  AddButton,
  CancelButton,
  SubmitButton,
  AddAllButton,
} from "../../components/Buttons";
import Modal from "../../components/Modal";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import InputText from "../../components/Inputs/InputText";
import InputTextArea from "../../components/Inputs/InputTextArea";
import InputEmail from "../../components/Inputs/InputEmail";
import EmailSelect from "../../components/Inputs/Select";
import banner from "../../assets/bannerjpg.jpg";

const validationSchema = Yup.object().shape({
  subject: Yup.string().required("Subject is required"),
  description: Yup.string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters"),
  destinationEmails: Yup.array()
    .min(1, "At least one email is required")
    .of(Yup.string().email("Enter valid email(s)")),
});
const HomePage = () => {
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
      <Navbar />
      <div className="banner">
        <img src={banner} alt="Banner" className="banner-img" />
        <div className="banner-actions">
          <AddButton onClick={toggleOpen} text="Send Mail" />
        </div>
      </div>
      {/* Modal for sending emails */}
      <Modal isOpen={isOpen} onClose={toggleOpen}>
        {loading ? (
          <div className="loading">Loading emails...</div>
        ) : (
          <Formik
            initialValues={{
              subject: "",
              description: "",
              destinationEmails: [],
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
              alert(JSON.stringify(values, null, 2));
              resetForm();
              setIsOpen(false);
            }}
          >
            {({ isSubmitting, setFieldValue, values }) => {
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
                        {userEmails.map((email, index) => (
                          <li key={index}>
                            {email} <span className="deleteMail">x</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="actionButtons">
                      <AddAllButton
                        type="button"
                        onClick={() =>
                          setFieldValue("destinationEmails", userEmails)
                        }
                      >
                        Add All Emails
                      </AddAllButton>
                      <CancelButton
                        type="button"
                        onClick={() => setFieldValue("destinationEmails", [])}
                      >
                        Remove All Emails
                      </CancelButton>
                    </div>
                    <EmailSelect
                      label="Select Destination Emails"
                      name="destinationEmails"
                      required
                      options={userEmails.map((email) => ({
                        value: email,
                        label: email,
                      }))}
                      value={values.destinationEmails.map((email) => ({
                        value: email,
                        label: email,
                      }))}
                      setFieldValue={setFieldValue}
                      placeholder="Select destination emails..."
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
};

export default HomePage;
