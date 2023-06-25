import { FaUser } from "react-icons/fa";
import { BsRobot } from "react-icons/bs";
import { useRequestStore } from "@modules/ChatBoard/store/requestStore";
import { useEffect, useState, useRef } from "react";

import { useQuery, useQueryClient } from "react-query";
import { createChat, getChatById } from "@modules/ChatBoard/services/api/chat";

interface IRQ {
  sender: string;
  message: string;
  chat_id: number | null;
}
interface IRequest {
  out: IRQ;
  in: IRQ;
  client_id: number;
}
export const Display = () => {
  const bottomEl = useRef<HTMLDivElement>(null);
  const requestStore = useRequestStore();
  const [requests, setrequests] = useState<IRequest[]>([]);

  const [chatId, setChatId] = useState<number | null>(null);

  const queryClient = useQueryClient();

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
    setrequests(requestStore.requests);
    bottomEl.current?.scrollIntoView({ behavior: "smooth" });
  }, [requestStore]);

  useEffect(() => {
    // const val = new SpeechSynthesisUtterance("hello");
    // window.speechSynthesis.speak(val);
    bottomEl.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className="h-[80%] bg-orange-50 p-4 overflow-y-auto ">
      {requests.map((req, id) => (
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
      <div ref={bottomEl} />
      {/* <div className="w-[60%] h-[70%] border m-auto rounded-md flex justify-center  text-center items-center">
        <h3>No requests submitted yet</h3>
      </div> */}
    </div>
  );
};
