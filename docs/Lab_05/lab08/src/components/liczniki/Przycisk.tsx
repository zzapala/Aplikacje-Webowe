type ButtonProps = {
    onClick: () => void;
  };
  
function Button({ onClick }: ButtonProps) {
    return <button style = {{backgroundColor: '#eee', color: 'black'}}onClick={onClick}>Zwiększ</button>;
  }
  
export default Button;