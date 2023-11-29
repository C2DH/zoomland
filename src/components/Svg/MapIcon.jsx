const MapIcon = ({ color = 'var(--pale-yellow)', width = 24 }) => {
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
        d="M11.5 6.91304C10.7906 6.91304 10.0971 7.12341 9.50719 7.51755C8.91732 7.91169 8.45757 8.4719 8.18608 9.12733C7.9146 9.78276 7.84356 10.504 7.98197 11.1998C8.12037 11.8956 8.46199 12.5347 8.96364 13.0364C9.46528 13.538 10.1044 13.8796 10.8002 14.018C11.496 14.1564 12.2172 14.0854 12.8727 13.8139C13.5281 13.5424 14.0883 13.0827 14.4824 12.4928C14.8766 11.9029 15.087 11.2094 15.087 10.5C15.0859 9.54901 14.7076 8.63728 14.0352 7.96483C13.3627 7.29238 12.451 6.91412 11.5 6.91304ZM11.5 12.1304C11.1775 12.1304 10.8623 12.0348 10.5942 11.8557C10.3261 11.6765 10.1171 11.4219 9.99367 11.1239C9.87027 10.826 9.83798 10.4982 9.90089 10.1819C9.9638 9.86564 10.1191 9.57513 10.3471 9.34711C10.5751 9.11909 10.8656 8.9638 11.1819 8.90089C11.4982 8.83798 11.826 8.87027 12.1239 8.99367C12.4219 9.11708 12.6765 9.32606 12.8557 9.59418C13.0348 9.8623 13.1304 10.1775 13.1304 10.5C13.1304 10.9324 12.9587 11.3471 12.6529 11.6529C12.3471 11.9587 11.9324 12.1304 11.5 12.1304ZM11.5 3C9.51154 3.00216 7.60514 3.79303 6.19908 5.19908C4.79303 6.60514 4.00216 8.51154 4 10.5C4 16.8065 10.6554 21.538 10.9391 21.7361C11.1035 21.8512 11.2993 21.9129 11.5 21.9129C11.7007 21.9129 11.8965 21.8512 12.0609 21.7361C13.3214 20.8071 14.4747 19.7408 15.4995 18.5568C17.7894 15.9269 19 13.1389 19 10.5C18.9978 8.51154 18.207 6.60514 16.8009 5.19908C15.3949 3.79303 13.4885 3.00216 11.5 3ZM14.0516 17.2427C13.2743 18.1355 12.4206 18.9587 11.5 19.703C10.5794 18.9587 9.72565 18.1355 8.94837 17.2427C7.58696 15.666 5.95652 13.2155 5.95652 10.5C5.95652 9.02978 6.54057 7.61977 7.58017 6.58017C8.61977 5.54057 10.0298 4.95652 11.5 4.95652C12.9702 4.95652 14.3802 5.54057 15.4198 6.58017C16.4594 7.61977 17.0435 9.02978 17.0435 10.5C17.0435 13.2155 15.413 15.666 14.0516 17.2427Z"
        fill={color}
      />
    </svg>
  )
}
export default MapIcon