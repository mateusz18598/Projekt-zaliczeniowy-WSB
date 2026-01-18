import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { MessageSquare, UserMinus, X, Check, Search } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { toast } from 'sonner';

export function NetworkTab() {
  const {
    currentUser,
    allUsers,
    connectionRequests,
    acceptConnectionRequest,
    rejectConnectionRequest,
    withdrawConnectionRequest,
    removeConnection,
    sendConnectionRequest
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');

  const connections = allUsers.filter(u => currentUser.connections.includes(u.id));
  const receivedRequests = connectionRequests.filter(r => r.status === 'pending');
  const sentRequests = connectionRequests.filter(r => r.from.id === currentUser.id && r.status === 'pending');

  const suggestions = allUsers
    .filter(u =>
      u.id !== currentUser.id &&
      !currentUser.connections.includes(u.id) &&
      !connectionRequests.some(r => r.from.id === currentUser.id && r.status === 'pending')
    )
    .slice(0, 6);

  const filteredConnections = connections.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRemoveConnection = (userId: string, userName: string) => {
    if (confirm(`Czy na pewno chcesz usunąć połączenie z ${userName}?`)) {
      removeConnection(userId);
      toast.success('Połączenie usunięte');
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white border-pink-200">
        <Tabs defaultValue="connections" className="w-full">
          <div className="border-b border-pink-100">
            <TabsList className="w-full justify-start bg-transparent p-0">
              <TabsTrigger
                value="connections"
                className="data-[state=active]:border-b-2 data-[state=active]:border-pink-600 rounded-none"
              >
                Połączenia ({connections.length})
              </TabsTrigger>
              <TabsTrigger
                value="invitations"
                className="data-[state=active]:border-b-2 data-[state=active]:border-pink-600 rounded-none"
              >
                Zaproszenia ({receivedRequests.length})
              </TabsTrigger>
              <TabsTrigger
                value="suggestions"
                className="data-[state=active]:border-b-2 data-[state=active]:border-pink-600 rounded-none"
              >
                Sugestie
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="connections" className="p-6 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Szukaj w sieci..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {filteredConnections.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <p>Brak połączeń</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredConnections.map((user) => (
                  <Card key={user.id} className="p-4 border-pink-200 hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-3">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-pink-200"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-gray-900 truncate">{user.name}</h3>
                        <p className="text-sm text-gray-600 truncate">{user.title}</p>
                        <p className="text-xs text-gray-500 mt-1">{user.institution}</p>
                        <div className="flex gap-2 mt-3">
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1"
                          >
                            <MessageSquare className="w-4 h-4 mr-1" />
                            Wiadomość
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleRemoveConnection(user.id, user.name)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <UserMinus className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="invitations" className="p-6 space-y-6">
            {receivedRequests.length === 0 && sentRequests.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <p>Brak zaproszeń</p>
              </div>
            ) : (
              <>
                {receivedRequests.length > 0 && (
                  <div>
                    <h3 className="text-gray-900 mb-4">Otrzymane ({receivedRequests.length})</h3>
                    <div className="space-y-3">
                      {receivedRequests.map((request) => (
                        <Card key={request.id} className="p-4 border-pink-200">
                          <div className="flex items-start gap-3">
                            <img
                              src={request.from.avatar}
                              alt={request.from.name}
                              className="w-14 h-14 rounded-full object-cover border-2 border-pink-200"
                            />
                            <div className="flex-1">
                              <h4 className="text-gray-900">{request.from.name}</h4>
                              <p className="text-sm text-gray-600">{request.from.title}</p>
                              <p className="text-xs text-gray-500 mt-1">
                                {request.mutualConnections} wspólnych połączeń
                              </p>
                              <div className="flex gap-2 mt-3">
                                <Button
                                  size="sm"
                                  onClick={() => {
                                    acceptConnectionRequest(request.id);
                                    toast.success('Zaproszenie zaakceptowane');
                                  }}
                                  className="bg-pink-600 hover:bg-pink-700 text-white"
                                >
                                  <Check className="w-4 h-4 mr-1" />
                                  Akceptuj
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => {
                                    rejectConnectionRequest(request.id);
                                    toast.success('Zaproszenie odrzucone');
                                  }}
                                >
                                  <X className="w-4 h-4 mr-1" />
                                  Odrzuć
                                </Button>
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {sentRequests.length > 0 && (
                  <div>
                    <h3 className="text-gray-900 mb-4">Wysłane ({sentRequests.length})</h3>
                    <div className="space-y-3">
                      {sentRequests.map((request) => (
                        <Card key={request.id} className="p-4 border-pink-200">
                          <div className="flex items-start justify-between">
                            <div className="flex gap-3">
                              <img
                                src={request.from.avatar}
                                alt={request.from.name}
                                className="w-14 h-14 rounded-full object-cover border-2 border-pink-200"
                              />
                              <div>
                                <h4 className="text-gray-900">{request.from.name}</h4>
                                <p className="text-sm text-gray-600">{request.from.title}</p>
                                <p className="text-xs text-gray-500 mt-1">Oczekuje na odpowiedź</p>
                              </div>
                            </div>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                withdrawConnectionRequest(request.id);
                                toast.success('Zaproszenie wycofane');
                              }}
                            >
                              Wycofaj
                            </Button>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </TabsContent>

          <TabsContent value="suggestions" className="p-6">
            {suggestions.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <p>Brak sugestii</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {suggestions.map((user) => (
                  <Card key={user.id} className="p-4 border-pink-200 hover:shadow-md transition-shadow">
                    <div className="text-center">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-20 h-20 rounded-full object-cover border-2 border-pink-200 mx-auto"
                      />
                      <h3 className="text-gray-900 mt-3">{user.name}</h3>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">{user.title}</p>
                      <p className="text-xs text-gray-500 mt-1">{user.institution}</p>
                      <p className="text-xs text-pink-600 mt-2">
                        {user.connections.filter(c => currentUser.connections.includes(c)).length} wspólnych połączeń
                      </p>
                      <Button
                        size="sm"
                        onClick={() => {
                          sendConnectionRequest(user);
                          toast.success('Zaproszenie wysłane');
                        }}
                        className="mt-3 w-full bg-pink-600 hover:bg-pink-700 text-white"
                      >
                        Połącz
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
