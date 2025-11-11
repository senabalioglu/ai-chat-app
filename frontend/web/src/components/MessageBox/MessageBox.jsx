import './MessageBox.css';

const MessageBox = ({messageData, isOwnMessage}) => {
    return(
        <>
        <div className={`message-box ${isOwnMessage ? "own" : "other"}`} >
            <p className={`message-text ${isOwnMessage ? "own" : "other"}`} > {messageData.text} </p>
            <p className={`message-text ${isOwnMessage ? "own" : "other"}`} > Sentiment: {messageData.sentiment} </p>
        </div>
        </>
    );
}

export default MessageBox;