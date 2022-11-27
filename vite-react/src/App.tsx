import React, {MouseEventHandler, useEffect, useLayoutEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [count, setCount ] = useState(0)
  const handleClickButton: MouseEventHandler = () => setCount((prev) => prev + 1)

  useLayoutEffect(() => {
    console.log("useLayoutEffect", "App")
  })
  useLayoutEffect(() => {
    console.log("useLayoutEffect", "App", "[]")
  }, [])
  useLayoutEffect(() => {
    console.log("useLayoutEffect", "App", "[count]")
  }, [count])

  useEffect(() => {
    console.log("useEffect", "App")
  })
  useEffect(() => {
    console.log("useEffect", "App", "[]")
  }, [])
  useEffect(() => {
    console.log("useEffect", "App", "[count]")
  }, [count])

  return (
    <div className="App">
      <p><button onClick={handleClickButton}>クリック</button></p>
      <Test count={count}/>
    </div>
  );
}

const Test = ({count}: {count: number}) => {

  useLayoutEffect(() => {
    console.log("useLayoutEffect", "Test")
  })
  useLayoutEffect(() => {
    console.log("useLayoutEffect", "Test", "[]")
  }, [])
  useLayoutEffect(() => {
    console.log("useLayoutEffect", "Test", "[count]")
  }, [count])

  useEffect(() => {
    console.log("useEffect", "Test")
  })
  useEffect(() => {
    console.log("useEffect", "Test", "[]")
  }, [])
  useEffect(() => {
    console.log("useEffect", "Test", "[count]")
  }, [count])

  return <p><span>{count}</span></p>
}

export default App;
