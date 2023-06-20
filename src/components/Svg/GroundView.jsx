const GroundView = ({
  backgroundColor = 'var(--pale-yellow)',
  color = 'var(--history)',
  width = 40,
}) => {
  const height = width
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 188 188"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M32.817 32.9379L93.7822 7.6853L154.747 32.9379L180 93.9031L154.747 154.868L93.7822 180.121L32.8169 154.868L7.56433 93.9031L32.817 32.9379Z"
        fill={backgroundColor}
      />
      <path d="M96.7328 103.424L138.579 92.3892L96.7328 38.946V103.424Z" fill={color} />
      <path d="M89.5532 149.099V110.735L48.3698 99.8716L89.5532 149.099Z" fill={color} />
      <path d="M89.5532 103.424V38.946L47.707 92.3892L89.5532 103.424Z" fill={color} />
      <path d="M96.7328 149.099L137.913 99.8748L96.7328 110.735V149.099Z" fill={color} />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M93.7822 10.947L35.1234 35.2442L10.8261 93.903L35.1234 152.562L93.7822 176.859L152.441 152.562L176.738 93.903L152.441 35.2442L93.7822 10.947ZM160.095 27.5906L93.7822 0.123047L27.4697 27.5906L0.00219727 93.903L27.4697 160.216L93.7822 187.683L160.095 160.216L187.562 93.903L160.095 27.5906Z"
        fill={color}
      />
    </svg>
  )
}
export default GroundView
