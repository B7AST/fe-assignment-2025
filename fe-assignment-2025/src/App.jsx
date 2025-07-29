import React, { useState } from "react";
import Modal from "./components/Modal";
import "./index.css";
import "./App.css";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button onClick={toggleOpen}>Form</button>
      <Modal isOpen={isOpen} onClose={toggleOpen}>
        <h2>Form</h2>
        <button onClick={toggleOpen}>Close</button>
        <button>Submit</button>
      </Modal>
    </>
  );
}

export default App;
