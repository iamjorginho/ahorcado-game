import "./App.css";
import HangImagen from "./components/HangImagen";
import { letters } from "./helpers/letters";
import { useState, useEffect } from "react";
import getWord from './helpers/getWord';

function App() {

  const [word, setWord] = useState( getWord() )
  const [hiddenWorld, setHiddenWorld] = useState('_ '.repeat(word.length))
  const [intentos, setIntentos] = useState(0);
  const [lose, setLose] =useState(false);
  const [won, setWon] = useState(false)


  // Determinar si la persona perdio
  useEffect(() => {
    if(intentos >= 9) {
      setLose(true)
    }
  }, [intentos])

  useEffect(() => {
    const currentWorld = hiddenWorld.split(' ').join('')
    if(currentWorld === word){
       setWon(true)
    }

  }, [ hiddenWorld ])
  

 const newGame = () => {
  const newWord = getWord()

  setWord(newWord)
  setHiddenWorld('_ '.repeat(newWord.length))
  setIntentos(0)
  setLose(false)
  setWon(false)

  console.log('nuevo juego')
 }

  const checkLetter = (letras: string) => {
    if(lose) return //no devolver nada si pierdes
    if(won) return  //no devolver nada si ganas

    if (!word.includes(letras)) {
      setIntentos(Math.min(intentos + 1, 9));
      return
    
    }

    const hiddenArray = hiddenWorld.split(' ');

    for (let i = 0; i < word.length; i++) {

      if(word[i] === letras) {
        hiddenArray[i] = letras
      }
    
    }

    setHiddenWorld(hiddenArray.join(' '))
    
  };

  return (
    <div className="App">
      <HangImagen imageNumber={intentos} />

      <h3>{hiddenWorld}</h3>

      <h3>Intentos: {intentos}</h3>

      {
        lose ? <h3>Perdio la palabra era {word}</h3> : ' '
      }

      {
        won ? <h3>Ganaste!!: {word}</h3> : ' '
      }


      {letters.map((letters) => (
        <button onClick={() => checkLetter(letters)} key={letters}>
          {letters}
        </button>
      ))}
      <br/>

       <button onClick={ newGame }>nuevo juego?</button>
    </div>
  );
}

export default App;

