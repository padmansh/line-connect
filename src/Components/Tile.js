import { useState, useEffect, useMemo } from "react";

const Tile = ({ r, c }) => {
  const [board, setBoard] = useState(null);
  const [selected, setSelected] = useState({});
  const [player, setPlayer] = useState(0);
  const [p0Moves, setP0Moves] = useState({});
  const [p1Moves, setP1Moves] = useState({});
  const [p0BoxCount, setP0BoxCount] = useState(0);
  const [p1BoxCount, setP1BoxCount] = useState(0);
  const [latestP0, setLatestP0] = useState({});
  const [latestP1, setLatestP1] = useState({});

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

  console.log(p0BoxCount, p1BoxCount, 'kl');
  console.log(latestP0, latestP1, 'board');

  const resetBoard = (selected) => {
    let flip = false;
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
            flip = true;

            if (player === 0) {
              setP0BoxCount(p0BoxCount + 1);
              setLatestP0({i:i,j:j});
            }
            else {
              setP1BoxCount(p1BoxCount + 1);
              setLatestP1({i:i,j:j});
            }
          }
        }
      }
    }
    return flip;
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
    let flip = resetBoard(temp);
    if (!flip) {
      if (player === 0) {
        setPlayer(1);
      } else {
        setPlayer(0);
      }
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
                    <div className="flex items-center">
                      <div
                        className="h-2 w-2 bg-black rounded-full"
                        id={`${i}${j}`}
                      />
                      <div
                        className={`cursor-pointer h-1.5 w-16 rounded-full relative flex items-center ${
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
                      >
                        <div className=" absolute h-6 w-16 rounded-full" />
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <div
                        className={`cursor-pointer h-16 w-1.5 rounded-full flex justify-center relative ${
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
                      >
                        <div className="absolute h-16 w-6 rounded-full" />
                      </div>
                      <div
                        className={`h-16 w-16 p-1.5 rounded-sm flex items-center justify-center`}
                      >
                        <div
                          className={`-mr-0.5 h-full w-full rounded-sm flex justify-center items-center ${
                            block === 0
                              ? "bg-red-500"
                              : block === 1
                              ? "bg-blue-500"
                              : ""
                          }`}
                        >
                          <div className='text-white text-2xl font-semibold'>
                          {(latestP0?.i === i && latestP0?.j===j)
                          ? p0BoxCount
                          : (latestP1?.i===i && latestP1?.j===j)
                          ? p1BoxCount
                        : null }
                        </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              } else {
                tile = (
                  <div className="flex flex-col" key={j}>
                    <div className="flex items-center">
                      <div
                        className="h-2 w-2 bg-black rounded-full"
                        id={`${i}${j}`}
                      />
                      <div
                        className={`cursor-pointer h-1.5 w-16 rounded-full relative flex items-center ${
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
                      >
                        <div className=" absolute h-6 w-16 rounded-full" />
                      </div>
                      <div
                        className="h-2 w-2 bg-black rounded-full"
                        id={`${i}${j + 1}`}
                      />
                    </div>
                    <div className="flex justify-center">
                      <div
                        className={`cursor-pointer h-16 w-1.5 rounded-full relative flex justify-center mr-0.5 ${
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
                      >
                        <div className=" absolute h-16 w-6 rounded-full" />
                      </div>
                      <div
                        className={`h-16 w-16 p-1.5 rounded-sm flex justify-center items-center `}
                      >
                        <div
                          className={`-ml-0.5 h-full w-full rounded-sm flex justify-center items-center ${
                            block === 0
                              ? "bg-red-500"
                              : block === 1
                              ? "bg-blue-500"
                              : ""
                          }`}
                        >
                          <div className='text-white text-2xl font-semibold'>
                          {(latestP0?.i === i && latestP0?.j===j)
                          ? p0BoxCount
                          : (latestP1?.i===i && latestP1?.j===j)
                          ? p1BoxCount
                        : null }
                        </div>
                        </div>
                      </div>
                      <div
                        className={`cursor-pointer h-16 w-1.5 rounded-full relative flex justify-center ${
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
                      >
                        <div className=" absolute h-16 w-6 rounded-full" />
                      </div>
                    </div>
                  </div>
                );
              }
            } else {
              if (j < c - 1) {
                tile = (
                  <div className="flex flex-col" key={j}>
                    <div className="flex items-center">
                      <div
                        className="h-2 w-2 bg-black rounded-full"
                        id={`${i}${j}`}
                      />
                      <div
                        className={`cursor-pointer h-1.5 w-16 rounded-full relative flex items-center ${
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
                      >
                        <div className=" absolute h-6 w-16 rounded-full" />
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <div
                        className={`cursor-pointer h-16 w-1.5 rounded-full relative flex justify-center ${
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
                      >
                        <div className=" absolute h-16 w-6 rounded-full" />
                      </div>
                      <div
                        className={`h-16 w-16 p-1.5 rounded-sm flex justify-center items-center `}
                      >
                        <div
                          className={`-mr-0.5 h-full w-full rounded-sm flex justify-center items-center ${
                            block === 0
                              ? "bg-red-500"
                              : block === 1
                              ? "bg-blue-500"
                              : ""
                          }`}
                        >
                          <div className='text-white text-2xl font-semibold'>
                          {(latestP0?.i === i && latestP0?.j===j)
                          ? p0BoxCount
                          : (latestP1?.i===i && latestP1?.j===j)
                          ? p1BoxCount
                        : null }
                        </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div
                        className="h-2 w-2 bg-black rounded-full"
                        id={`${i + 1}${j}`}
                      />
                      <div
                        className={`cursor-pointer h-1.5 w-16 rounded-full relative flex items-center ${
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
                      >
                        <div className=" absolute h-6 w-16 rounded-full" />
                      </div>
                    </div>
                  </div>
                );
              } else {
                tile = (
                  <div className="flex flex-col" key={j}>
                    <div className="flex items-center">
                      <div
                        className="h-2 w-2 bg-black rounded-full"
                        id={`${i}${j}`}
                      />
                      <div
                        className={`cursor-pointer h-1.5 w-16 rounded-full relative flex items-center ${
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
                      >
                        <div className=" absolute h-6 w-16 rounded-full" />
                      </div>
                      <div
                        className="h-2 w-2 bg-black rounded-full"
                        id={`${i}${j + 1}`}
                      />
                    </div>
                    <div className="flex justify-center">
                      <div
                        className={`cursor-pointer h-16 w-1.5 rounded-full relative flex justify-center mr-0.5 ${
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
                      >
                        <div className=" absolute h-16 w-6 rounded-full" />
                      </div>
                      <div
                        className={`h-16 w-16 p-1.5 rounded-sm flex justify-center items-center `}
                      >
                        <div
                          className={`-ml-0.5 h-full w-full rounded-sm flex justify-center items-center ${
                            block === 0
                              ? "bg-red-500"
                              : block === 1
                              ? "bg-blue-500"
                              : ""
                          } `}
                        >
                          <div className='text-white text-2xl font-semibold'>
                          {(latestP0?.i === i && latestP0?.j===j)
                          ? p0BoxCount
                          : (latestP1?.i===i && latestP1?.j===j)
                          ? p1BoxCount
                        : null }
                        </div>
                        </div>
                      </div>
                      <div
                        className={`cursor-pointer h-16 w-1.5 relative flex justify-center rounded-full ${
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
                      >
                        <div className=" absolute h-16 w-6 rounded-full" />
                      </div>
                    </div>
                    <div className="flex">
                      <div
                        className="h-2 w-2 bg-black rounded-full"
                        id={`${i + 1}${j}`}
                      />
                      <div
                        className={`cursor-pointer h-1.5 w-16 rounded-full relative flex items-center ${
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
                      >
                        <div className=" absolute h-6 w-16 rounded-full" />
                      </div>
                      <div
                        className="h-2 w-2 bg-black rounded-full"
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
