import React from "react";
import { useState } from 'react';

export function useVisualMode(initial) {  
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    const newHistory = history;
    if (replace) {
      newHistory[history.length - 1] = newMode;
    } else {        
      newHistory.push(newMode);
    }    
    setHistory(newHistory);
    setMode(newMode);
  };

  const back = function() {
    if (history.length > 1) {
      const newHistory = history;
      newHistory.pop();      
      setHistory(newHistory)
      setMode(newHistory[newHistory.length -1]);      
    } 
  };

  return {
    mode,
    transition,
    back    
  };
}

export default useVisualMode;