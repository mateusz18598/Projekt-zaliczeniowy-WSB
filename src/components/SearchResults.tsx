import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { UserPlus, MapPin, Briefcase } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { PostCard } from './PostCard';

export function SearchResults() {
  const { searchQuery, allUsers, posts, currentUser, sendConnectionRequest } = useApp();
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredUsers = allUsers.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.institution.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPosts = posts.filter(post =>
    post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.author.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const articles = filteredPosts.filter(p => p.type === 'article');
  const jobs = filteredPosts.filter(p => p.type === 'job');

  const highlightText = (text: string) => {
    if (!searchQuery) return text;
    const parts = text.split(new RegExp(`(${searchQuery})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === searchQuery.toLowerCase() ? (
        <mark key={index} className="bg-pink-200 text-pink-900">{part}</mark>
      ) : (
        part
      )
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl text-gray-900">Wyniki wyszukiwania dla: "{searchQuery}"</h1>
        <p className="text-gray-600 mt-1">
          Znaleziono: {filteredUsers.length} osób, {filteredPosts.length} postów
        </p>
      </div>

      <Card className="bg-white border-pink-200">
        <Tabs defaultValue="all" className="w-full">
          <div className="border-b border-pink-100">
            <TabsList className="w-full justify-start bg-transparent p-0">
              <TabsTrigger value="all" className="data-[state=active]:border-b-2 data-[state=active]:border-pink-600 rounded-none">
                Wszystko
              </TabsTrigger>
              <TabsTrigger value="people" className="data-[state=active]:border-b-2 data-[state=active]:border-pink-600 rounded-none">
                Osoby ({filteredUsers.length})
              </TabsTrigger>
              <TabsTrigger value="posts" className="data-[state=active]:border-b-2 data-[state=active]:border-pink-600 rounded-none">
                Posty ({filteredPosts.length - articles.length - jobs.length})
              </TabsTrigger>
              <TabsTrigger value="articles" className="data-[state=active]:border-b-2 data-[state=active]:border-pink-600 rounded-none">
                Artykuły ({articles.length})
              </TabsTrigger>
              <TabsTrigger value="jobs" className="data-[state=active]:border-b-2 data-[state=active]:border-pink-600 rounded-none">
                Oferty pracy ({jobs.length})
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all" className="p-6 space-y-6">
            {/* People Results */}
            {filteredUsers.length > 0 && (
              <div>
                <h3 className="text-lg text-gray-900 mb-3">Osoby</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredUsers.slice(0, 4).map(user => (
                    <Card key={user.id} className="p-4 border-pink-200">
                      <div className="flex items-start gap-3">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-16 h-16 rounded-full object-cover border-2 border-pink-200"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-gray-900">{highlightText(user.name)}</h4>
                          <p className="text-sm text-gray-600 truncate">{highlightText(user.title)}</p>
                          <p className="text-xs text-gray-500 mt-1">{highlightText(user.institution)}</p>
                          {user.id !== currentUser.id && !currentUser.connections.includes(user.id) && (
                            <Button
                              size="sm"
                              onClick={() => sendConnectionRequest(user)}
                              className="mt-2 bg-pink-600 hover:bg-pink-700 text-white"
                            >
                              <UserPlus className="w-4 h-4 mr-1" />
                              Połącz
                            </Button>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Posts Results */}
            {filteredPosts.length > 0 && (
              <div>
                <h3 className="text-lg text-gray-900 mb-3">Posty i artykuły</h3>
                <div className="space-y-4">
                  {filteredPosts.slice(0, 3).map(post => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              </div>
            )}

            {filteredUsers.length === 0 && filteredPosts.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <p>Nie znaleziono wyników dla "{searchQuery}"</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="people" className="p-6">
            {filteredUsers.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <p>Nie znaleziono osób</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredUsers.map(user => (
                  <Card key={user.id} className="p-4 border-pink-200">
                    <div className="flex items-start gap-3">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-pink-200"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-gray-900">{highlightText(user.name)}</h4>
                        <p className="text-sm text-gray-600 line-clamp-2">{highlightText(user.title)}</p>
                        <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {user.location}
                        </p>
                        <p className="text-xs text-gray-500">{highlightText(user.institution)}</p>
                        {user.id !== currentUser.id && !currentUser.connections.includes(user.id) && (
                          <Button
                            size="sm"
                            onClick={() => sendConnectionRequest(user)}
                            className="mt-2 bg-pink-600 hover:bg-pink-700 text-white"
                          >
                            <UserPlus className="w-4 h-4 mr-1" />
                            Połącz
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="posts" className="p-6">
            {filteredPosts.filter(p => p.type === 'post').length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <p>Nie znaleziono postów</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredPosts.filter(p => p.type === 'post').map(post => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="articles" className="p-6">
            {articles.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <p>Nie znaleziono artykułów</p>
              </div>
            ) : (
              <div className="space-y-4">
                {articles.map(post => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="jobs" className="p-6">
            {jobs.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <p>Nie znaleziono ofert pracy</p>
              </div>
            ) : (
              <div className="space-y-4">
                {jobs.map(job => (
                  <Card key={job.id} className="p-6 border-pink-200">
                    <div className="flex gap-4">
                      <div className="w-16 h-16 bg-pink-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Briefcase className="w-8 h-8 text-pink-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl text-gray-900">{highlightText(job.jobDetails?.position || '')}</h3>
                        <p className="text-gray-700">{highlightText(job.jobDetails?.company || '')}</p>
                        <div className="flex gap-3 text-sm text-gray-600 mt-2">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {job.jobDetails?.location}
                          </span>
                          <span>{job.jobDetails?.jobType}</span>
                        </div>
                        <p className="text-gray-700 mt-2 line-clamp-2">{job.content}</p>
                        <Button className="mt-3 bg-pink-600 hover:bg-pink-700 text-white">
                          Zobacz szczegóły
                        </Button>
                      </div>
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
