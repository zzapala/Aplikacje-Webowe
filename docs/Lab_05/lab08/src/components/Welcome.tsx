
interface WelcomeProps {
    name: string;
  }
  
  function Welcome(props: WelcomeProps) {
    
    const lastLetter = props.name.slice(-1).toLowerCase();
    const gender = lastLetter === 'a' ? 'K' : 'M'; 
  
    return (
      <h2>
        Hello, {props.name} ({gender})
      </h2>
    );
  }
  
  export default Welcome;