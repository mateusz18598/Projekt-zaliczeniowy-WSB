import { Card } from './ui/card';
import { Button } from './ui/button';
import { ExternalLink, TrendingUp } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

export function RightSidebar() {
  const { allUsers, currentUser, sendConnectionRequest } = useApp();

  const suggestions = allUsers
    .filter(u => u.id !== currentUser.id && !currentUser.connections.includes(u.id))
    .slice(0, 3);

  const news = [
    { title: 'Przełom w badaniach nad fuzją jądrową', source: 'Nature', time: '2h' },
    { title: 'Nowa szczepionka na raka w fazie testów', source: 'Science', time: '5h' },
    { title: 'AI osiąga nowy poziom w rozumieniu języka', source: 'MIT Tech Review', time: '8h' },
    { title: 'Odkrycie nowej planety w habitowalnej strefie', source: 'NASA', time: '1d' },
    { title: 'Kwantowe komputery coraz bliżej zastosowań', source: 'IEEE', time: '2d' }
  ];

  return (
    <div className="space-y-4 sticky top-20">
      {/* News */}
      <Card className="bg-white border-pink-200">
        <div className="p-4 border-b border-pink-100">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-pink-600" />
            <h3 className="text-gray-900">Aktualności naukowe</h3>
          </div>
        </div>
        <div className="divide-y divide-pink-100">
          {news.map((item, index) => (
            <div key={index} className="p-4 hover:bg-pink-50 transition-colors cursor-pointer">
              <h4 className="text-sm text-gray-900 mb-1 line-clamp-2">{item.title}</h4>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{item.source}</span>
                <span>{item.time}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="p-3 border-t border-pink-100">
          <Button variant="ghost" className="w-full text-sm text-pink-600 hover:bg-pink-50">
            Zobacz więcej
            <ExternalLink className="w-3 h-3 ml-2" />
          </Button>
        </div>
      </Card>

      {/* Suggested Connections */}
      <Card className="bg-white border-pink-200">
        <div className="p-4 border-b border-pink-100">
          <h3 className="text-gray-900">Sugestie znajomych</h3>
        </div>
        <div className="divide-y divide-pink-100">
          {suggestions.map((user) => (
            <div key={user.id} className="p-4">
              <div className="flex items-start gap-3">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-pink-200"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm text-gray-900 truncate">{user.name}</h4>
                  <p className="text-xs text-gray-600 truncate">{user.title}</p>
                  <p className="text-xs text-gray-500 mt-1">{user.institution}</p>
                  <Button
                    size="sm"
                    onClick={() => sendConnectionRequest(user)}
                    className="mt-2 bg-pink-600 hover:bg-pink-700 text-white w-full"
                  >
                    Połącz
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Recommended Jobs */}
      <Card className="bg-white border-pink-200">
        <div className="p-4 border-b border-pink-100">
          <h3 className="text-gray-900">Polecane oferty</h3>
        </div>
        <div className="p-4 space-y-3">
          <div className="space-y-1">
            <h4 className="text-sm text-gray-900">AI Research Scientist</h4>
            <p className="text-xs text-gray-600">Google DeepMind</p>
            <p className="text-xs text-gray-500">London, UK</p>
          </div>
          <div className="space-y-1">
            <h4 className="text-sm text-gray-900">Postdoctoral Researcher</h4>
            <p className="text-xs text-gray-600">MIT</p>
            <p className="text-xs text-gray-500">Cambridge, USA</p>
          </div>
          <div className="space-y-1">
            <h4 className="text-sm text-gray-900">Quantum Computing Lead</h4>
            <p className="text-xs text-gray-600">IBM Research</p>
            <p className="text-xs text-gray-500">Zürich, Switzerland</p>
          </div>
        </div>
        <div className="p-3 border-t border-pink-100">
          <Button variant="ghost" className="w-full text-sm text-pink-600 hover:bg-pink-50">
            Zobacz wszystkie oferty
          </Button>
        </div>
      </Card>
    </div>
  );
}
