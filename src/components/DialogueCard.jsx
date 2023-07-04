import RoundButton from './RoundButton'
import CloseIcon from './Svg/CloseIcon'
import './DialogueCard.css'

const DialogueCard = ({
  sentence,
  characterName,
  onClickPrevious,
  onClickNext,
  disablePrevious = false,
  disableNext = false,
  avatar = '/assets/avatars/Florentina.jpg',
  onClose,
}) => {
  return (
    <div className="DialogueCard">
      <div className="DialogueCard-wrapper">
        <div
          style={{
            position: 'absolute',
            right: '0.5rem',
            top: '0.5rem',
          }}
        >
          <RoundButton Icon={CloseIcon} Color={'var(--dark-blue)'} onClick={onClose} />
        </div>
        <div className="avatar" style={{ backgroundImage: `url(${avatar})` }}></div>
        <div className="DialogueCard-body">
          <h4>{characterName}</h4>
          <p>{sentence}</p>
        </div>
        <div className="DialogueCard-footer">
          <button className="btn btn-link" disabled={disablePrevious} onClick={onClickPrevious}>
            Prev
          </button>
          <button className="btn btn-link btn-lg" onClick={onClickNext}>
            {disableNext ? 'Ciao' : 'Continue'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default DialogueCard