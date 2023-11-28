import { WINNER_COMBO } from "../constants";

export const checkWinnerFrom = (boardToCheck) => {
  /**
   * *revisar todas las combinaciones posibles
   * *para ver si X o 0 ha ganado
   */
  for (const combo of WINNER_COMBO) {
    const [a, b, c] = combo;
    if (
      boardToCheck[a] &&
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[a] === boardToCheck[c]
    ) {
      return boardToCheck[a];
    }
  }
  return null;
};

export const checkEndGame = (newBoard) => {
  /**
   * *en caso de empate revisar si no hay casillas vacías
   */
  return newBoard.every((square) => square !== null);
};
