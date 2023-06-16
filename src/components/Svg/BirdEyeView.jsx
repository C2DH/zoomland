const BirdEyeView = ({ color = 'var(--pale-yellow)', width = 40 }) => {
  const height = width
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 301 301"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M207.806 105.814L151.325 125.961L94.8394 105.814L42.2708 180.612L102.222 152.341L151.325 180.612L200.423 152.341L260.375 180.612L207.806 105.814Z"
        fill={color}
      />
      <path d="M151.325 61.5449L134.321 107.064H168.324L151.325 61.5449Z" fill={color} />
      <path
        d="M119.533 229.001L151.325 218.225L183.112 229.001L151.325 183.482L119.533 229.001Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M150.919 17.948L57.0974 56.8606L18.2351 150.804L57.0974 244.747L150.919 283.66L244.741 244.747L283.603 150.804L244.741 56.8606L150.919 17.948ZM256.983 44.6031L150.919 0.613281L44.8557 44.6031L0.922729 150.804L44.8557 257.005L150.919 300.994L256.983 257.005L300.916 150.804L256.983 44.6031Z"
        fill={color}
      />
    </svg>
  )
}
export default BirdEyeView
