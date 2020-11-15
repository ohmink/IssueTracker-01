import React, { useReducer, createContext, useContext, useEffect, dispatch } from 'react';
import axios from 'axios';

const labelReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD':
      return [...action.data];
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export const loadLabels = async (dispatch) => {
  try {
    console.log("be")
    const response = await axios.get('http://49.50.166.157:3000/api/label', {
      withCredentials: true,
    });
    console.log(response.data.data);
    dispatch({ type: 'LOAD', data: response.data.data });
  } catch (err) {
    console.log(err);
  }
};

export const createLabel = async (dispatch, label) => {
  try {
    const response = await axios.post('http://49.50.166.157:3000/api/label', label, {
      withCredentials: true,
    });
    await loadLabels(dispatch);
  } catch (err) {
    console.log(err.response);
  }
};

export const updateLabel = async (dispatch, label) => {
  try {
    const response = await axios.patch('http://49.50.166.157:3000/api/label', label, {
      withCredentials: true,
    });
    await loadLabels(dispatch);
  } catch (err) {
    console.log(err.response);
  }
};

export const deleteLabel = async (dispatch, labelName) => {
  try {
    const response = await axios.delete(`http://49.50.166.157:3000/api/label/${labelName}`, {
      withCredentials: true,
    });
    await loadLabels(dispatch);
  } catch (err) {
    console.log(err.response);
  }
};

const LabelStateContext = createContext();
const LabelDispatchContext = createContext();

export const LabelProvider = ({ children }) => {
  const [state, dispatch] = useReducer(labelReducer, []);
  useEffect(() => loadLabels(dispatch), []);
  return (
    <LabelStateContext.Provider value={state}>
      <LabelDispatchContext.Provider value={dispatch}>{children}</LabelDispatchContext.Provider>
    </LabelStateContext.Provider>
  );
};

export const useLabelState = () => {
  const context = useContext(LabelStateContext);
  if (!context) {
    throw new Error('Cannot find LabelProvider');
  }
  return context;
};

export const useLabelDispatch = () => {
  const context = useContext(LabelDispatchContext);
  if (!context) {
    throw new Error('Cannot find LabelProvider');
  }
  return context;
};
