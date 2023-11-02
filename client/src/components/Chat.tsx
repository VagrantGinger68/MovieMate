import { useEffect, useState } from "react";

const ws = new WebSocket("ws://localhost:3000/cable");

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [guid, setGuid] = useState("");

  ws.onopen = () => {
    console.log("Connected to websocket server");
    setGuid(Math.random().toString(36).substring(2, 15));

    ws.send(
      JSON.stringify({
        command: "subscribe",
        identifier: JSON.stringify({
          id: guid,
          channel: "MessagesChannel"
        })
      })
    )
  }

  ws.onmessage = (e) => {
    const data = JSON.parse(e.data);
    if (data.type === "ping") return;
    if (data.type === "welcome") return;
    if (data.type === "confirm_subscription") return;

    const message = data.message;
    console.log(data.message);
    setMessages([...messages, message])
  }

  useEffect(() => {
    fetchMessages();
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const content = (e.target as HTMLFormElement).message.value;
    (e.target as HTMLFormElement).message.value = "";

    await fetch("http://localhost:3000/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ content })
    });
  }

  const fetchMessages = async () => {
    console.log("Fething messages");
    const response = await fetch("http://localhost:3000/messages");
    const data = await response.json();
    setMessages(data);
  }

  return (
    <>
      <div className="text-white">
        <h1>Chat</h1>
      </div>
      <div className="messages text-white" id="messages">
        {messages.map((message) =>
          <div className="message" key={message.id}>
            <p>{message.content}</p>
          </div>
        )}
      </div>
      <div className="messageForm text-white">
        <form onSubmit={handleSubmit}>
          <input className="messageInput" type="text" name="message" />
          <button className="messageButton" type="submit" >
            Send
          </button>
        </form>
      </div>
    </>
  );
};

export default Chat;