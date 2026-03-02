import { useState, useEffect, useRef } from "react";
import { FiMessageCircle, FiX, FiSend } from "react-icons/fi";

const WEBHOOK_URL = import.meta.env.VITE_WEBHOOK_URL;

// 🔔 Sound Online (bebas pakai, ringan)
const NOTIFICATION_SOUND =
  "https://assets.mixkit.co/active_storage/sfx/2870/2870-preview.mp3";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Halo 👋 Selamat datang di AI Assistant saya." },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const chatRef = useRef(null);

  // Generate Session ID
  const sessionId =
    localStorage.getItem("chatSession") ||
    (() => {
      const id = "sess-" + Date.now();
      localStorage.setItem("chatSession", id);
      return id;
    })();

  // Auto Scroll
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, typing]);

  const formatBotReply = (text) => {
  if (!text) return "";

  return text
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<b class="font-bold text-purple-300">$1</b>')

    // Number list
    .replace(/^\d+\.\s/gm, '<span class="font-semibold">$&</span>')

    // Bullet arrow
    .replace(/➡️/g, "• ")

    // Hapus pesan sistem n8n
    .replace(/\(Lihat peringatan di atas.*?\)/gi, "")

    // 🔥 2x enter = paragraf baru
    .replace(/\n{2,}/g, "<br><br>")

    // 🔥 1x enter = baris biasa
    .replace(/\n/g, "<br>");
};

  // 🔔 Play Sound dari URL Online
  const playNotification = () => {
    const audio = new Audio(NOTIFICATION_SOUND);
    audio.volume = 0.6;
    audio.play().catch(() => {});
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setTyping(true);

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: input,
          sessionId: sessionId,
        }),
      });

      const data = await res.json();
      const formattedReply = formatBotReply(data.reply);

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: formattedReply || "Terjadi kesalahan.",
          },
        ]);

        playNotification();
        setTyping(false);
      }, 800);
    } catch (err) {
      console.error("Chatbot error:", err);

      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Server tidak merespons." },
      ]);

      setTyping(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 p-4 rounded-full 
          bg-gradient-to-r from-purple-600 to-indigo-600 
          shadow-[0_0_25px_rgba(139,92,246,0.7)]
          hover:scale-110 transition duration-300"
        >
          <FiMessageCircle className="text-white" size={24} />
        </button>
      )}

      {/* Chat Window */}
      {open && (
        <div
          className="fixed z-[999] flex flex-col overflow-hidden
          w-full h-full bottom-0 right-0 rounded-none
          sm:w-[380px] sm:h-[600px] 
          sm:bottom-6 sm:right-6 
          sm:rounded-3xl
          bg-white/10 backdrop-blur-xl 
          border border-white/20
          shadow-2xl"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-5 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <h3 className="text-white font-semibold">
                AI Assistant
              </h3>
            </div>
            <button onClick={() => setOpen(false)}>
              <FiX className="text-white" size={20} />
            </button>
          </div>

          {/* Messages */}
         <div ref={chatRef} className="flex-1 p-4 overflow-y-auto space-y-3 text-sm hide-scrollbar" >
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.sender === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`px-5 py-3 max-w-[80%] rounded-2xl shadow-md leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-br-sm"
                      : "bg-white/20 text-white rounded-bl-sm border border-white/10"
                  }`}
                >
                  <div className="whitespace-pre-line space-y-2">
                    <div
  className="leading-7 text-[15px] break-words"
  dangerouslySetInnerHTML={{
    __html:
      msg.sender === "bot"
        ? formatBotReply(msg.text)
        : msg.text,
  }}
/>
                  </div>
                </div>
              </div>
            ))}

            {typing && (
              <div className="flex justify-start">
                <div className="px-5 py-3 max-w-[75%] rounded-2xl rounded-bl-sm
                  bg-white/20 border border-white/10 shadow-md">
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-white/70 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-2 h-2 bg-white/70 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-2 h-2 bg-white/70 rounded-full animate-bounce"></span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-white/10 bg-white/5 backdrop-blur-md flex items-center gap-2">
            <input
              type="text"
              placeholder="Tulis pesan..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1 bg-white/10 text-white placeholder-gray-300 
              px-4 py-2 rounded-full outline-none 
              focus:ring-2 focus:ring-purple-500"
            />
            <button
              onClick={sendMessage}
              className="p-3 rounded-full 
              bg-gradient-to-r from-purple-600 to-indigo-600 
              shadow-lg hover:scale-110 transition"
            >
              <FiSend className="text-white" size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}