/* eslint-disable react/prop-types */
import { useReducer, useState } from "react";
import Modal from "./components/Modal";
import ColorOption from "./components/ColorOption";
import Overlay from "./components/Overlay";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import "./App.css";

const predefinedColors = [
  "#787878",
  "#484848",
  "#606060",
  "#303030",
  "#a8a8a8",
  "#909090",
];

const initialState = {
  targetColor: predefinedColors[4],
  colorOptions: predefinedColors,
  score: 0,
  turns: 0,
  feedback: "",
  feedbackemoji: "",
  message: "",
  isGameActive: false,
  isGameOver: false,
  showModal: true,
  showConfetti: false,
};

const generateRandomColor = () => {
  return (
    "#" +
    Array.from(
      { length: 6 },
      () => "0123456789ABCDEF"[Math.floor(Math.random() * 16)]
    ).join("")
  );
};

const generateRandomColors = (count, includeColor) => {
  const colors = new Set([includeColor]);
  while (colors.size < count) {
    colors.add(generateRandomColor());
  }
  return [...colors].sort(() => Math.random() - 0.5);
};

function gameReducer(state, action) {
  switch (action.type) {
    case "startGame": {
      const newTargetColor = generateRandomColor();
      return {
        ...initialState,
        targetColor: newTargetColor,
        colorOptions: generateRandomColors(6, newTargetColor),
        isGameActive: true,
        showModal: false,
      };
    }
    case "selectedOption": {
      if (state.isGameOver) return state;

      const isCorrect = action.payload === state.targetColor;
      const updatedScore = isCorrect ? state.score + 1 : state.score;
      const updatedTurns = state.turns + 1;
      const isGameOver = updatedTurns >= 10;

      let message = "";
      let showConfetti = false;

      if (isGameOver) {
        const percentage = (updatedScore / 10) * 100;
        if (percentage === 100) {
          message = "Perfect score 🏆. You did a great job!";
          showConfetti = true;
        } else if (percentage >= 70) {
          message = "Well Done 🎉, aim for a perfect score next time!";
          showConfetti = true;
        } else if (percentage >= 50) {
          message = "You can do better 🎉!";
        } else {
          message = "Better Luck Next Time!";
        }
      }

      const newTargetColor = generateRandomColor();

      return {
        ...state,
        targetColor: newTargetColor,
        colorOptions: generateRandomColors(6, newTargetColor),
        score: updatedScore,
        turns: updatedTurns,
        feedback: isCorrect ? "Correct" : "Wrong",
        feedbackemoji: isCorrect ? "🎉" : "❌",
        message,
        isGameOver,
        isGameActive: !isGameOver,
        showConfetti,
      };
    }
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const { width, height } = useWindowSize();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleSelection = (color) => {
    dispatch({ type: "selectedOption", payload: color });

    const isCorrect = color === state.targetColor;
    playSound(isCorrect);

    setShowFeedback(true);
    setTimeout(() => setShowFeedback(false), 1000);
  };

  const playSound = (isCorrect) => {
    if (!soundEnabled) return;
    const sound = new Audio(isCorrect ? "/correct.m4a" : "/wrong.m4a");
    sound.play();
  };

  return (
    <main className="app">
      {(state.showModal || state.isGameOver) && (
        <>
          <Overlay
            onClose={() => {
              dispatch({ type: "startGame" });
            }}
          />
          <Modal
            title={state.isGameOver ? "Game Over!" : "How to Play"}
            message={
              state.isGameOver
                ? state.message
                : "Guess the correct color based on the given target color."
            }
            message2={
              state.isGameOver
                ? `You scored ${state.score}/${state.turns}`
                : "You have 10 turns to get the highest score possible!"
            }
            buttonText={state.isGameOver ? "Play Again" : "Start Game"}
            onButtonClick={() => {
              dispatch({ type: "startGame" });
            }}
          />
        </>
      )}

      {state.showConfetti && <Confetti width={width} height={height} />}

      <h1>Color Guessing Game</h1>
      <span className="target-text">Target color</span>
      <div
        className="target-color"
        style={{ backgroundColor: state.targetColor }}
        data-testid="colorBox"
        title="target color"
      ></div>

      <span
        className={`feedback ${state.feedback.toLowerCase()} ${
          showFeedback ? "show" : ""
        }`}
        data-testid="gameStatus"
      >
        {state.feedback && `${state.feedback} ${state.feedbackemoji}!`}
      </span>

      <p className="target-text" data-testid="gameInstructions">
        Select the option that best matches the target color.
      </p>
      <div className="color-options">
        {state.colorOptions.map((color, index) => (
          <ColorOption
            key={index}
            color={color}
            targetColor={state.targetColor}
            onClick={() => handleSelection(color)}
            disabled={state.isGameOver}
          />
        ))}
      </div>

      <p className="score" data-testid="score">
        Score: {state.score} / Turns: {state.turns}
      </p>

      {state.isGameActive && (
        <button
          className="reset-btn"
          onClick={() => dispatch({ type: "startGame" })}
          data-testid="newGameButton"
        >
          Reset Game
        </button>
      )}

      <button
        className="sound-btn"
        onClick={() => setSoundEnabled(!soundEnabled)}
      >
        {soundEnabled ? "🔊 Sound On" : "🔇 Sound Off"}
      </button>
    </main>
  );
}

export default App;
