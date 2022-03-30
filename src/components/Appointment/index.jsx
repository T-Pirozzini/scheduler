import React from "react";

// styles
import "components/Appointment/styles.scss";

// components
import Form from 'components/Appointment/Form';
import Header from "components/Appointment/Header"
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";

// custom hooks
import useVisualMode from "hooks/useVisualMode";

export default function Appointment({ id, time, interview, interviewers, bookInterview, cancelInterview }) {   
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";
  
  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );
  
  const save = (name, interviewer, status) => {    
    const interview = {
      student: name,
      interviewer
    };    
    transition(SAVING)    
    bookInterview(id, interview, status )    
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true));
  };   
  
  const confirmDelete = (id) => {
    transition(DELETING, true);    
    cancelInterview(id)
      .then(() => transition(EMPTY))
      .catch(error => transition(ERROR_DELETE, true));
  };

  const cancel = () => {
    transition(CONFIRM);
  };
  
  return (      
      <article className="appointment">
        <Header time={time} />
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === CREATE && (
          <Form          
            interviewers={interviewers}
            onSave={save} 
            onCancel={back}           
          />
        )}
        {mode === SHOW && (
          <Show 
            student={interview.student} 
            interviewer={interview.interviewer ? interview.interviewer.name : null}
            onDelete={() => cancel()}
            onEdit={() => transition(EDIT)}
          />
        )}
        {mode === CONFIRM && (
        <Confirm
          message={"Are you sure you would like to delete?"}
          onCancel={back}
          onConfirm={() => confirmDelete(id)}
        />
        )}
        {mode === EDIT && (
          <Form
            interviewers={interviewers}
            onSave={save}
            onCancel={back}
            interview={interview}
            student={interview.student}            
            interviewer={interview.interviewer.id}
            status={true}
          />
        )}           
        {mode === SAVING && <Status message="Saving" />}
        {mode === DELETING && <Status message="Deleting" />}
        {mode === ERROR_DELETE && (
          <Error message="Could not cancel the appointment" onClose={() => back()} />
        )}
        {mode === ERROR_SAVE && (
          <Error message="Could not save the appointment" onClose={() => back()} />
        )}   
      </article>      
  );
};

