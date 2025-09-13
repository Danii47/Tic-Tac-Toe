import { useState } from "react"
import { checkWinner } from "./logic/checkWinner"
import Square from "./components/Square/Square" 
import "./index.css"

const TURNS = {
  X: "×",
  O: "o"
}


export default function App() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.X)

  // ! null => no hay ganador || false => empate
  const [winner, setWinner] = useState(null)

  

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  const updateBoard = (indexSelected) => {
    if (board[indexSelected] || winner) return

    const newBoard = board.toSpliced(indexSelected, 1, turn)
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    const newWinner = checkWinner(newBoard)
    
    setWinner(newWinner)
    setBoard(newBoard)
    setTurn(newTurn)

  }

  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Reset del juego</button>
      <section className="game">
        {
          board.map((_, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
                children={board[index]}
              />
            )
          })
        }
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.X} children={TURNS.X} />
        <Square isSelected={turn === TURNS.O} children={TURNS.O} />
      </section>

      {
        winner !== null && (
          <section className="winner">
            <div className="text">
              <h2>
                {
                  winner === false
                    ? "Empate"
                    : "Ganó:"
                }
              </h2>
              <header className="win">
                {winner && <Square children={winner} />}
              </header>

              <footer>
                <button onClick={resetGame}>Empezar de nuevo</button>
              </footer>
            </div>
          </section>
        )
      }
    </main>
  )

}
