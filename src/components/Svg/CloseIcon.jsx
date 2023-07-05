const CloseIcon = ({ color = 'var(--pale-yellow)', width = 24 }) => {
  const height = width
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.04297 18L8.49622 18L12.0594 13L15.6555 17.9993L20.043 17.9993"
        stroke={color}
        strokeWidth="2"
      />
      <path
        d="M20.043 6L15.5897 6L12.0265 11L8.43041 6.00067L4.04297 6.00067"
        stroke={color}
        strokeWidth="2"
      />
    </svg>
  )
}
export default CloseIcon
