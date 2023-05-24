const Author = ({ name, ...props }) => {
  return <div {...props}>{name}</div>
}

export default Author
