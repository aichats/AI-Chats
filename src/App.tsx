import { ChatBoard } from '@modules/ChatBoard'

import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChatBoard />
    </QueryClientProvider>
  )
}

export default App
