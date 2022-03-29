import React from "react";

// styles
import "components/Appointment/styles.scss";

// components
import Form from 'components/Appointment/Form';
import Header from "components/Appointment/Header"
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Status from "components/Appointment/Status";

// custom hooks
import useVisualMode from "hooks/useVisualMode";

export default function Appointment({ id, time, interview, interviewers, bookInterview }) {   
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";

  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );
  
  const save = (name, interviewer) => {    
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING)
    bookInterview(id, interview)
    transition(SHOW);  
  };  
  
  return (   
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show student={interview.student} interviewer={interview.interviewer} />
      )}      
      {mode === CREATE && (
        <Form          
          interviewers={interviewers}
          onCancel={() => back()}
          onSave={() => save()} 
        />
      )}
      {mode === SAVING && <Status />}      
    </article>  
  );
};

