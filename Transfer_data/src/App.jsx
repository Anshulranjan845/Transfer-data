import { useState } from "react";

import "./App.css";
import { data } from "./data";

function App() {
  const [leftdata, setLeftData] = useState(data);
  const [rightdata, setRightData] = useState([]);

  const handleCheck = (copyData, id, checked) => {
    return copyData.map((item) => {
      if (item.id == id) {
        return {
          ...item,
          checked: !checked,
        };
      } else return item;
    });
  };

  const handleSelect = (id, checked, dir) => {
    if (dir == "LEFT") {
      const copyData = [...leftdata];
      const checkedList = handleCheck(copyData, id, checked);
      setLeftData(checkedList);
    } else {
      const copyData = [...rightdata];
      const checkedList = handleCheck(copyData, id, checked);
      setRightData(checkedList);
    }
  };

  const unCheckData = (list)=>{
      return list.map((item)=>{
        return {
          ...item,
          checked: false
        }
      })
  }

  const handleClick = ((dir) => {
    if(dir === 'LEFT_TO_RIGHT') {
      const copyData = [...leftdata];
      if(copyData.length){
        const checkedData = copyData.filter(item => item.checked);
        const uncheckedData = copyData.filter(item => !item.checked);
        setRightData(unCheckData([...rightdata,...checkedData]));
        setLeftData(uncheckedData);
      }
    }
    else{
      const copyData = [...rightdata];
      if(copyData.length){
        const checkedData = copyData.filter(item => item.checked);
        const uncheckedData = copyData.filter(item => !item.checked);
        setLeftData(unCheckData([...leftdata,...checkedData]));
        setRightData(uncheckedData);
      }
    }
  })
  return (
    <div className="app">
      <h2>Tranfer data</h2>
      <div className="container">
        <div className="action">
          {leftdata.map(({ title, id, checked }) => (
            <div
              onClick={() => handleSelect(id, checked, "LEFT")}
              className={`dataItem ${checked && "checked"}`}
              key={id}
              id={id}
            >
              {title}
            </div>
          ))}
        </div>
        <div className="btn_transfer">
          <button onClick={()=>handleClick("LEFT_TO_RIGHT")}>{" >"}</button>
          <button onClick={()=>handleClick("RIGHT_TO_LEFT")}>{" <"}</button>
        </div>

        <div className="action">
          {rightdata.map(({ title, id, checked }) => (
            <div 
            onClick={() => handleSelect(id, checked, "RIGHT")}
            className={`dataItem ${checked && "checked"}`} key={id} id={id}>
              {title}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
