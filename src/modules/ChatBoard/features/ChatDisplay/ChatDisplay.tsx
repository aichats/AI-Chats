import { Display } from '@modules/ChatBoard/components/Display'
import { ChatForm } from '@modules/ChatBoard/components/ChatForm'

export const ChatDisplay = () => {
  return (
    <div className="w-[80%] h-full bg-slate-50">
      <Display />
      <ChatForm />
    </div>
  )
}
