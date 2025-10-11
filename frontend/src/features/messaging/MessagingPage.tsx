import { MessageProvider } from './MessageContext';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';

export const MessagingPage = () => (
  <MessageProvider>
    <div className="page-wrapper responsive-container" style={{ minHeight: '100vh', background: '#f5f7fa' }}>
      <MessageList />
      <MessageInput />
    </div>
  </MessageProvider>
);
