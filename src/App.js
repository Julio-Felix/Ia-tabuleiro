import logo from "./logo.svg";
import "./App.css";
import { Button } from "react-bootstrap";

import { RiNumber1 } from "react-icons/ri";
import { useState } from "react";
function App() {
  const [positions, setPosition] = useState([
    [1, 2, 3],
    [4, 5, 6],
    [7, "", 8],
  ]);
  const [choosed, setChoosed] = useState(0);
  const [obj, setObj] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);

  function Move(line, col) {
    if (positions[line][col] != "") {
      let newPositiions = [...positions];
      // console.log("Line possibilities || ", 0 <= line - 1 <= 2)
      if (0 <= line - 1 && line - 1 <= 2 && positions[line - 1][col] == "") {
        console.log("Move para cima");
        newPositiions[line - 1][col] = positions[line][col];
        newPositiions[line][col] = "";
      }
      if (0 <= line + 1 && line + 1 <= 2 && positions[line + 1][col] == "") {
        console.log("Move para baixo");
        newPositiions[line + 1][col] = positions[line][col];
        newPositiions[line][col] = "";
      }
      if (0 <= col - 1 && col - 1 <= 2 && positions[line][col - 1] == "") {
        console.log("Move para esquerda");
        newPositiions[line][col - 1] = positions[line][col];
        newPositiions[line][col] = "";
      }
      if (0 <= col + 1 && col + 1 <= 2 && positions[line][col + 1] == "") {
        console.log("Move para direta");
        newPositiions[line][col + 1] = positions[line][col];
        newPositiions[line][col] = "";
      }

      setPosition(newPositiions);
      // if(positions[line - 1][col] == '') console.log("Move para cima")
      // if(positions[line + 1][col] == '') console.log("Move para baixo")
      // if(positions[line][col - 1] == '') console.log("Move para esquerda")
      // if(positions[line][col + 1] == '') console.log("Move para direta")
    }
  }

  function setFieldObj(line, col, setter, posiblity) {
    let newPositiions = [...posiblity];
    newPositiions[line][col] = String(choosed);
    setter(newPositiions);
  }

  function validateSeted() {
    let valid = true;
    obj.forEach((item) => {
      item.forEach((position) => {});
    });
  }

  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <body>
        {/* <div style={{position:'absolute', top:10, left:10,backgroundColor:'red',width:90,height:90,justifyContent:'center',textAlign:'center'}}><RiNumber1 size={90} style={{alignSelf:'center'}}/></div> */}

        <table>
          Jogo
          {positions.map((item, lin) => (
            <tr>
              {item.map((position, col) => (
                <td
                  onClick={() => setFieldObj(lin, col, setPosition, positions)}
                >
                  {position}
                </td>
              ))}
            </tr>
          ))}
        </table>

        <table style={{ position: "absolute", left: "60vh" }}>
          Config...
          {obj.map((item, lin) => (
            <tr>
              {item.map((position, col) => (
                <td onClick={() => setFieldObj(lin, col, setObj, obj)}>
                  {position}
                </td>
              ))}
            </tr>
          ))}
        </table>
        <Button style={{ position: "absolute" }}>Text</Button>
        <table style={{ top: "75vh" }}>
          <th
            style={choosed === 1 ? { background: "green" } : {}}
            onClick={() => setChoosed(1)}
          >
            1
          </th>
          <th
            style={choosed === 2 ? { background: "green" } : {}}
            onClick={() => setChoosed(2)}
          >
            2
          </th>
          <th
            style={choosed === 3 ? { background: "green" } : {}}
            onClick={() => setChoosed(3)}
          >
            3
          </th>
          <th
            style={choosed === 4 ? { background: "green" } : {}}
            onClick={() => setChoosed(4)}
          >
            4
          </th>
          <th
            style={choosed === 5 ? { background: "green" } : {}}
            onClick={() => setChoosed(5)}
          >
            5
          </th>
          <th
            style={choosed === 6 ? { background: "green" } : {}}
            onClick={() => setChoosed(6)}
          >
            6
          </th>
          <th
            style={choosed === 7 ? { background: "green" } : {}}
            onClick={() => setChoosed(7)}
          >
            7
          </th>
          <th
            style={choosed === 8 ? { background: "green" } : {}}
            onClick={() => setChoosed(8)}
          >
            8
          </th>
        </table>
      </body>
    </div>
  );
}

export default App;
