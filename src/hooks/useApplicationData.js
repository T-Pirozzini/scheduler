import { useEffect, useState } from 'react'
import axios from "axios";    
    
export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  // fetches data from scheduler-api with axios and updates setState
  useEffect(() => {    
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers'),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));      
    })
      .catch((err) => {
        console.log("error", err.message)
      })
  }, [])

  // sets the current day state
  const setDay = day => setState({ ...state, day }); 

  // adds an interview appointment to the database with axios
  const bookInterview = (id, interview) => {     
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },           
    };      
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };    
    return axios
      .put(`/api/appointments/${id}`, appointment)
      .then(() => setState({ ...state, appointments }))   
    };  
  
  // removes an interview appointment from database with axios
  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null 
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios
      .delete(`/api/appointments/${id}`)
      .then(()=> setState({ ...state, appointments}));
    }; 

    return { state, setDay, bookInterview, cancelInterview }
  };