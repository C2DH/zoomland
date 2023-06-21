const OverheadView = ({
  backgroundColor = 'var(--pale-yellow)',
  color = 'var(--history)',
  width = 40,
}) => {
  const height = width
  return (
    <svg
      className="OverheadView"
      width={width}
      height={height}
      viewBox="0 0 188 188"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M33.7376 33.7336L93.9073 8.81055L154.077 33.7336L179 93.9033L154.077 154.073L93.9073 178.996L33.7376 154.073L8.81454 93.9033L33.7376 33.7336Z"
        fill={backgroundColor}
      />
      <path
        d="M93.8567 101.507L77.1862 96.9819L58.2851 130.491L93.8567 137.748L129.428 130.491L110.527 96.9819L93.8567 101.507Z"
        fill={color}
      />
      <path
        d="M120.523 87.3667L93.8567 30.6701L67.1906 87.3667L93.8567 94.6034L120.523 87.3667Z"
        fill={color}
      />
      <path
        d="M87.7336 143.35V155.966L93.8568 157.215L99.9799 155.966V143.35L93.8568 144.598L87.7336 143.35Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M93.7822 10.947L35.1234 35.2442L10.8261 93.903L35.1234 152.562L93.7822 176.859L152.441 152.562L176.738 93.903L152.441 35.2442L93.7822 10.947ZM160.095 27.5906L93.7822 0.123047L27.4697 27.5906L0.00219727 93.903L27.4697 160.216L93.7822 187.683L160.095 160.216L187.562 93.903L160.095 27.5906Z"
        fill={color}
      />
    </svg>
  )
}
export default OverheadView
