import './App.css';
import React from "react";
import image from "./Image";

const Text = React.lazy(() => import("./Text"))
const Image = React.lazy(() => import("./Image"))

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
  return <div><Text text={`${count}pt`}/><Image src="https://seeklogo.com/images/E/esbuild-logo-21E74350B7-seeklogo.com.png" alt="esbuild logo"/></div>
}

export default App;
