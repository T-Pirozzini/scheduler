import React, { useState } from 'react';

// components
import Button from "components/Button"
import InterviewerList from "components/InterviewerList";

export default function Form(props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const { onSave, onCancel, interviewers } = props;
  const [error, setError] = useState(""); 

  const cancel = () => {
    reset();
    onCancel();    
  };

  const reset = () => {
    setStudent("");
    setInterviewer(null)
  };
  
  function validate() {
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    };
    if (!interviewer) {
      setError("Please select an interviewer");
      return;
    };
    setError("");
    onSave(student, interviewer, props.status);
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form onSubmit={(e) => e.preventDefault()} autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="student"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(e) => setStudent(e.target.value)}
            data-testid="student-name-input"
          />
          <section className="appointment__validation">{error}</section>
        </form>
        <InterviewerList
          interviewers={interviewers}
          value={interviewer}
          onChange={(event) => setInterviewer(event)}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={() => validate(student, interviewer, props.status)} >Save</Button>
        </section>
      </section>
    </main>
  );
};

