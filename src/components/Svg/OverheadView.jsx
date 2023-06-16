const OverheadView = ({ color = 'var(--pale-yellow)', width = 40 }) => {
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
        d="M150.239 163.179L123.575 155.932L93.344 209.597L150.239 221.22L207.134 209.597L176.903 155.932L150.239 163.179Z"
        fill={color}
      />
      <path
        d="M192.89 140.531L150.239 49.7305L107.588 140.531L150.239 152.121L192.89 140.531Z"
        fill={color}
      />
      <path
        d="M140.445 230.188V250.393L150.239 252.392L160.033 250.393V230.188L150.239 232.186L140.445 230.188Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M150.12 18.1433L56.2981 57.0559L17.4358 150.999L56.2981 244.942L150.12 283.855L243.942 244.942L282.804 150.999L243.942 57.0559L150.12 18.1433ZM256.184 44.7984L150.12 0.808594L44.0564 44.7984L0.123413 150.999L44.0564 257.2L150.12 301.19L256.184 257.2L300.116 150.999L256.184 44.7984Z"
        fill={color}
      />
    </svg>
  )
}
export default OverheadView
