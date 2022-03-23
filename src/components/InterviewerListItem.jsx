import React from "react";
import classNames from "classnames";
import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {  
  const { id, name, avatar, selected } = props;  

  const InterviewerListClass = classNames('interviewers__item', {
    "interviewers__item--selected": selected,
  });

  return (
    <li 
    onClick={props.setInterviewer} 
    className={InterviewerListClass}>
      <img        
        className="interviewers__item-image"
        src={avatar}
        alt={name}
      />
      {selected && name}
    </li>
  );
}