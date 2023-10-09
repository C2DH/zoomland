import RoundButton from './RoundButton'
import CloseIcon from './Svg/CloseIcon'
import './DialogueCard.css'
import { isMobile } from 'react-device-detect'

const DialogueCard = ({
  sentence,
  characterName,
  // onClickPrevious,
  onClickNext,
  // disablePrevious = false,
  disableNext = false,
  avatar = '/assets/avatars/Hero.jpg',
  onCompleteLabel = 'Done',
  onClose,
  enableClose = false,
}) => {
  return (
    <div className="DialogueCard">
      <div className="DialogueCard-wrapper">
        {enableClose ? (
          <div
            style={{
              position: 'absolute',
              right: '0.7rem',
              top: '0.7rem',
              transformOrigin: 'center center',
              transform: 'scale(0.8) rotate(90deg)',
            }}
          >
            <RoundButton
              Icon={CloseIcon}
              color={'var(--pale-yellow)'}
              backgroundColor="var(--transparent)"
              onClick={onClose}
            />
          </div>
        ) : null}
        <div className="avatar" style={{ backgroundImage: `url(${avatar})` }}></div>
        <div className="DialogueCard-body">
          <h4>{characterName}</h4>
          <p>{sentence}</p>
        </div>
        <div className="DialogueCard-footer">
          {/* <button
            className={`btn btn-link ${isMobile ? 'btn-ms' : 'btn-md'}`}
            disabled={disablePrevious}
            onClick={onClickPrevious}
          >
            Prev
          </button> */}
          <button
            className={`btn btn-link ${isMobile ? 'btn-md' : 'btn-lg'}`}
            onClick={onClickNext}
          >
            {disableNext ? onCompleteLabel : 'Continue'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default DialogueCard
