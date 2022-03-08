import logo from './logo.svg';
import './App.css';
import { RiNumber1 } from 'react-icons/ri'
import { useState } from 'react'
function App() {
  const [positions, setPosition] = useState([
    [1,2,3],
    [4,5,6],
    [7,"",8]
  ])

  function Move(line,col) {
    if(positions[line][col] != '') {
      let newPositiions = [...positions]
      // console.log("Line possibilities || ", 0 <= line - 1 <= 2)
      if(0 <= line - 1 && line - 1 <= 2 && positions[line - 1][col] == ''){
        console.log("Move para cima")
        newPositiions[line - 1][col] = positions[line][col]
        newPositiions[line][col] = ''
      }
      if(0 <= line + 1 && line + 1 <= 2 && positions[line + 1][col] == ''){
        console.log("Move para baixo")
        newPositiions[line + 1][col] = positions[line][col]
        newPositiions[line][col] = ''
      }
      if(0 <= col - 1 && col - 1 <= 2 && positions[line][col - 1] == ''){
        console.log("Move para esquerda")
        newPositiions[line][col - 1] = positions[line][col]
        newPositiions[line][col] = ''
      }
      if(0 <= col + 1 && col + 1 <= 2 && positions[line][col + 1] == ''){
        console.log("Move para direta")
        newPositiions[line][col  + 1] = positions[line][col]
        newPositiions[line][col] = ''
      }

      setPosition(newPositiions)
      // if(positions[line - 1][col] == '') console.log("Move para cima")
      // if(positions[line + 1][col] == '') console.log("Move para baixo")
      // if(positions[line][col - 1] == '') console.log("Move para esquerda")
      // if(positions[line][col + 1] == '') console.log("Move para direta")
    }
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
          {positions.map((item,lin) => (
            <tr>
              {item.map((position,col) => (
                <td onClick={() => Move(lin,col)}>{position}</td>
              ))}
            </tr>
          ))}
          {/* <tr>
            <td>{positions[0].value}</td>
            <td>{positions[1].value}</td>
            <td>{positions[2].value}</td>
          </tr>
          <tr>
            <td>{positions[3].value}</td>
            <td onClick={() => move(4)}>{positions[4].value}</td>
            <td>{positions[5].value}</td>
          </tr>
          <tr>
            <td>{positions[6].value}</td>
            <td>{positions[7].value}</td>
            <td>{positions[8].value}</td>
          </tr> */}
        </table>
      </body>
    </div>
  );
}

export default App;
