import { Square } from "./Square";

export function WinnerModal({ winner, resetGame }) {
  if (winner === null) return null;

  const winnerText = winner === false ? "It's a tie!" : "has won!";

  return (
    <section className="winner">
      <div className="text">
        <header className="win">{winner && <Square>{winner}</Square>}</header>
        <h2>{winnerText}</h2>
        <footer>
          <button onClick={resetGame}>Start again!</button>
        </footer>
      </div>
    </section>
  );
}
