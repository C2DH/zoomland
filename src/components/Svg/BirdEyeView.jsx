const BirdEyeView = ({
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
      <path
        d="M129.349 65.8108L94.0361 78.3903L58.7201 65.8108L25.8535 112.515L63.3361 94.8623L94.0361 112.515L124.733 94.8623L162.215 112.515L129.349 65.8108Z"
        fill={color}
      />
      <path d="M94.0361 38.169L83.4046 66.5913H104.664L94.0361 38.169Z" fill={color} />
      <path
        d="M74.1592 142.731L94.036 136.002L113.909 142.731L94.036 114.309L74.1592 142.731Z"
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
export default BirdEyeView
