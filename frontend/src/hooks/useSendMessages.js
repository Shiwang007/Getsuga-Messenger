import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useSendMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const sendMessages = async (message) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/message/send/${selectedConversation._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      if (data.status === "failed") {
        throw new Error(data.message);
      }

      setMessages([...messages, data.message]);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
    };
    
    return { loading, sendMessages };
};

export default useSendMessages;
