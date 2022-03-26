export function getAppointmentsForDay(state, day) {
  const getDay = state.days.filter(checkDay => checkDay.name === day);
  if (getDay.length === 0 || state.days.length === 0) {
    return [];
  };
  
  const dayAppointments = getDay[0].appointments;  

  return Object.values(state.appointments).filter((appointment) => {
    for (const appt of dayAppointments) {      
      if (appointment.id === appt) {
        return true;
      }
    }
    return false;
  });  
}

export function getInterviewersForDay(state, day) {
  const getDay = state.days.filter(checkDay => checkDay.name === day);
  if (getDay.length === 0 || state.days.length === 0) {
    return [];
  };
  
  const dayInterviewers = getDay[0].interviewers;  

  return Object.values(state.interviewers).filter((interviewer) => {
    for (const apptInterviewer of dayInterviewers) {      
      if (interviewer.id === apptInterviewer) {
        return true;
      }
    }
    return false;
  });  
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  };
  
  const interviewerId = interview.interviewer;
  const student = interview.student;
  return {
    student,
    interviewer: state.interviewers[interviewerId]
  };  
}


