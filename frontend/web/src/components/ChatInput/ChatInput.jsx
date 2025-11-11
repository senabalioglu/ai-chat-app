import SendButton from '../SendButton/SendButton';
import './ChatInput.css';

const ChatInput = () =>  {
    return(
        <>
        <div className="input-container" >
            <form style={{ display: 'flex', flexDirection: 'row' }} >
                <input id="text" placeholder="Type something..." />
                <SendButton />
            </form>
        </div>
        </>
    )
}

export default ChatInput;