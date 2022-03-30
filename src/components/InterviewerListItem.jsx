import React from "react";
import classNames from "classnames";

// styles
import "components/InterviewerListItem.scss";

export default function InterviewerListItem({  name, avatar, selected, setInterviewer }) {   
  const InterviewerListItemClass = classNames(
    'interviewers__item', { "interviewers__item--selected": selected });

  return (
    <li 
      className={InterviewerListItemClass}
      onClick={setInterviewer} 
      selected={selected}>
      <img        
        className="interviewers__item-image"
        src={avatar}
        alt={name}                
      />
      {selected && name}
    </li>
  );
}