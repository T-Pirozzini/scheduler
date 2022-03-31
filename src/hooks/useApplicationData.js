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
  
  // remove an interview spot
  const removeSpots = (state, status = false) => {
    const eachDays = Object.values(state.days) 
     const dayArr = eachDays.map((day) => {          
       if (day.name === state.day && status === false) {        
        day.spots -= 1;                 
       }
       return null;       
      });
    return dayArr    
  };

  // add an interview spot
  const addSpots = (state) => {
    const eachDays = Object.values(state.days)    
     const dayArr = eachDays.map((day) => {     
       if (day.name === state.day) {        
        day.spots += 1;                  
       }
       return null;
      });
    return dayArr
  }  

  // sets the current day state
  const setDay = day => setState({ ...state, day }); 

  // adds an interview appointment to the database with axios
  const bookInterview = (id, interview, status) => {     
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },           
    };      
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };    
    return axios.put(`/api/appointments/${id}`, { ...appointment })
      .then(() => {
      // console.log(id, interview);
      const daysObj = removeSpots(state, status)
      setState({...state, daysObj, appointments});      
    });  
  }
  
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
      .then(()=> {        
        const daysObj = addSpots(state)
        setState({...state, daysObj, appointments}); 
      });
    }; 

    return { state, setDay, bookInterview, cancelInterview, removeSpots }
  };