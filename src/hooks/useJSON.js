import {useReducer, useEffect} from "react";

const initialState = {
  loading: true,
  error: null,
  data: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'success':
      return {
        loading: false,
        error: null,
        data: action.data
      };
    case 'error':
      return {
        loading: false,
        error: action.errorMessage,
        data: null
      };
    default:
      return state;
  }
};

function useJSON(url, keys){
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    const fetchData = async (url) => {
      try {
        const res = await fetch(url);
        const data = await res.json();
        const nestedData = keys.reduce((nested, key) => nested[key], data);
        dispatch({type: 'success', data: nestedData});
      } catch (error) {
        dispatch({type: 'error', errorMessage: error.message});
      }
    }

    fetchData(url);
  }, [])


  return [state.loading, state.error, state.data];
}

export default useJSON;
