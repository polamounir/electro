// import { useEffect } from "react";
// import {
//   startConnection,
//   onMessageReceived,
//   sendMessage,
//   stopConnection,
// } from "../utils/signalr";
import Cookies from "js-cookie";
export default function LiveChat() {
  const token = Cookies.get("token");
  const [messages, setMessages] = useState([]);
  // useEffect(() => {
  //   if (token) {
  //     startConnection(token);
  //     onMessageReceived((message) => {
  //       setMessages((prevMessages) => [...prevMessages, message]);
  //     });
  //   }

  //   return () => {
  //     stopConnection();
  //   };
  // }, [token]);
  return (
    <div>
      <div className="py-20 flex flex-col gap-10 items-center">
        <div className="chatBox">
          <p>hfhhfhfhff</p>

        </div>
        <div className="flex gap-2 ">
          <input type="text" className="px-5 border border-4ray-200" />
          <button className="px-10 py-3 bg-gray-400">SEND</button>
        </div>
      </div>
    </div>
  )
}
