import { useState, useRef } from "react";
import { PiPaperPlaneRightThin } from "react-icons/pi";
import { BsPlusCircle } from "react-icons/bs";
import { BiCloudUpload } from "react-icons/bi";

export const ChatForm = () => {
  const [uploader, setUploader] = useState<boolean>(false);
  const fileForm = useRef<HTMLInputElement>(null);

  return (
    <div className="h-[20%] flex flex-col items-center justify-center pt-1 relative">
      <input type="file" accept=".pdf" className="hidden" ref={fileForm} />
      {uploader && (
        <div
          onClick={() => {
            fileForm.current?.click();
            setUploader(!uploader);
          }}
          className="absolute cursor rounded-md bg-black text-gray-400 flex space-x-3 py-6 px-6 -top-14 left-36 z-30 cursor-pointer"
        >
          <BiCloudUpload size={20} />{" "}
          <small className="font-semibold text-sm">Upload pdf</small>
        </div>
      )}
      <div className="w-[80%] shadow h-[40%] border border-gray-200 rounded-xl relative">
        <form className="block h-full px-16 py-2 relative">
          <button
            onClick={() => setUploader(!uploader)}
            type="button"
            className="p-3 text-slate-400 font-bold hover:bg-gray-600 rounded-md absolute top-1.5 left-3"
          >
            <BsPlusCircle size={19} />
          </button>
          <textarea className="w-full h-full  p-0 px-1 text-sm resize-none  bg-slate-100 outline-none focus:outline-none border-none focus:ring-0" />
          <button
            type="submit"
            className="p-3 text-slate-100 font-bold bg-green-600 rounded-md absolute top-1.5 right-3"
          >
            <PiPaperPlaneRightThin size={19} />
          </button>
        </form>
      </div>
      <div className="w-[80%] h-[40%] text-center text-gray-400 py-2">
        <small>search documents and get detailed insights.</small>
      </div>
    </div>
  );
};
