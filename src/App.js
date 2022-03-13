import img1 from "./assets/img1.jpg";
import img2 from "./assets/img2.jpg";
import img3 from "./assets/img3.jpg";
import img4 from "./assets/img4.jpg";
import img5 from "./assets/img5.jpg";
import img6 from "./assets/img6.jpg";
import img7 from "./assets/img7.jpg";
import img8 from "./assets/img8.jpg";
import img9 from "./assets/img9.jpg";

import "./App.css";
import { Button } from "react-bootstrap";

import { RiNumber1 } from "react-icons/ri";
import { useState } from "react";
function App() {
  const [positions, setPosition] = useState([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ]);
  const [choosed, setChoosed] = useState(0);
  const [obj, setObj] = useState([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
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
    let isValid = validateSeted(newPositiions);
    console.log("choosed || ", choosed)
    if (isValid) {
      newPositiions[line][col] = choosed;
      setChoosed(0);
      setter(newPositiions);
    } else {
      console.log("Position line and Col || ", newPositiions[line][col])
      if (newPositiions[line][col] == choosed) {
        newPositiions[line][col] = "";
        setChoosed(0);
        setter(newPositiions);
      }
      console.log("Choosed nao Vallido para ser setado nesse Tabuleiro.");
    }
  }

  // |1|2|3|7|X|6|8|5|9
  function transformTabuleiro(tabuleiro) {
    let TabuleiroArray = tabuleiro.split("|");
    let MatrizTabuleiro = [
      TabuleiroArray.splice(0, 3),
      TabuleiroArray.splice(0, 3),
      TabuleiroArray.splice(0, 3),
    ];
    return MatrizTabuleiro;
  }

  function validateSeted(toValidate) {
    let valid = true;
    toValidate.forEach((item) => {
      item.forEach((position) => {
        if (position == choosed) valid = false;
      });
    });
    return valid;
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

        <table style={{ left: "40vh" }}>
          Inicial
          {positions.map((item, lin) => (
            <tr>
              {item.map((position, col) => (
                <td
                  onClick={() => setFieldObj(lin, col, setPosition, positions)}
                >
                  {position === 1 ? <img src={img1} /> : null}
                  {position === 2 ? <img src={img2} /> : null}
                  {position === 3 ? <img src={img3} /> : null}
                  {position === 4 ? <img src={img4} /> : null}
                  {position === 5 ? <img src={img5} /> : null}
                  {position === 6 ? <img src={img6} /> : null}
                  {position === 7 ? <img src={img7} /> : null}
                  {position === 8 ? <img src={img8} /> : null}
                  {position === 9 ? <img src={img9} /> : null}
                  
                </td>
              ))}
            </tr>
          ))}
        </table>

        <table style={{ left: "90vh" }}>
          Final
          {obj.map((item, lin) => (
            <tr>
              {item.map((position, col) => (
                <td onClick={() => setFieldObj(lin, col, setObj, obj)}>
                  {position === 1 ? <img src={img1} /> : null}
                  {position === 2 ? <img src={img2} /> : null}
                  {position === 3 ? <img src={img3} /> : null}
                  {position === 4 ? <img src={img4} /> : null}
                  {position === 5 ? <img src={img5} /> : null}
                  {position === 6 ? <img src={img6} /> : null}
                  {position === 7 ? <img src={img7} /> : null}
                  {position === 8 ? <img src={img8} /> : null}
                  {position === 9 ? <img src={img9} /> : null}
                </td>
              ))}
            </tr>
          ))}
        </table>
        <Button style={{ position: "absolute" }}>Text</Button>
        <table style={{}}>
          Escolha
          <tr>
            <th
              style={choosed === 1 ? { background: "green" } : {}}
              onClick={() => setChoosed(1)}
            >
              <img src={img1} />
            </th>
            <th
              style={choosed === 5 ? { background: "green" } : {}}
              onClick={() => setChoosed(5)}
            >
              <img src={img5} />
            </th>
          </tr>
          <tr>
            <th
              style={choosed === 2 ? { background: "green" } : {}}
              onClick={() => setChoosed(2)}
            >
              <img src={img2} />
            </th>
            <th
              style={choosed === 6 ? { background: "green" } : {}}
              onClick={() => setChoosed(6)}
            >
              <img src={img6} />
            </th>
          </tr>
          <tr>
            <th
              style={choosed === 3 ? { background: "green" } : {}}
              onClick={() => setChoosed(3)}
            >
              <img src={img3} />
            </th>
            <th
              style={choosed === 7 ? { background: "green" } : {}}
              onClick={() => setChoosed(7)}
            >
              <img src={img7} />
            </th>
          </tr>
          <tr>
            <th
              style={choosed === 4 ? { background: "green" } : {}}
              onClick={() => setChoosed(4)}
            >
              <img src={img4} />
            </th>
            <th
              style={choosed === 8 ? { background: "green" } : {}}
              onClick={() => setChoosed(8)}
            >
              <img src={img8} />
            </th>
          </tr>
          <tr>
            <th
              style={choosed === 9 ? { background: "green" } : {}}
              onClick={() => setChoosed(9)}
            >
              <img src={img9} />
            </th>
          </tr>
        </table>

        <table style={{ top: "65vh", left: "50vw" }}>
          <tr>
            <th>Abertos</th>
            <th>Fechados</th>
            <th>X</th>
          </tr>
        </table>
      </body>
    </div>
  );
}

export default App;
