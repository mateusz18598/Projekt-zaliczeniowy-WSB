import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { MessageSquare, Send, Search } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

export function MessagesPage() {
  const { currentUser, allUsers, conversations, messages, sendMessage } = useApp();
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const connections = allUsers.filter(u => currentUser.connections.includes(u.id));

  const getConversationMessages = (conversationId: string) => {
    return messages.filter(m => m.conversationId === conversationId).sort((a, b) => a.timestamp - b.timestamp);
  };

  const getOtherParticipant = (conversationId: string) => {
    const conv = conversations.find(c => c.id === conversationId);
    if (!conv) return null;
    const otherId = conv.participants.find(p => p !== currentUser.id);
    return allUsers.find(u => u.id === otherId);
  };

  const handleSendMessage = () => {
    if (messageText.trim() && selectedConversation) {
      const other = getOtherParticipant(selectedConversation);
      if (other) {
        sendMessage(other.id, messageText);
        setMessageText('');
      }
    }
  };

  const filteredConnections = connections.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto h-[calc(100vh-8rem)]">
      <div className="grid grid-cols-12 gap-6 h-full">
        {/* Conversations List */}
        <aside className="col-span-4 h-full">
          <Card className="bg-white border-pink-200 h-full flex flex-col">
            <div className="p-4 border-b border-pink-100">
              <h2 className="text-xl text-gray-900 mb-3">Wiadomości</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Szukaj..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {conversations.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <MessageSquare className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>Brak konwersacji</p>
                  <p className="text-sm mt-1">Wybierz kontakt, aby rozpocząć rozmowę</p>
                </div>
              ) : (
                conversations.map((conv) => {
                  const other = getOtherParticipant(conv.id);
                  if (!other) return null;

                  return (
                    <div
                      key={conv.id}
                      onClick={() => setSelectedConversation(conv.id)}
                      className={`p-4 border-b border-pink-100 cursor-pointer hover:bg-pink-50 transition-colors ${selectedConversation === conv.id ? 'bg-pink-50' : ''
                        }`}
                    >
                      <div className="flex gap-3">
                        <img
                          src={other.avatar}
                          alt={other.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-pink-200"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="text-gray-900 truncate">{other.name}</h3>
                            <span className="text-xs text-gray-500">2h</span>
                          </div>
                          <p className="text-sm text-gray-600 truncate mt-1">
                            {conv.lastMessage.content}
                          </p>
                        </div>
                        {conv.unreadCount > 0 && (
                          <span className="flex-shrink-0 w-5 h-5 bg-pink-500 text-white text-xs rounded-full flex items-center justify-center">
                            {conv.unreadCount}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })
              )}

              {/* Available Connections */}
              {conversations.length === 0 && filteredConnections.length > 0 && (
                <div className="p-4">
                  <h3 className="text-sm text-gray-600 mb-2">Twoje kontakty</h3>
                  {filteredConnections.map((user) => (
                    <div
                      key={user.id}
                      onClick={() => {
                        const conversationId = [currentUser.id, user.id].sort().join('-');
                        setSelectedConversation(conversationId);
                      }}
                      className="p-3 hover:bg-pink-50 rounded-lg cursor-pointer flex items-center gap-3 mb-2"
                    >
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-10 h-10 rounded-full object-cover border-2 border-pink-200"
                      />
                      <div>
                        <h4 className="text-sm text-gray-900">{user.name}</h4>
                        <p className="text-xs text-gray-600">{user.title}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Card>
        </aside>

        {/* Chat Window */}
        <main className="col-span-8 h-full">
          <Card className="bg-white border-pink-200 h-full flex flex-col">
            {selectedConversation ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-pink-100">
                  {(() => {
                    const other = getOtherParticipant(selectedConversation);
                    return other ? (
                      <div className="flex items-center gap-3">
                        <img
                          src={other.avatar}
                          alt={other.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-pink-200"
                        />
                        <div>
                          <h3 className="text-gray-900">{other.name}</h3>
                          <p className="text-sm text-gray-600">{other.title}</p>
                        </div>
                      </div>
                    ) : null;
                  })()}
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {getConversationMessages(selectedConversation).map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.from === currentUser.id ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] px-4 py-2 rounded-2xl ${msg.from === currentUser.id
                            ? 'bg-pink-600 text-white'
                            : 'bg-gray-100 text-gray-900'
                          }`}
                      >
                        <p>{msg.content}</p>
                        <p className={`text-xs mt-1 ${msg.from === currentUser.id ? 'text-pink-100' : 'text-gray-500'}`}>
                          {new Date(msg.timestamp).toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input */}
                <div className="p-4 border-t border-pink-100">
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="Napisz wiadomość..."
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!messageText.trim()}
                      className="bg-pink-600 hover:bg-pink-700 text-white"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <MessageSquare className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p>Wybierz konwersację, aby rozpocząć czat</p>
                </div>
              </div>
            )}
          </Card>
        </main>
      </div>
    </div>
  );
}
