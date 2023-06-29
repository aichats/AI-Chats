import { ChatDisplay } from "./features/ChatDisplay";
import { SelectBar } from "./features/SelectBar";

export function ChatBoard() {
  return (
    <div className="h-screen w-full flex">
      <SelectBar />
      <ChatDisplay />
    </div>
  );
}
