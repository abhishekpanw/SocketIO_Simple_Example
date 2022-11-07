import { useEffect, useState } from "react";
import "./App.css";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");

function App() {
  const [message, setMessage] = useState("");
  const [receive, setReceive] = useState("");
  const [room, setRoom] = useState("");

  const JoinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  const SendMessage = () => {
    socket.emit("send_message", { message, room });
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setReceive(data.message);
    });
  }, [socket]);

  return (
    <div className="App">
      <input
        placeholder="JoinRoom...."
        onChange={(e) => setRoom(e.target.value)}
      />
      <button onClick={JoinRoom}>Join Room</button>
      <br></br>
      <input
        placeholder="message...."
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={SendMessage}>Send message</button>
      <h1>Message</h1>
      {receive}
    </div>
  );
}

export default App;
