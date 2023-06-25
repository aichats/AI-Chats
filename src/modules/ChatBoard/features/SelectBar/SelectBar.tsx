import { FcGoogle } from "react-icons/fc";
import { BiMessageSquareDots } from "react-icons/bi";
import { useRequestStore } from "@modules/ChatBoard/store/requestStore";
import { useEffect, useState } from "react";

export const SelectBar = () => {
  const requestStore = useRequestStore();
  const [focusedText, setFocusedText] = useState<string>("");
  useEffect(() => {
    setFocusedText(requestStore.requests[0].out.message);
    console.log(requestStore.requests[0].out.chat_id);
  }, [requestStore]);
  return (
    <div className="h-full w-[20%] bg-black p-2">
      <div className="text-2xl h-[5%]  text-slate-100 font-semibold text-center">
        Nas AI
      </div>
      <div className="h-[90%] pt-2 overflow-y-auto pr-2">
        {/* different days list */}
        <div className="py-2">
          {/* <small className="text-slate-400 font-bold">Previous 7 days</small> */}
          <ul>
            <li
              className="text-slate-100 space-x-4 py-2 px-2 hover:bg-gray-700 rounded-md  
            flex items-center cursor-pointer my-3
            "
              data-te-toggle="tooltip"
              data-te-placement="right"
              data-te-ripple-init
              data-te-ripple-color="light"
              title="Data For the test with longer information"
            >
              <BiMessageSquareDots size={16} />{" "}
              <span>
                {focusedText.substr(0, 30)}{" "}
                {focusedText.length > 10 ? ". . ." : ""}
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="text-2xl h-[5%] flex items-center justify-center text-slate-100  text-center">
        <button
          type="button"
          className="flex items-center justify-center bg-white py-1 px-3 w-[90%]  rounded-lg space-x-3 "
        >
          <FcGoogle size={18} /> <small className="text-black">Login</small>
        </button>
        {/* <small>Ikeji chukwunonso</small> */}
      </div>
    </div>
  );
};
