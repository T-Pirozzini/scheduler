import React, { useState } from 'react';
import Button from "components/Button"
import InterviewerList from "components/InterviewerList";


export default function Form(props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const cancel = () => {
    reset();
    props.onCancel();    
  };

  const reset = () => {
    setStudent("");
    setInterviewer(null)
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form onSubmit={(e) => e.preventDefault()} autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name={"name"}
            type="text"
            placeholder="Enter Student Name"
            value={props.student}
            onChange={(e) => setStudent(e.target.value)}
          />
        </form>
        <InterviewerList
          value={props.interviewer}
          interviewers={props.interviewers}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={() => props.onSave(student, interviewer)}>Save</Button>
        </section>
      </section>
    </main>
  );
};