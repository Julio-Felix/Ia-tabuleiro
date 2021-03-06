import img1 from "./assets/img1.jpg";
import img2 from "./assets/img2.jpg";
import img3 from "./assets/img3.jpg";
import img4 from "./assets/img4.jpg";
import img5 from "./assets/img5.jpg";
import img6 from "./assets/img6.jpg";
import img7 from "./assets/img7.jpg";
import img8 from "./assets/img8.jpg";
import img9 from "./assets/img9.jpg";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import { Button } from "react-bootstrap";
import axios from "axios";
import { RiNumber1 } from "react-icons/ri";
import { useState } from "react";
function App() {
  const [positions, setPosition] = useState([
    ["-", "-", "-"],
    ["-", "-", "-"],
    ["-", "-", "-"],
  ]);
  const [choosed, setChoosed] = useState("-");
  const [obj, setObj] = useState([
    ["-", "-", "-"],
    ["-", "-", "-"],
    ["-", "-", "-"],
  ]);

  const [abertos, setAbertos] = useState([]);
  const [fechados, setFechados] = useState([]);
  const [atual, setAtual] = useState([]);

  function setFieldObj(line, col, setter, posiblity) {
    let newPositiions = [...posiblity];
    let isValid = validateSeted(newPositiions);
    console.log("choosed || ", choosed);
    if (isValid) {
      newPositiions[line][col] = choosed;
      setChoosed("-");
      setter(newPositiions);
    } else {
      console.log("Position line and Col || ", newPositiions[line][col]);
      if (newPositiions[line][col] == choosed) {
        newPositiions[line][col] = "-";
        setChoosed("-");
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

  function checkIfNull(tabuleiro) {
    let isNull = false;
    let count = 0;
    tabuleiro.forEach((item) => {
      item.forEach((value) => {
        if (value === "-") {
          count++;
          if (count == 9) isNull = true;
        }
      });
    });
    return isNull;
  }

  function automaticTest() {
    setPosition([
      ["1", "2", "3"],
      ["5", "6", "-"],
      ["4", "7", "8"],
    ]);
    setObj([
      ["1", "2", "3"],
      ["5", "7", "-"],
      ["4", "8", "6"],
    ]);
  }

  function automaticTest2() {
    setPosition([
      ["1", "2", "3"],
      ["5", "6", "-"],
      ["4", "7", "8"],
    ]);
    setObj([
      ["1", "2", "3"],
      ["5", "6", "8"],
      ["4", "-", "7"],
    ]);
  }

  function automaticTestMEDO() {
    setPosition([
      ["1", "2", "3"],
      ["5", "6", "-"],
      ["4", "7", "8"],
    ]);
    setObj([
      ["2", "3", "-"],
      ["1", "6", "8"],
      ["5", "4", "7"],
    ]);
  }

  function submitForm() {
    let data = {
      estadoInicial: [],
      estadoObjetivo: [],
    };
    if (checkIfNull(obj)) {
      alert("Estado Objetivo est?? vazio.");
      return;
    }
    positions.forEach((item) => {
      item.forEach((value) => {
        data.estadoInicial.push(String(value));
      });
    });

    obj.forEach((item) => {
      item.forEach((value) => {
        data.estadoObjetivo.push(String(value));
      });
    });
    setAbertos([]);
    setFechados([]);
    setAtual([]);
    console.log("DATA || ", data);
    axios
      .post("http://localhost:8998/busca", data)
      .then(function (response) {
        // handle success
        alert("SUCESSO");
        let responseData = response.data;
        let reverseData = responseData.estados;
        recursiveEstados(reverseData, [], [], "", 0);
        recursiveEstados(reverseData, abertos, fechados, atual, 50);
        // pq i s?? funciona com 50, n??o sei????
      })
      .catch(function (error) {
        alert(error.response.data.mensagem);
        console.log(error);
      });
    // .then(function () {
    //   // always executed
    // });
  }

  function recursiveEstados(est, arrayAbertos, arrayFechados, atuais, i) {
    arrayAbertos = [...arrayAbertos, est[i].abertos];
    setAbertos(arrayAbertos);
    arrayFechados = [...arrayFechados, est[i].fechados];
    setFechados(arrayFechados);
    atuais = [...atuais, est[i].x];
    setAtual(atuais);
    if (est[i].estadoImportante)
      setPosition(transformTabuleiro(est[i].estados));

    setTimeout(() => {
      recursiveEstados(est, arrayAbertos, arrayFechados, atuais, i + 1);
    }, 1000);
  }

  return (
    <div className="App">
      <body>
        <table style={{ left: "40vh" }}>
          <tr>
            <td></td>
            <td>
              <p
                style={{
                  fontSize: 24,
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Estado Jogo:
              </p>
            </td>
          </tr>
          {positions.map((item, lin) => (
            <tr>
              {item.map((position, col) => (
                <td
                  style={{ borderWidth: 2 }}
                  onClick={() => setFieldObj(lin, col, setPosition, positions)}
                >
                  {position == 1 || position == "1" ? <img src={img1} /> : null}
                  {position == 2 || position == "2" ? <img src={img2} /> : null}
                  {position == 3 || position == "3" ? <img src={img3} /> : null}
                  {position == 4 || position == "4" ? <img src={img4} /> : null}
                  {position == 5 || position == "5" ? <img src={img5} /> : null}
                  {position == 6 || position == "6" ? <img src={img6} /> : null}
                  {position == 7 || position == "7" ? <img src={img7} /> : null}
                  {position == 8 || position == "8" ? <img src={img8} /> : null}
                  {position == 9 || position == "9" ? <img src={img9} /> : null}
                </td>
              ))}
            </tr>
          ))}
        </table>

        <table style={{ top: "50vh", left: "40vh" }}>
          <tr>
            <td></td>
            <td>
              <p
                style={{
                  fontSize: 24,
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Estado Objetivo:
              </p>
            </td>
          </tr>

          {obj.map((item, lin) => (
            <tr>
              {item.map((position, col) => (
                <td
                  style={{ borderWidth: 2 }}
                  onClick={() => setFieldObj(lin, col, setObj, obj)}
                >
                  {position == 1 || position == "1" ? <img src={img1} /> : null}
                  {position == 2 || position == "2" ? <img src={img2} /> : null}
                  {position == 3 || position == "3" ? <img src={img3} /> : null}
                  {position == 4 || position == "4" ? <img src={img4} /> : null}
                  {position == 5 || position == "5" ? <img src={img5} /> : null}
                  {position == 6 || position == "6" ? <img src={img6} /> : null}
                  {position == 7 || position == "7" ? <img src={img7} /> : null}
                  {position == 8 || position == "8" ? <img src={img8} /> : null}
                  {position == 9 || position == "9" ? <img src={img9} /> : null}
                </td>
              ))}
            </tr>
          ))}
        </table>

        <table style={{ marginLeft: 20 }}>
          <tr>
            <td>
              <p
                style={{
                  fontSize: 24,
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Escolha Partes:
              </p>
            </td>
          </tr>

          <tr>
            <th
              style={choosed === 1 ? { borderWidth: 2 } : {}}
              onClick={() => setChoosed(1)}
            >
              <img src={img1} />
            </th>
            <th
              style={choosed === 5 ? { borderWidth: 2 } : {}}
              onClick={() => setChoosed(5)}
            >
              <img src={img5} />
            </th>
          </tr>
          <tr>
            <th
              style={choosed === 2 ? { borderWidth: 2 } : {}}
              onClick={() => setChoosed(2)}
            >
              <img src={img2} />
            </th>
            <th
              style={choosed === 6 ? { borderWidth: 2 } : {}}
              onClick={() => setChoosed(6)}
            >
              <img src={img6} />
            </th>
          </tr>
          <tr>
            <th
              style={choosed === 3 ? { borderWidth: 2 } : {}}
              onClick={() => setChoosed(3)}
            >
              <img src={img3} />
            </th>
            <th
              style={choosed === 7 ? { borderWidth: 2 } : {}}
              onClick={() => setChoosed(7)}
            >
              <img src={img7} />
            </th>
          </tr>
          <tr>
            <th
              style={choosed === 4 ? { borderWidth: 2 } : {}}
              onClick={() => setChoosed(4)}
            >
              <img src={img4} />
            </th>
            <th
              style={choosed === 8 ? { borderWidth: 2 } : {}}
              onClick={() => setChoosed(8)}
            >
              <img src={img8} />
            </th>
          </tr>
          <tr>
            <th></th>
            <th
              style={choosed === 9 ? { borderWidth: 2 } : {}}
              onClick={() => setChoosed(9)}
            >
              <img src={img9} />
            </th>
          </tr>
        </table>

        <table style={{ left: "55vw" }}>
          <tr>
            <th>Abertos</th>
            <th>Fechados</th>
            <th>X</th>
          </tr>
          {abertos.map((item, index) => {
            return (
              <tr>
                <th style={{ width: 120, height: 20 }}>{abertos[index]}</th>
                <th style={{ width: 120, height: 20 }}>{fechados[index]}</th>
                <th style={{ width: 120, height: 20 }}>{atual[index]}</th>
              </tr>
            );
          })}
        </table>
        <Button
          style={{ position: "absolute", top: "15vh", left: "45vw" }}
          onClick={submitForm}
        >
          Iniciar
        </Button>
        <Button
          style={{ position: "absolute", top: "25vh", left: "45vw" }}
          onClick={() =>
            setPosition([
              ["-", "-", "-"],
              ["-", "-", "-"],
              ["-", "-", "-"],
            ])
          }
        >
          Limpar Est. Jogo
        </Button>
        <Button
          style={{ position: "absolute", top: "35vh", left: "45vw" }}
          onClick={() =>
            setObj([
              ["-", "-", "-"],
              ["-", "-", "-"],
              ["-", "-", "-"],
            ])
          }
        >
          Limpar Est. Objetivo
        </Button>
        <Button
          style={{ position: "absolute", top: "45vh", left: "45vw" }}
          onClick={() => automaticTest()}
        >
          Auto-Teste Lento
        </Button>
        <Button
          style={{ position: "absolute", top: "55vh", left: "45vw" }}
          onClick={() => automaticTest2()}
        >
          Auto-Teste R??pido
        </Button>
        {/* <Button
          style={{ position: "absolute", top: "65vh", left: "45vw" }}
          onClick={() => automaticTest3()}
        >
          Auto-Teste R??pido 2
        </Button> */}
      </body>
    </div>
  );
}

export default App;
