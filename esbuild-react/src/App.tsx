import './App.css';
import React from "react";

function App() {
  const [count, setCount ] = React.useState(0)
  const handleClickButton: React.MouseEventHandler = () => setCount((prev) => prev + 1)

  return (
    <div className="App">
      <p><button onClick={handleClickButton}>クリック</button></p>
      <Test count={count}/>
    </div>
  );
}

const Test = ({count}: {count: number}) => {
  return <p><span>{count}</span></p>
}

export default App;
