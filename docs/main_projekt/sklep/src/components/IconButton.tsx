import "./IconButton.css";

type IconButtonProps = {
    src: string
    alt: string
  }
  
  function IconButton({ src, alt }: IconButtonProps) {
    return (
      <div className="icon-button">
        <img src={src} alt={alt} />
        <span>{alt}</span>
      </div>
    )
  }
  
  export default IconButton
  
