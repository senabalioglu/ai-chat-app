import SendButton from '../SendButton/SendButton';
import './ChatInput.css';
import { useState } from 'react';

const ChatInput = ({onSend}) => {

  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    onSend(text);
    setText("");
  };

  return (
    <div className="input-container">
      <form onSubmit={handleSubmit} >
        <input style={{color: 'white'}} id="text" placeholder="Type something..." value={text} onChange={(e) => setText(e.target.value)} />
        <SendButton />
      </form>
    </div>
  );
};


export default ChatInput;