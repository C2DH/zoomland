const MenuIcon = ({ color = 'var(--dark-blue)', width = 24 }) => {
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
        d="M2 17.9999L8.45325 18L12.0165 16L15.6126 17.9997L22 18"
        stroke={color}
        strokeWidth="2"
      />
      <path
        d="M2 12.9999L8.45325 13L12.0165 11L15.6126 12.9997L22 13"
        stroke={color}
        strokeWidth="2"
      />
      <path
        d="M2 7.99992L8.45325 8L12.0165 6L15.6126 7.99973L22 8"
        stroke={color}
        strokeWidth="2"
      />
    </svg>
  )
}
export default MenuIcon
