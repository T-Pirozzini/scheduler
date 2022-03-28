import React from "react";

// styles
import "components/Appointment/styles.scss";

// components
import Form from 'components/Appointment/Form';
import Header from "components/Appointment/Header"
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";

// custom hooks
import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {  
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );  
  
  return (   
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show student={props.interview.student} interviewer={props.interview.interviewer} />
      )}
      {mode === CREATE && (
        <Form 
          interviewer={(props.interview ? props.interview.interviewer : null)} 
          interviewers = {[]}
          onCancel = {back} 
        />
      )}
    </article>  
  );
};

