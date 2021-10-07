import { useState } from "react";

const r = 8;
const c = 3;

let tiles = new Array(r);

for (let i = 0; i < tiles.length; i++) {
  tiles[i] = new Array(c);
}

for (let i = 0; i < r; i++) {
  for (let j = 0; j < c; j++) {
    tiles[i][j] = -1;
  }
}

const Tile = () => {
  //eslint-disable-next-line
  const [board, setBoard] = useState(tiles);
  //const [selected, setSelected] = useState({});
  let tile;

  const handleDotClick = (e) => {
    console.log(e.target.id);
  };

  const handleLineClick = (start, end) => {
    //let temp = { ...selected };
    console.log(start, " ", end);
  };

  return (
    <div className="flex-flex-col">
      {board.map((row, i) => (
        <div className="flex" key={i}>
          {row.map((block, j) => {
            if (i < r - 1) {
              if (j < c - 1) {
                tile = (
                  <div className="flex flex-col" key={j}>
                    <div className="flex">
                      <div
                        className="h-1 w-1 bg-black rounded-full"
                        id={`${i}${j}`}
                        onClick={(e) => handleDotClick(e)}
                      />
                      <div
                        className="cursor-pointer hover:bg-red-500 h-1 w-16 rounded-full"
                        onClick={() =>
                          handleLineClick(`${i}${j}`, `${i}${j + 1}`)
                        }
                      />
                    </div>
                    <div className="flex">
                      <div
                        className="cursor-pointer hover:bg-red-500 h-16 w-1 rounded-full"
                        onClick={() =>
                          handleLineClick(`${i}${j}`, `${i + 1}${j}`)
                        }
                      />
                      <div className="h-16 w-16 rounded-full" />
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
                        onClick={(e) => handleDotClick(e)}
                      />
                      <div
                        className="cursor-pointer hover:bg-red-500 h-1 w-16 rounded-full"
                        onClick={() =>
                          handleLineClick(`${i}${j}`, `${i}${j + 1}`)
                        }
                      />
                      <div
                        className="h-1 w-1 bg-black rounded-full"
                        id={`${i}${j + 1}`}
                        onClick={(e) => handleDotClick(e)}
                      />
                    </div>
                    <div className="flex">
                      <div
                        className="cursor-pointer hover:bg-red-500 h-16 w-1 rounded-full"
                        onClick={() =>
                          handleLineClick(`${i}${j}`, `${i + 1}${j}`)
                        }
                      />
                      <div className="h-16 w-16 rounded-full" />
                      <div
                        className="cursor-pointer hover:bg-red-500 h-16 w-1 rounded-full"
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
                        onClick={(e) => handleDotClick(e)}
                      />
                      <div
                        className="cursor-pointer hover:bg-red-500 h-1 w-16 rounded-full"
                        onClick={() =>
                          handleLineClick(`${i}${j}`, `${i}${j + 1}`)
                        }
                      />
                    </div>
                    <div className="flex">
                      <div
                        className="cursor-pointer hover:bg-red-500 h-16 w-1 rounded-full"
                        onClick={() =>
                          handleLineClick(`${i}${j}`, `${i + 1}${j}`)
                        }
                      />
                      <div className="h-16 w-16 rounded-full" />
                    </div>
                    <div className="flex">
                      <div
                        className="h-1 w-1 bg-black rounded-full"
                        id={`${i + 1}${j}`}
                        onClick={(e) => handleDotClick(e)}
                      />
                      <div
                        className="cursor-pointer hover:bg-red-500 h-1 w-16 rounded-full"
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
                        onClick={(e) => handleDotClick(e)}
                      />
                      <div
                        className="cursor-pointer hover:bg-red-500 h-1 w-16 rounded-full"
                        onClick={() =>
                          handleLineClick(`${i}${j}`, `${i}${j + 1}`)
                        }
                      />
                      <div
                        className="h-1 w-1 bg-black rounded-full"
                        id={`${i}${j + 1}`}
                        onClick={(e) => handleDotClick(e)}
                      />
                    </div>
                    <div className="flex">
                      <div
                        className="cursor-pointer hover:bg-red-500 h-16 w-1 rounded-full"
                        onClick={() =>
                          handleLineClick(`${i}${j}`, `${i + 1}${j}`)
                        }
                      />
                      <div className="h-16 w-16 rounded-full" />
                      <div
                        className="cursor-pointer hover:bg-red-500 h-16 w-1 rounded-full"
                        onClick={() =>
                          handleLineClick(`${i}${j + 1}`, `${i + 1}${j + 1}`)
                        }
                      />
                    </div>
                    <div className="flex">
                      <div
                        className="h-1 w-1 bg-black rounded-full"
                        id={`${i + 1}${j}`}
                        onClick={(e) => handleDotClick(e)}
                      />
                      <div
                        className="cursor-pointer hover:bg-red-500 h-1 w-16 rounded-full"
                        onClick={() =>
                          handleLineClick(`${i + 1}${j}`, `${i + 1}${j + 1}`)
                        }
                      />
                      <div
                        className="h-1 w-1 bg-black rounded-full"
                        id={`${i + 1}${j + 1}`}
                        onClick={(e) => handleDotClick(e)}
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
