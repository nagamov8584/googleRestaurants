import {useState} from 'react'

export default function useUpdate(initialState) {
  const [data, setData] = useState(initialState);

  function handleData(e, {value}) {
    setData(value);
  }

  return [data, handleData]
}