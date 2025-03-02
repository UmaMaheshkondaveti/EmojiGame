import './index.css'

const EmojiCard = ({ emojiDetails, clickEmoji }) => {
  const { id, emojiName, emojiUrl } = emojiDetails

  return (
    <li className="emoji-item">
      <button
        type="button"
        className="emoji-btn"
        onClick={() => clickEmoji(id)}
        aria-label={`Select ${emojiName}`} // Accessibility improvement
      >
        <img className="emoji-icon" src={emojiUrl} alt={emojiName} />
      </button>
    </li>
  )
}

export default EmojiCard
