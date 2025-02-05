# 🎨 Color Guessing Game

## HNG Internship - Stage One task

A fun and interactive color guessing game where players try to match the correct color from multiple choices. The game tracks the score, provides feedback, and includes animations and sound effects to enhance the experience.

## 🚀 Features

- 🎯 **Guess the Target Color**: Players must select the color that matches the displayed target color.
- 🏆 **Scoring System**: Score increases when selecting the correct color.
- 🎉 **Game Feedback**: Displays whether the selection is correct or wrong.
- 🕹 **Turns & Game Over**: Players have 10 turns to score as high as possible.
- 🎊 **Confetti Celebration**: Shown for scores above 60%.
- 🎵 **Sound Effects**: Plays sound when selecting an option.
- 🎨 **CSS Animations**: Correct options fade out, and wrong options shake.

## 📦 Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/color-guessing-game.git
   ```
2. Navigate into the project folder:
   ```sh
   cd color-guessing-game
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Start the development server:
   ```sh
   npm start
   ```

## 🛠 Technologies Used

- **React.js** - Frontend framework
- **CSS Animations** - For smooth transitions and effects
- **React-Use** - Used for window size detection
- **RReact Confetti** - Celebration effect
- **React Hooks** - (useReducer, useState, useEffect) - State management

## 🎮 How to Play

1. Click the **Start Game** button.
2. A target color will be displayed.
3. Select the matching color from the given options.
4. If correct, the color will fade out. If wrong, it will shake.
5. The game ends after 10 turns.
6. Based on the score:
   - 🎯 **Perfect Score (100%)**: "Perfect score! You did a great job 🏆!"
   - ⭐ **Above 60%**: "Well Done! Aim for a perfect score 🎉!"
   - 👍 **Above 50%**: "You can do better!"
   - ❌ **Below 50%**: "Better Luck Next Time!"
7. Click **Play Again** to restart.

## 🖌 UI Enhancements

- **Animated Feedback**: Smooth fade-in/out feedback messages.
- **Game Modal**: Provides instructions and final scores.
