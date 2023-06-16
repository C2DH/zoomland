const GroundView = ({ color = 'var(--pale-yellow)', width = 40 }) => {
  const height = width
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 301 301"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M155.039 165.423L221.97 147.773L155.039 62.293V165.423Z" fill={color} />
      <path d="M143.556 238.477V177.116L77.6851 159.74L143.556 238.477Z" fill={color} />
      <path d="M143.556 165.423V62.293L76.6249 147.773L143.556 165.423Z" fill={color} />
      <path d="M155.039 238.476L220.905 159.744L155.039 177.115V238.476Z" fill={color} />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M149.975 18.3766L57.0114 56.8832L18.5047 149.846L57.0114 242.81L149.975 281.316L242.938 242.81L281.445 149.846L242.938 56.8832L149.975 18.3766ZM255.068 44.7536L149.975 1.22266L44.8817 44.7536L1.35083 149.846L44.8817 254.939L149.975 298.47L255.068 254.939L298.598 149.846L255.068 44.7536Z"
        fill={color}
      />
    </svg>
  )
}
export default GroundView
