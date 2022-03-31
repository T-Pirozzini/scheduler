import React from "react";
import PropTypes from 'prop-types';

// styles
import "components/InterviewerList.scss";

// components
import InterviewerListItem from "components/InterviewerListItem";

export default function InterviewerList({ interviewers, onChange, value }) {  
  
  const interviewerList = interviewers.map(currentInterviewer => {
    return (
      <InterviewerListItem
        key={currentInterviewer.id}
        name={currentInterviewer.name}
        avatar={currentInterviewer.avatar}
        selected={currentInterviewer.id === value}
        setInterviewer={() => onChange(currentInterviewer.id)}
      />
    );
  });

  InterviewerList.propTypes = {
    interviewers: PropTypes.array.isRequired
  };
  
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewerList}</ul>
    </section>
  )
};