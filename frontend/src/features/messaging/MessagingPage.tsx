import { MessageProvider } from './MessageContext';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';

export const MessagingPage = () => (
  <MessageProvider>
    <div style={{ minHeight: '100vh', background: '#f5f7fa', paddingBottom: '2rem' }}>
      <MessageList />
      <MessageInput />
    </div>
  </MessageProvider>
);
