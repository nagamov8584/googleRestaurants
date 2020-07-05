import {useState} from 'react'

export default function useObjectState(initialState) {
  const [data, setData] = useState(initialState);

  function saveNewData(value) {
    setData(prevData => ({
      ...prevData,
      ...value
    }));
  }

  return [data, saveNewData]
}