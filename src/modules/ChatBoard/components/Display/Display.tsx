import { FaUser } from "react-icons/fa";
import { BsRobot } from "react-icons/bs";
import { useRequestStore } from "@modules/ChatBoard/store/requestStore";
import { useEffect, useState, useRef } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import { useQuery, useQueryClient } from "react-query";
import { createChat, getChatById } from "@modules/ChatBoard/services/api/chat";

interface IRQ {
  sender: string;
  message: string;
  chat_id: string | null;
}
interface IRequest {
  out: IRQ;
  in: IRQ;
  client_id: number;
  type: string;
}
export const Display = () => {
  const bottomEl = useRef<HTMLDivElement>(null);
  const requestStore = useRequestStore();
  const [requests, setRequests] = useState<IRequest[]>([]);
  const [selectedData, setSelectedData] = useState<IRequest | {}>({});
  const [chatId, setChatId] = useState<number | null>(null);
  const [placeholder, setPlaceholder] = useState("");

  const index = useRef(0);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (Object.keys(selectedData).length > 0) {
      function tick() {
        setPlaceholder(
          //@ts-ignore
          (prev) => prev + selectedData.in.message[index.current]
        );
        index.current++;
      }
      //@ts-ignore
      if (index.current < selectedData.in.message.length) {
        const addChar = setInterval(tick, 500);
        return () => clearInterval(addChar);
      }
    }
  }, [selectedData, placeholder]);

  //reload problems query
  // const reloadProblemQuery = () => {
  //   queryClient.invalidateQueries("chats");
  // };

  // const {} = useQuery(["chats", chatId], () => getChatById(chatId), {
  //   staleTime: 2000,
  //   onSuccess: (data) => {
  //     console.log(data);
  //   },
  // });

  useEffect(() => {
    const requestList = requestStore.requests;

    if (requestStore.requests.length > 0) {
      setRequests(requestList);
    }
  }, [requestStore]);

  useEffect(() => {
    //get last item
    if (requests.length > 0) {
      const lastItem = requests[requests.length - 1];
      const val = new SpeechSynthesisUtterance(`${lastItem.in.message}`);
      if (lastItem.type.toUpperCase() !== "FILE") {
        window.speechSynthesis.speak(val);
      }
    }
  }, [requests]);

  useEffect(() => {
    bottomEl.current?.scrollIntoView({ behavior: "smooth" });
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="h-[80%] bg-orange-50 p-4 overflow-y-auto ">
      <ScrollToBottom className="h-full w-full">
        {requests.length > 0 &&
          requests.map((req, id) => (
            <div key={id} className="w-full h-auto my-10 flex flex-col gap-4">
              {/* user */}
              <div className="w-full h-auto ">
                <div className="w-6 h-6  ">
                  <FaUser size={20} />
                </div>
                <div className="text-sm pl-6">{req.out.message}</div>
              </div>
              {/* bot */}
              <div className=" w-full h-auto">
                <div className="w-6 h-6 ">
                  <BsRobot size={20} />
                </div>
                <div className="text-sm pl-6 pb-4 pt-2 bg-gray-300">
                  {req.in.message}
                </div>
              </div>
            </div>
          ))}
        {Object.keys(selectedData).length > 0 && (
          <div className="w-full h-auto my-10 flex flex-col gap-4">
            {/* user */}
            <div className="w-full h-auto ">
              <div className="w-6 h-6  ">
                <FaUser size={20} />
              </div>
              {/* @ts-ignore */}
              <div className="text-sm pl-6">{selectedData.out.message}</div>
            </div>
            {/* bot */}
            <div className=" w-full h-auto">
              <div className="w-6 h-6 ">
                <BsRobot size={20} />
              </div>
              <div className="text-sm pl-6 pb-4 pt-2 bg-gray-300">
                {placeholder}
              </div>
            </div>
          </div>
        )}

        {requests.length == 0 && (
          <div className="w-[60%] h-[70%] border m-auto rounded-md flex justify-center  text-center items-center">
            <h3>No requests submitted yet</h3>
          </div>
        )}
      </ScrollToBottom>
    </div>
  );
};
