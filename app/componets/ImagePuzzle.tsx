'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Lightbulb } from 'lucide-react'; 
const shuffleArray = (array: number[]) => {
  const newArray = [...array];
  let inversions = 0;
  // Fisher-Yates shuffle
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }

  for (let i = 0; i < newArray.length - 1; i++) {
    for (let j = i + 1; j < newArray.length; j++) {
      if (newArray[i] !== 8 && newArray[j] !== 8 && newArray[i] > newArray[j]) {
        inversions++;
      }
    }
  }

  if (inversions % 2 !== 0) {
    if (newArray[0] !== 8 && newArray[1] !== 8) {
      [newArray[0], newArray[1]] = [newArray[1], newArray[0]];
    } else {
      [newArray[2], newArray[3]] = [newArray[3], newArray[2]];
    }
  }
  
  return newArray;
};

const correctOrder = Array.from({ length: 9 }, (_, i) => i);

const ImagePuzzle = () => {
  const [pieces, setPieces] = useState(correctOrder);
  const [solved, setSolved] = useState(false);
  const [showTip, setShowTip] = useState(false);

  const shufflePuzzle = useCallback(() => {
    let shuffled;
    do {
      shuffled = shuffleArray(correctOrder);
    } while (shuffled.every((p, i) => p === i));

    setPieces(shuffled);
    setSolved(false);
    setShowTip(false); 
  }, []); 
  
  useEffect(() => {
    shufflePuzzle();
  }, [shufflePuzzle]);

  const checkSolved = (currentPieces: number[]) => {
    const isSolved = currentPieces.every((p, i) => p === i);
    if (isSolved) {
      setSolved(true);
    }
  };
  
  const handlePieceClick = (index: number) => {
    if (solved) return;

    const emptyIndex = pieces.indexOf(8);
    const targetIndex = index;

    const isAdjacent = 
      (Math.abs(targetIndex - emptyIndex) === 1 && Math.floor(targetIndex / 3) === Math.floor(emptyIndex / 3)) ||
      (Math.abs(targetIndex - emptyIndex) === 3);

    if (isAdjacent) {
      const newPieces = [...pieces];
      [newPieces[emptyIndex], newPieces[targetIndex]] = [newPieces[targetIndex], newPieces[emptyIndex]];
      setPieces(newPieces);
      checkSolved(newPieces);
    }
  };

  const puzzleSize = 300;
  const pieceSize = puzzleSize / 3;

  return (
    <div className="flex flex-col items-center">
      <div 
        className="relative grid grid-cols-3 gap-1 bg-slate-700 p-1 rounded-md"
        style={{ width: puzzleSize, height: puzzleSize }}
      >
        
        {pieces.map((id, index) => {
          const isVisible = id !== 8;
          return (
            <div
              key={index}
              onClick={() => handlePieceClick(index)}
              className={`relative transition-transform duration-200 ease-in-out ${!solved && isVisible ? 'cursor-pointer hover:scale-105' : ''}`}
              style={{
                width: pieceSize,
                height: pieceSize,
                backgroundImage: isVisible ? "url('/my_pic.jpeg')" : 'none',
                backgroundColor: isVisible ? 'transparent' : '#1e293b',
                backgroundSize: `${puzzleSize}px ${puzzleSize}px`,
                backgroundPosition: `-${(id % 3) * pieceSize}px -${Math.floor(id / 3) * pieceSize}px`,
              }}
            />
          );
        })}
        {solved && (
          <div 
            className="absolute inset-0 transition-all duration-700 ease-in-out"
            style={{
              backgroundImage: "url('/my_pic.jpeg')",
              backgroundSize: 'cover',
            }}
          ></div>
        )}
      </div>
      <div className="mt-4 text-center min-h-[4.5rem] w-full">
        {solved ? (
          <div className="transition-opacity duration-500 text-center">
            <h3 className="text-2xl font-bold text-cyan-400 animate-pulse">Solved!</h3>
             <button onClick={shufflePuzzle} className="mt-2 bg-cyan-500 text-black px-4 py-1 rounded-md hover:bg-cyan-400 transition-colors text-sm">
                Play Again
            </button>
          </div>
        ) : (
          <div>
            <button onClick={shufflePuzzle} className="bg-slate-800 text-cyan-400 border border-slate-700 px-4 py-2 rounded-md hover:bg-slate-700 transition-colors">
              Shuffle
            </button>
            <div className="mt-3 text-xs text-gray-400">
                <button onClick={() => setShowTip(!showTip)} className="flex items-center gap-1 mx-auto hover:text-cyan-400">
                    <Lightbulb size={14} />
                    <span>Hint</span>
                </button>
                {showTip && (
                    <p className="mt-1 italic">Try to solve one row at a time!</p>
                )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImagePuzzle;

