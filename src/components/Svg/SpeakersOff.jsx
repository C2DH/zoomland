const SpeakersOff = ({ color = 'var(--pale-yellow)', width = 24 }) => {
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
        d="M14.2033 3.59597C14.0435 3.51831 13.865 3.4868 13.6881 3.50503C13.5112 3.52326 13.3431 3.59049 13.2027 3.69908L7.76071 7.90738H4.28732C3.86745 7.90738 3.46477 8.07322 3.16788 8.36841C2.87098 8.66361 2.70419 9.06398 2.70419 9.48146V14.5185C2.70419 14.936 2.87098 15.3364 3.16788 15.6316C3.46477 15.9267 3.86745 16.0926 4.28732 16.0926H7.76071L13.2027 20.3009C13.3431 20.4095 13.5113 20.4767 13.6882 20.495C13.865 20.5132 14.0435 20.4817 14.2033 20.404C14.3631 20.3264 14.4977 20.2057 14.5919 20.0557C14.686 19.9057 14.736 19.7324 14.736 19.5556V4.4444C14.736 4.26758 14.686 4.09431 14.5918 3.94432C14.4977 3.79432 14.363 3.67363 14.2033 3.59597ZM12.8362 17.625L8.67022 14.4028C8.50345 14.2738 8.29816 14.2037 8.08683 14.2037H4.60395V9.79627H8.08683C8.29816 9.79627 8.50345 9.7262 8.67022 9.59715L12.8362 6.3758V17.625ZM21.4239 13.2215C21.5123 13.3093 21.5824 13.4136 21.6302 13.5284C21.678 13.6432 21.7026 13.7662 21.7026 13.8905C21.7026 14.0147 21.678 14.1377 21.6302 14.2525C21.5824 14.3673 21.5123 14.4716 21.4239 14.5594C21.3356 14.6473 21.2307 14.717 21.1152 14.7645C20.9998 14.8121 20.876 14.8365 20.7511 14.8365C20.6261 14.8365 20.5024 14.8121 20.3869 14.7645C20.2715 14.717 20.1666 14.6473 20.0783 14.5594L18.8521 13.3379L17.6244 14.5594C17.446 14.7369 17.2039 14.8365 16.9516 14.8365C16.6992 14.8365 16.4572 14.7369 16.2787 14.5594C16.1003 14.382 16 14.1414 16 13.8905C16 13.6395 16.1003 13.3989 16.2787 13.2215L17.5065 12L16.2779 10.7793C16.0995 10.6019 15.9993 10.3612 15.9993 10.1103C15.9993 9.85938 16.0995 9.61874 16.2779 9.44132C16.4564 9.26389 16.6984 9.16421 16.9508 9.16421C17.2031 9.16421 17.4452 9.26389 17.6236 9.44132L18.8521 10.662L20.0798 9.44132C20.2583 9.26389 20.5003 9.16421 20.7527 9.16421C21.005 9.16421 21.247 9.26389 21.4255 9.44132C21.6039 9.61874 21.7042 9.85938 21.7042 10.1103C21.7042 10.3612 21.6039 10.6019 21.4255 10.7793L20.1978 12L21.4239 13.2215Z"
        fill={color}
      />
    </svg>
  )
}
export default SpeakersOff