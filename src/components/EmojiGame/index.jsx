import { useState } from 'react'
import EmojiCard from '../EmojiCard'
import NavBar from '../NavBar'
import WinOrLoseCard from '../WinOrLoseCard'
import './index.css'

const EmojiGame = ({ emojisList }) => {
  const [clickedEmojisList, setClickedEmojisList] = useState([])
  const [isGameInProgress, setIsGameInProgress] = useState(true)
  const [topScore, setTopScore] = useState(0)

  const resetGame = () => {
    setClickedEmojisList([])
    setIsGameInProgress(true)
  }

  const finishGameAndSetTopScore = (currentScore) => {
    setTopScore((prevTopScore) => Math.max(prevTopScore, currentScore))
    setIsGameInProgress(false)
  }

  const clickEmoji = (id) => {
    if (clickedEmojisList.includes(id)) {
      finishGameAndSetTopScore(clickedEmojisList.length)
    } else {
      const newClickedEmojisList = [...clickedEmojisList, id]
      setClickedEmojisList(newClickedEmojisList)

      if (newClickedEmojisList.length === emojisList.length) {
        finishGameAndSetTopScore(emojisList.length)
      }
    }
  }

  const getShuffledEmojisList = () => {
    return [...emojisList].sort(() => Math.random() - 0.5)
  }

  const renderEmojisList = () => {
    const shuffledEmojisList = getShuffledEmojisList()
    return (
      <ul className="emojis-list-container">
        {shuffledEmojisList.map((emojiObject) => (
          <EmojiCard
            key={emojiObject.id}
            emojiDetails={emojiObject}
            clickEmoji={clickEmoji}
          />
        ))}
      </ul>
    )
  }

  return (
    <div className="app-container">
      <NavBar
        currentScore={clickedEmojisList.length}
        isGameInProgress={isGameInProgress}
        topScore={topScore}
      />
      <div className="emoji-game-body">
        {isGameInProgress ? renderEmojisList() : (
          <WinOrLoseCard
            isWon={clickedEmojisList.length === emojisList.length}
            onClickPlayAgain={resetGame}
            score={clickedEmojisList.length}
          />
        )}
      </div>
    </div>
  )
}

export default EmojiGame
