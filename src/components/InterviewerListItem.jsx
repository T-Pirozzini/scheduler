import React from "react";
import classNames from "classnames";
import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {
  // const [interviewer, setInterviewer] = useState(interviewer);
  const { id, name, avatar, selected } = props;  

  const InterviewerListClass = classNames('interviewers__item', {
    "interviewers__item--selected": selected,
  });

  return (
    <li 
    onClick={() => props.setInterviewer(id)} 
    className={InterviewerListClass}>
      <img        
        className="interviewers__item-image"
        src={avatar}
        alt={props.name}
      />
      {selected && name}
    </li>
  );
}