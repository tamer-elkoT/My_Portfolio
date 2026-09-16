import { useState, useEffect } from 'react';
import './TypeWriter.css';

const TypeWriter = ({ phrases, typingSpeed = 100, deletingSpeed = 50, pauseTime = 2000 }) => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingTimer, setTypingTimer] = useState(null);

  useEffect(() => {
    const i = loopNum % phrases.length;
    const fullText = phrases[i];

    const handleType = () => {
      setText(
        isDeleting
          ? fullText.substring(0, text.length - 1)
          : fullText.substring(0, text.length + 1)
      );

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), pauseTime);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(
      handleType,
      isDeleting ? deletingSpeed : typingSpeed
    );
    setTypingTimer(timer);

    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, phrases, typingSpeed, deletingSpeed, pauseTime]);

  return (
    <span className="typewriter">
      <span className="typewriter-text">{text}</span>
      <span className="typewriter-cursor">|</span>
    </span>
  );
};

export default TypeWriter;
