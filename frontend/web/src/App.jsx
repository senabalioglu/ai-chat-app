import ChatInput from "./components/ChatInput/ChatInput";
import MessageBox from "./components/MessageBox/MessageBox";

function App() {
  return (
    <>
      <div className="container">
        <div>
          <h1>React Chat App</h1>
        </div>
        <div className="inner-container" >
          <MessageBox />
          <MessageBox />
          <MessageBox />
        </div>
        <ChatInput />
      </div>
    </>
  );
}

export default App;
