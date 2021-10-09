import { useState, useEffect, useMemo } from "react";

const Tile = ({ r, c }) => {
  const [board, setBoard] = useState(null);
  const [selected, setSelected] = useState({});
  const [player, setPlayer] = useState(0);
  const [p0Moves, setP0Moves] = useState({});
  const [p1Moves, setP1Moves] = useState({});
  let tile;
  let tiles = useMemo(() => new Array(r), [r]);

  for (let i = 0; i < tiles.length; i++) {
    tiles[i] = new Array(c);
  }

  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      tiles[i][j] = -1;
    }
  }

  const resetBoard = (selected) => {
    for (let i = 0; i < r; i++) {
      for (let j = 0; j < c; j++) {
        if (board[i][j] === -1) {
          if (
            selected.hasOwnProperty(`${i}${j}`) &&
            selected[`${i}${j}`].includes(`${i}${j + 1}`) &&
            selected.hasOwnProperty(`${i}${j + 1}`) &&
            selected[`${i}${j + 1}`].includes(`${i + 1}${j + 1}`) &&
            selected.hasOwnProperty(`${i}${j}`) &&
            selected[`${i}${j}`].includes(`${i + 1}${j}`) &&
            selected.hasOwnProperty(`${i + 1}${j}`) &&
            selected[`${i + 1}${j}`].includes(`${i + 1}${j + 1}`)
          ) {
            const temp = [...board];
            temp[i].splice(j, 1, player);
            setBoard(temp);
          }
        }
      }
    }
  };

  const handleLineClick = (start, end) => {
    let temp = { ...selected };
    if (temp.hasOwnProperty(start)) {
      temp[start] = [...temp[start], end];
    } else {
      temp[start] = [end];
    }
    if (player === 0) {
      let temp = { ...p0Moves };
      if (temp.hasOwnProperty(start)) {
        temp[start] = [...temp[start], end];
      } else {
        temp[start] = [end];
      }
      setP0Moves(temp);
    } else {
      let temp = { ...p1Moves };
      if (temp.hasOwnProperty(start)) {
        temp[start] = [...temp[start], end];
      } else {
        temp[start] = [end];
      }
      setP1Moves(temp);
    }
    setSelected(temp);
    resetBoard(temp);
    if (player === 0) {
      setPlayer(1);
    } else {
      setPlayer(0);
    }
  };

  useEffect(() => {
    setBoard(tiles);
    //eslint-disable-next-line
  }, []);

  const isp0 = (start, end) => {
    if (p0Moves.hasOwnProperty(start)) {
      if (p0Moves[start].includes(end)) {
        return true;
      } else return false;
    } else return false;
  };

  const isp1 = (start, end) => {
    if (p1Moves.hasOwnProperty(start)) {
      if (p1Moves[start].includes(end)) {
        return true;
      } else return false;
    } else return false;
  };

  return (
    <div className="flex-flex-col">
      {board?.map((row, i) => (
        <div className="flex" key={i}>
          {row?.map((block, j) => {
            if (i < r - 1) {
              if (j < c - 1) {
                tile = (
                  <div className="flex flex-col" key={j}>
                    <div className="flex">
                      <div
                        className="h-1 w-1 bg-black rounded-full"
                        id={`${i}${j}`}
                      />
                      <div
                        className={`cursor-pointer h-1 w-16 rounded-full ${
                          isp0(`${i}${j}`, `${i}${j + 1}`)
                            ? "bg-red-500"
                            : isp1(`${i}${j}`, `${i}${j + 1}`)
                            ? "bg-blue-500"
                            : player === 0
                            ? " hover:bg-red-500"
                            : " hover:bg-blue-500"
                        }`}
                        onClick={() =>
                          handleLineClick(`${i}${j}`, `${i}${j + 1}`)
                        }
                      />
                    </div>
                    <div className="flex">
                      <div
                        className={`cursor-pointer h-16 w-1 rounded-full ${
                          isp0(`${i}${j}`, `${i + 1}${j}`)
                            ? "bg-red-500"
                            : isp1(`${i}${j}`, `${i + 1}${j}`)
                            ? "bg-blue-500"
                            : player === 0
                            ? " hover:bg-red-500"
                            : " hover:bg-blue-500"
                        }`}
                        onClick={() =>
                          handleLineClick(`${i}${j}`, `${i + 1}${j}`)
                        }
                      />
                      <div
                        className={`h-16 w-16 rounded-sm flex items-center justify-center`}
                      >
                        <div
                          className={`h-12 w-12 rounded-full  ${
                            block === 0
                              ? "bg-red-500"
                              : block === 1
                              ? "bg-blue-500"
                              : ""
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                );
              } else {
                tile = (
                  <div className="flex flex-col" key={j}>
                    <div className="flex">
                      <div
                        className="h-1 w-1 bg-black rounded-full"
                        id={`${i}${j}`}
                      />
                      <div
                        className={`cursor-pointer h-1 w-16 rounded-full ${
                          isp0(`${i}${j}`, `${i}${j + 1}`)
                            ? "bg-red-500"
                            : isp1(`${i}${j}`, `${i}${j + 1}`)
                            ? "bg-blue-500"
                            : player === 0
                            ? " hover:bg-red-500"
                            : " hover:bg-blue-500"
                        }`}
                        onClick={() =>
                          handleLineClick(`${i}${j}`, `${i}${j + 1}`)
                        }
                      />
                      <div
                        className="h-1 w-1 bg-black rounded-full"
                        id={`${i}${j + 1}`}
                      />
                    </div>
                    <div className="flex">
                      <div
                        className={`cursor-pointer h-16 w-1 rounded-full ${
                          isp0(`${i}${j}`, `${i + 1}${j}`)
                            ? "bg-red-500"
                            : isp1(`${i}${j}`, `${i + 1}${j}`)
                            ? "bg-blue-500"
                            : player === 0
                            ? " hover:bg-red-500"
                            : " hover:bg-blue-500"
                        }`}
                        onClick={() =>
                          handleLineClick(`${i}${j}`, `${i + 1}${j}`)
                        }
                      />
                      <div
                        className={`h-16 w-16 rounded-sm flex justify-center items-center `}
                      >
                        <div
                          className={`h-12 w-12 rounded-full ${
                            block === 0
                              ? "bg-red-500"
                              : block === 1
                              ? "bg-blue-500"
                              : ""
                          }`}
                        />{" "}
                      </div>
                      <div
                        className={`cursor-pointer h-16 w-1 rounded-full ${
                          isp0(`${i}${j + 1}`, `${i + 1}${j + 1}`)
                            ? "bg-red-500"
                            : isp1(`${i}${j + 1}`, `${i + 1}${j + 1}`)
                            ? "bg-blue-500"
                            : player === 0
                            ? " hover:bg-red-500"
                            : " hover:bg-blue-500"
                        }`}
                        onClick={() =>
                          handleLineClick(`${i}${j + 1}`, `${i + 1}${j + 1}`)
                        }
                      />
                    </div>
                  </div>
                );
              }
            } else {
              if (j < c - 1) {
                tile = (
                  <div className="flex flex-col" key={j}>
                    <div className="flex">
                      <div
                        className="h-1 w-1 bg-black rounded-full"
                        id={`${i}${j}`}
                      />
                      <div
                        className={`cursor-pointer h-1 w-16 rounded-full ${
                          isp0(`${i}${j}`, `${i}${j + 1}`)
                            ? "bg-red-500"
                            : isp1(`${i}${j}`, `${i}${j + 1}`)
                            ? "bg-blue-500"
                            : player === 0
                            ? " hover:bg-red-500"
                            : " hover:bg-blue-500"
                        }`}
                        onClick={() =>
                          handleLineClick(`${i}${j}`, `${i}${j + 1}`)
                        }
                      />
                    </div>
                    <div className="flex">
                      <div
                        className={`cursor-pointer h-16 w-1 rounded-full ${
                          isp0(`${i}${j}`, `${i + 1}${j}`)
                            ? "bg-red-500"
                            : isp1(`${i}${j}`, `${i + 1}${j}`)
                            ? "bg-blue-500"
                            : player === 0
                            ? " hover:bg-red-500"
                            : " hover:bg-blue-500"
                        }`}
                        onClick={() =>
                          handleLineClick(`${i}${j}`, `${i + 1}${j}`)
                        }
                      />
                      <div
                        className={`h-16 w-16 rounded-sm flex justify-center items-center `}
                      >
                        <div
                          className={`h-12 w-12 rounded-full ${
                            block === 0
                              ? "bg-red-500"
                              : block === 1
                              ? "bg-blue-500"
                              : ""
                          }`}
                        />{" "}
                      </div>
                    </div>
                    <div className="flex">
                      <div
                        className="h-1 w-1 bg-black rounded-full"
                        id={`${i + 1}${j}`}
                      />
                      <div
                        className={`cursor-pointer h-1 w-16 rounded-full ${
                          isp0(`${i + 1}${j}`, `${i + 1}${j + 1}`)
                            ? "bg-red-500"
                            : isp1(`${i + 1}${j}`, `${i + 1}${j + 1}`)
                            ? "bg-blue-500"
                            : player === 0
                            ? " hover:bg-red-500"
                            : " hover:bg-blue-500"
                        }`}
                        onClick={() =>
                          handleLineClick(`${i + 1}${j}`, `${i + 1}${j + 1}`)
                        }
                      />
                    </div>
                  </div>
                );
              } else {
                tile = (
                  <div className="flex flex-col" key={j}>
                    <div className="flex">
                      <div
                        className="h-1 w-1 bg-black rounded-full"
                        id={`${i}${j}`}
                      />
                      <div
                        className={`cursor-pointer h-1 w-16 rounded-full ${
                          isp0(`${i}${j}`, `${i}${j + 1}`)
                            ? "bg-red-500"
                            : isp1(`${i}${j}`, `${i}${j + 1}`)
                            ? "bg-blue-500"
                            : player === 0
                            ? " hover:bg-red-500"
                            : " hover:bg-blue-500"
                        }`}
                        onClick={() =>
                          handleLineClick(`${i}${j}`, `${i}${j + 1}`)
                        }
                      />
                      <div
                        className="h-1 w-1 bg-black rounded-full"
                        id={`${i}${j + 1}`}
                      />
                    </div>
                    <div className="flex">
                      <div
                        className={`cursor-pointer h-16 w-1 rounded-full ${
                          isp0(`${i}${j}`, `${i + 1}${j}`)
                            ? "bg-red-500"
                            : isp1(`${i}${j}`, `${i + 1}${j}`)
                            ? "bg-blue-500"
                            : player === 0
                            ? " hover:bg-red-500"
                            : " hover:bg-blue-500"
                        }`}
                        onClick={() =>
                          handleLineClick(`${i}${j}`, `${i + 1}${j}`)
                        }
                      />
                      <div
                        className={`h-16 w-16 rounded-sm flex justify-center items-center `}
                      >
                        <div
                          className={`h-12 w-12 rounded-full ${
                            block === 0
                              ? "bg-red-500"
                              : block === 1
                              ? "bg-blue-500"
                              : ""
                          } `}
                        />
                      </div>
                      <div
                        className={`cursor-pointer h-16 w-1 rounded-full ${
                          isp0(`${i}${j + 1}`, `${i + 1}${j + 1}`)
                            ? "bg-red-500"
                            : isp1(`${i}${j + 1}`, `${i + 1}${j + 1}`)
                            ? "bg-blue-500"
                            : player === 0
                            ? " hover:bg-red-500"
                            : " hover:bg-blue-500"
                        }`}
                        onClick={() =>
                          handleLineClick(`${i}${j + 1}`, `${i + 1}${j + 1}`)
                        }
                      />
                    </div>
                    <div className="flex">
                      <div
                        className="h-1 w-1 bg-black rounded-full"
                        id={`${i + 1}${j}`}
                      />
                      <div
                        className={`cursor-pointer h-1 w-16 rounded-full ${
                          isp0(`${i + 1}${j}`, `${i + 1}${j + 1}`)
                            ? "bg-red-500"
                            : isp1(`${i + 1}${j}`, `${i + 1}${j + 1}`)
                            ? "bg-blue-500"
                            : player === 0
                            ? " hover:bg-red-500"
                            : " hover:bg-blue-500"
                        }`}
                        onClick={() =>
                          handleLineClick(`${i + 1}${j}`, `${i + 1}${j + 1}`)
                        }
                      />
                      <div
                        className="h-1 w-1 bg-black rounded-full"
                        id={`${i + 1}${j + 1}`}
                      />
                    </div>
                  </div>
                );
              }
            }
            return tile;
          })}
        </div>
      ))}
    </div>
  );
};

export default Tile;
