import { useState, useEffect, useRef } from "react";
import { FiMessageCircle, FiX, FiSend } from "react-icons/fi";

const WEBHOOK_URL = import.meta.env.VITE_WEBHOOK_URL;

const NOTIFICATION_SOUND =
  "https://assets.mixkit.co/active_storage/sfx/2870/2870-preview.mp3";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Halo 👋 Selamat datang di AI Assistant saya. Ada yang bisa saya bantu?" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const chatRef = useRef(null);

  const sessionId =
    localStorage.getItem("chatSession") ||
    (() => {
      const id = "sess-" + Date.now();
      localStorage.setItem("chatSession", id);
      return id;
    })();

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, typing]);

  const formatBotReply = (text) => {
    if (!text) return "";

    return text
      .replace(/\*\*(.*?)\*\*/g, '<b class="font-black text-black">$1</b>')
      .replace(/^\d+\.\s/gm, '<span class="font-black text-black">$&</span>')
      .replace(/➡️/g, "• ")
      .replace(/\(Lihat peringatan di atas.*?\)/gi, "")
      .replace(/\n{2,}/g, "<br><br>")
      .replace(/\n/g, "<br>");
  };

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
        { sender: "bot", text: "Maaf, sepertinya ada masalah koneksi." },
      ]);
      setTyping(false);
    }
  };

  return (
    <>
      {/* Floating Button - Neo-Brutalist Style */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 p-4 rounded-full 
          bg-black text-white border-2 border-black
          shadow-[6px_6px_0px_#FFE600]
          hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-200"
        >
          <FiMessageCircle size={28} />
        </button>
      )}

      {/* Chat Window - Neo-Brutalist Style */}
      {open && (
        <div
          className="fixed z-[999] flex flex-col overflow-hidden
          w-full h-full bottom-0 right-0
          sm:w-[400px] sm:h-[600px] 
          sm:bottom-6 sm:right-6 
          bg-[#f8f8f8] border-4 border-black
          shadow-[12px_12px_0px_rgba(0,0,0,0.1)] rounded-3xl"
        >
          {/* Header */}
          <div className="bg-black p-5 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_#4ade80]"></div>
              <h3 className="text-white font-black uppercase tracking-widest text-sm">
                AI Assistant
              </h3>
            </div>
            <button onClick={() => setOpen(false)} className="text-white hover:rotate-90 transition-transform">
              <FiX size={24} />
            </button>
          </div>

          {/* Messages */}
          <div ref={chatRef} className="flex-1 p-5 overflow-y-auto space-y-4 text-sm scrollbar-hide bg-white">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`px-4 py-3 max-w-[85%] border-2 border-black font-medium leading-relaxed
                  ${msg.sender === "user"
                      ? "bg-[#FFE600] text-black rounded-2xl rounded-br-none shadow-[4px_4px_0px_#000]"
                      : "bg-white text-black rounded-2xl rounded-bl-none shadow-[4px_4px_0px_rgba(0,0,0,0.05)]"
                  }`}
                >
                  <div
                    className="leading-relaxed text-[15px] break-words"
                    dangerouslySetInnerHTML={{
                      __html: msg.sender === "bot" ? formatBotReply(msg.text) : msg.text,
                    }}
                  />
                </div>
              </div>
            ))}

            {typing && (
              <div className="flex justify-start">
                <div className="px-4 py-3 bg-white border-2 border-black rounded-2xl rounded-bl-none shadow-[4px_4px_0px_rgba(0,0,0,0.05)]">
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-2 h-2 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-2 h-2 bg-black rounded-full animate-bounce"></span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-[#f8f8f8] border-t-2 border-black flex items-center gap-3">
            <input
              type="text"
              placeholder="Tanya sesuatu..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1 bg-white border-2 border-black text-black placeholder-gray-400 
              px-4 py-3 rounded-xl outline-none font-bold
              focus:shadow-[4px_4px_0px_#FFE600] transition-all"
            />
            <button
              onClick={sendMessage}
              className="p-4 bg-black text-[#FFE600] border-2 border-black rounded-xl
              shadow-[4px_4px_0px_rgba(0,0,0,0.2)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
            >
              <FiSend size={20} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}