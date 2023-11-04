import { useEffect, useRef, useState } from "react";

interface MovieIdProp {
  movieId: number;
  cookies: {
    name?: string;
  };
}

interface Message {
  id: number;
  content: string;
  movieId: number;
  username: string;
}

const Chat: React.FC<MovieIdProp> = ({ movieId, cookies }) => {
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [guid, setGuid] = useState("");
  const [filteredMessages, setFilteredMessages] = useState<Message[]>([]);
  const [username] = useState(cookies.name || "Guest");
  const [chatVisible, setChatVisible] = useState(false);

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
            channel: "MessagesChannel",
          }),
        })
      );
    };
    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data.type === "ping") return;
      if (data.type === "welcome") return;
      if (data.type === "confirm_subscription") return;

      const message = data.message;
      setMessages((prevMessages) => [...prevMessages, message]);
    };
  }, []);

  useEffect(() => {
    fetchMessages();
  }, []);

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
      username,
    };

    (e.target as HTMLFormElement).message.value = "";

    await fetch("http://localhost:3000/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });
  };

  const fetchMessages = async () => {
    const response = await fetch("http://localhost:3000/messages");
    const data = await response.json();
    setMessages(data);
  };

  const toggleChat = () => {
    setChatVisible(!chatVisible);
  };

  return (
    <div >
      <div className="flex justify-center">
        {!chatVisible && <button onClick={() => toggleChat()} className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out">Join the Conversation!</button>}
      </div>
      {chatVisible && (
        <div>
          <div className="flex justify-center pb-4">
            <button onClick={() => toggleChat()} className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out">Hide the Conversation!</button>
          </div>
          <div className="bg-gray-900 text-white p-4">
            <h1 className="text-2xl font-bold">Chat</h1>
          </div>
          <div
            className="bg-gray-800 text-white px-[4em] pt-4 h-[50em] overflow-y-scroll"
            ref={chatContainerRef}
          >
            {filteredMessages.map((message) => (
              <div
                className={`mb-4 ${message.username === username
                  ? "flex justify-end"
                  : "flex justify-start"
                  }`}
                key={message.id}
              >
                <div className="max-w-[70%]">
                  {message.username === username ? (
                    <div className="bg-blue-500 text-white p-3 rounded-lg">
                      <h1 className="font-semibold text-3xl flex justify-end underline">
                        You
                      </h1>
                      <h2 className="text-2xl flex justify-end">
                        {message.content}
                      </h2>
                    </div>
                  ) : (
                    <div className="bg-gray-400 text-white p-3 rounded-lg">
                      <h1 className="font-semibold text-3xl underline">
                        {message.username}
                      </h1>
                      <h2 className="text-2xl">{message.content}</h2>
                    </div>
                  )}
                </div>
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
        </div>
      )}
    </div>
  );
};

export default Chat;
