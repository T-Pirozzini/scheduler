// const setDay = day => setState({ ...state, day });     
    
  // useEffect(() => {    
  //   Promise.all([
  //     axios.get('/api/days'),
  //     axios.get('/api/appointments'),
  //     axios.get('/api/interviewers'),
  //   ]).then((all) => {
  //     setState((prev) => ({
  //       ...prev,
  //       days: all[0].data,
  //       appointments: all[1].data,
  //       interviewers: all[2].data,
  //     }));      
  //   })
  //     .catch((err) => {
  //       console.log("error", err.message)
  //     })
  // }, [])

  // const bookInterview = (id, interview) => {
     
  //   const appointment = {
  //     ...state.appointments[id],
  //     interview: { ...interview },
           
  //   };      
  //   const appointments = {
  //     ...state.appointments,
  //     [id]: appointment,
  //   };    
  //   return axios.put(`/api/appointments/${id}`, appointment)
  //     .then(() => setState({ ...state, appointments }))   
  //   };  
  
  // const cancelInterview = (id) => {
  //   const appointment = {
  //     ...state.appointments[id],
  //     interview: null 
  //   };
  //   const appointments = {
  //     ...state.appointments,
  //     [id]: appointment
  //   };
  //   return axios
  //     .delete(`/api/appointments/${id}`)
  //     .then(()=> setState({ ...state, appointments}));
  //   }; 