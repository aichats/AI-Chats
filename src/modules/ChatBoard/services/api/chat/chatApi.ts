import axiosInstance from "@modules/Shared/lib/axiosInstance";
import { useRequestStore } from "@modules/ChatBoard/store/requestStore";
import {apiCreateMsg, apiUploadFile} from "@api/versions.ts";
export const createChat = async (
  data: {
    sender: string;
    message: string;
    chat_id: string | null;
  },
  client_id: number,
  type: string
) => {
  try {
    const res = await axiosInstance.post(apiCreateMsg(),data)
    const rData = res.data;
    useRequestStore.setState({ mainchat_id: rData.chat_id });
    useRequestStore.setState({
      requests: [
        ...useRequestStore.getState().requests,
        {
          out: {
            sender: data.sender,
            message: data.message,
            chat_id: rData.chat_id,
          },
          in: {
            sender: rData.sender,
            message: rData.message,
            chat_id: rData.chat_id,
          },
          client_id: client_id,
          type,
        },
      ],
    });
    useRequestStore.setState({ requestLoading: false });
    return rData;
  } catch (error) {
    useRequestStore.setState({ requestLoading: false });
    return false;
  }
};
export const uploadPdf = async (
  data: any,
  client_id: number,
  type: string,
  chat_id: string | null
) => {
  // console.log(data.name);
  const formData = new FormData();

  // Update the formData object
  formData.append("file", data);
  try {
    const res = await axiosInstance.put(
        apiUploadFile(chat_id),
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    const rData = res.data;
    useRequestStore.setState({ mainchat_id: rData.chat_id });
    useRequestStore.setState({
      requests: [
        ...useRequestStore.getState().requests,
        {
          out: {
            sender: "user",
            message: data.name,
            chat_id: chat_id,
          },
          in: {
            sender: rData.sender,
            message: rData.message,
            chat_id: rData.chat_id,
          },
          client_id: client_id,
          type,
        },
      ],
    });
    useRequestStore.setState({ requestLoading: false });
    return rData;
  } catch (error) {
    useRequestStore.setState({ requestLoading: false });
    return false;
  }
};
export const getChatById = async (id: number | null) => {
  if (id == null) return;
  const res = await axiosInstance({
    // url of the api endpoint (can be changed)
    url: `/chat/${id}`,
    method: "GET",
  });
  // handle success
  return res;
};
