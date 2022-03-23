import React from "react";
import "components/InterviewerListItem.scss"

export default function InterviewerListItem(props) {
  { id, name, avatar, selected } = props;
  const [interviewer, setInterviewer] = useState(0);

  return (
    <li className="interviewers__item">
      <img
        className="interviewers__item-image"
        src={avatar}
        alt="Sylvia Palmer"
      />
      {name}
    </li>
  );


}