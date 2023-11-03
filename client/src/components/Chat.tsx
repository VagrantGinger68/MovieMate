import { useEffect, useRef, useState } from "react";

interface MovieIdProp {
  movieId: number;
  cookies: object
}

const Chat: React.FC<MovieIdProp> = ({ movieId, cookies }) => {
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const [messages, setMessages] = useState([]);
  const [guid, setGuid] = useState("");
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [username, setUsername] = useState(cookies.name || "Guest");

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3000/cable");
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
      setMessages((prevMessages) => [...prevMessages, message]);
    }
  }, []);


  useEffect(() => {
    fetchMessages();
  }, [])

  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [filteredMessages]);

  useEffect(() => {
    // Filter messages with the specific movieId
    const filtered = messages.filter((message) => message.movieId === movieId);
    setFilteredMessages(filtered);
  }, [messages, movieId]); // Include movieId as a dependency
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const content = (e.target as HTMLFormElement).message.value;
    const postData = {
      content,
      movieId,
      username
    };

    (e.target as HTMLFormElement).message.value = "";

    await fetch("http://localhost:3000/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postData)
    });
  }

  const fetchMessages = async () => {
    const response = await fetch("http://localhost:3000/messages");
    const data = await response.json();
    setMessages(data);
  }

  return (
    <>
      <div className="bg-gray-900 text-white p-4">
        <h1 className="text-2xl font-bold">Chat</h1>
      </div>
      <div className="bg-gray-800 text-white px-[4em] h-64 overflow-y-scroll" ref={chatContainerRef}>
        {filteredMessages.map((message) => (
          <div
            className={`mb-4 ${
              message.username === username ? "text-right bg-blue-500" : "text-left bg-gray-400"
            }`}
            key={message.id}
          >
            <p>
              {message.username === username ? (
                <span className="font-semibold">You:</span>
              ) : (
                <span className="font-semibold">{message.username}:</span>
              )}{" "}
              {message.content}
            </p>
          </div>
        ))}
      </div>
      <div className="bg-gray-900 p-4">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            className="w-full p-2 bg-gray-800 text-white border border-gray-700 rounded focus:outline-none"
            type="text"
            name="message"
            placeholder="Type your message..."
          />
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
            type="submit"
          >
            Send
          </button>
        </form>
      </div>
    </>
  );
};

export default Chat;