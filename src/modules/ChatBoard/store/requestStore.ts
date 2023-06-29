import { create } from "zustand";
import { persist } from "zustand/middleware";
interface IRQ {
  sender: string;
  message: string;
  chat_id: number | null;
}
interface IRequest {
  out: IRQ;
  in: IRQ;
  client_id: number;
  type: string;
}

interface Request {
  requests: IRequest[];
  mainchat_id: number | null;
  requestLoading: boolean;
  setRequestLoading: (act: boolean) => void;
  setRequests: (list: IRequest[]) => void;
  addRequest: (
    msg: string,
    chat_id: number | null,
    client_id: number,
    type: string
  ) => void;
  updateRequest: (
    msg: string,
    chat_id: number,
    client_id: number,
    type: string
  ) => void;

  removeRequests: () => void;
}

const updateIn = (
  obj: any,
  client_id: number,
  msg: string,
  chat_id: number
) => {
  if (client_id !== obj.client_id) {
    return obj;
  } else {
    obj.in.msg = msg;
    obj.in.chat_id = chat_id;
    return obj;
  }
};
const updateOut = (obj: any, client_id: number, chat_id: number) => {
  if (client_id !== obj.client_id) {
    return obj;
  } else {
    obj.out.chat_id = chat_id;
    return obj;
  }
};

export const useRequestStore = create<Request>()(
  persist(
    (set) => ({
      requests: [],
      mainchat_id: null,
      type: "",
      requestLoading: false,

      setRequestLoading(act: boolean) {
        set(() => ({
          requestLoading: act,
        }));
      },
      //set requests array
      setRequests(list: IRequest[]) {
        set(() => ({
          requests: list,
        }));
      },
      //add to requests
      addRequest(msg: string, chat_id, client_id, type) {
        set((state) => ({
          requests: [
            ...state.requests,
            {
              out: {
                sender: "user",
                message: msg,
                chat_id: chat_id ? chat_id : null,
              },
              in: {
                sender: "bot",
                message: "",
                chat_id: null,
              },
              client_id,
              type,
            },
          ],
        }));
      },

      //update  requests
      updateRequest(msg: string, chat_id: number, client_id, type) {
        set((state) => ({
          requests: state.requests.map((o) => ({
            ...o,
            out: updateOut(o, client_id, chat_id),
            in: updateIn(o, client_id, msg, chat_id),
            client_id: o.client_id,
            type,
          })),
        }));
      },

      //delete states

      //clear requests array
      removeRequests() {
        set(() => ({
          requests: [],
        }));
      },
    }),
    {
      name: "requestData",
    }
  )
);
