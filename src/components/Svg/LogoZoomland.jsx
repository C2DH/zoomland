const LogoZoomland = ({ color = 'var(--pale-yellow)', size = 160 }) => {
  const ratio = 406 / 69
  return (
    <svg
      className="LogoZoomland"
      width={size}
      height={size / ratio}
      viewBox="0 0 404.3 67.4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M254.224 59.234L282.224 0.833984C282.224 0.833984 287.524 11.534 288.624 14.134L310.024 59.0241V9.93396H317.324L344.324 41.834V9.93396H354.324V59.334H346.624L319.924 28.334V59.334H310.024V59.234H254.224ZM295.724 50.434L282.224 21.734L268.724 50.434H295.724ZM249.824 59.234H225.424H219.724V9.93396H224.624H229.524V50.134H254.124L249.824 59.234ZM378.724 59.234C393.824 59.234 405.124 48.534 405.124 34.334C405.124 20.434 393.824 9.93396 378.724 9.93396H359.824V59.234H378.724ZM378.724 19.034C387.824 19.034 395.124 25.834 395.124 34.334C395.124 43.134 387.824 50.134 378.724 50.134H369.624V19.034H378.724ZM119.324 6.83396C131.824 8.33396 141.924 18.334 143.524 30.834C145.824 49.034 130.224 65.434 112.324 62.034C101.924 60.034 96.6242 52.934 92.7242 44.934C92.7242 44.934 80.6242 16.034 69.5242 16.034C58.1242 16.034 49.0242 26.334 51.2242 38.134C52.5242 45.534 58.5242 51.534 65.9242 52.934C70.3242 53.734 79.8242 53.634 85.7242 43.734L90.3242 52.834C82.1242 62.234 72.0242 62.934 66.1242 62.234C53.6242 60.734 43.5242 50.734 41.9242 38.234C39.6242 20.034 55.1242 3.53396 73.1242 7.03396C83.5242 9.03396 88.8242 16.134 92.7242 24.134C92.7242 24.134 104.724 53.034 115.924 53.034C127.324 53.034 136.424 42.734 134.224 30.934C132.924 23.534 126.924 17.534 119.524 16.134C115.124 15.334 105.624 15.434 99.7242 25.334L95.1242 16.234C103.324 6.83396 113.424 6.13396 119.324 6.83396ZM39.0242 50.134H15.3242L45.2242 9.83398H0.824219L8.12422 18.834H26.2242L0.824219 53.034V59.134H46.1242L39.0242 50.134ZM199.024 9.93396H204.924L217.324 59.234H207.424L199.824 29.234L180.324 68.334L160.724 29.234L153.124 59.234H143.324L155.724 9.93396H161.624L180.324 48.934L199.024 9.93396Z"
        fill={color}
      />
    </svg>
  )
}

export default LogoZoomland
