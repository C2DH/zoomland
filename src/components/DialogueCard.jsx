import RoundButton from './RoundButton'
import CloseIcon from './Svg/CloseIcon'
import './DialogueCard.css'
import { isMobile } from 'react-device-detect'

const DialogueCard = ({
  sentence,
  characterName,
  onClickPrevious,
  onClickNext,
  asHtml = false,
  disablePrevious = false,
  disableNext = false,
  avatar = 'assets/avatars/Hero.jpg',
  onCompleteLabel = 'Done',
  onClose,
  enableClose = true,
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
        <div
          className="avatar"
          style={{ backgroundImage: `url(${(import.meta.env.BASE_URL || '/') + avatar})` }}
        ></div>
        <div className="DialogueCard-body">
          <h4>{characterName}</h4>
          {asHtml ? <div dangerouslySetInnerHTML={{ __html: sentence }}></div> : <p>{sentence}</p>}
        </div>
        <div className="DialogueCard-footer">
          {disablePrevious ? null : (
            <button
              className={`btn btn-link ${isMobile ? 'btn-ms' : 'btn-md'}`}
              onClick={onClickPrevious}
            >
              (back)
            </button>
          )}
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
