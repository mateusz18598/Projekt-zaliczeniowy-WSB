
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Bookmark, Users2, Eye, Link2, Quote } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';

export function LeftSidebar({ onNavigate }: { onNavigate?: (tab: string) => void }) {
  const { currentUser, savedPosts } = useApp();

  return (
    <div className="space-y-4 sticky top-20">
      {/* Mini Profile Card */}
      <Card className="bg-white border-pink-200 overflow-hidden hover:shadow-lg transition-shadow">
        <div
          className="h-20 bg-gradient-to-r from-pink-400 to-pink-600"
          style={{
            backgroundImage: `url(${currentUser.coverImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />

        <div className="relative px-4 pb-4">
          <Link href="/profile">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-20 h-20 rounded-full border-4 border-white -mt-10 relative object-cover cursor-pointer hover:opacity-90 transition-opacity"
            />
          </Link>

          <div className="mt-2 text-center">
            <Link href="/profile">
              <h3 className="text-gray-900 cursor-pointer hover:text-pink-600 transition-colors">
                {currentUser.name}
              </h3>
            </Link>
            <p className="text-sm text-gray-600 mt-1">{currentUser.title}</p>
            <p className="text-xs text-gray-500 mt-1">{currentUser.institution}</p>
          </div>

          <div className="mt-4 pt-4 border-t border-pink-100 space-y-2">
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <Eye className="w-4 h-4" />
                <span>Wyświetlenia profilu</span>
              </div>
              <span className="text-pink-600">{currentUser.profileViews}</span>
            </div>

            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <Link2 className="w-4 h-4" />
                <span>Połączenia</span>
              </div>
              <span className="text-pink-600">{currentUser.connections.length}</span>
            </div>

            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <Quote className="w-4 h-4" />
                <span>Cytowania</span>
              </div>
              <span className="text-pink-600">{currentUser.citations}</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Quick Links */}
      <Card className="bg-white border-pink-200">
        <div className="p-4 space-y-2">
          <Link href="/articles" className="block">
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-700 hover:text-pink-600 hover:bg-pink-50 rounded-lg"
            >
              <FileText className="w-5 h-5 mr-3 text-pink-500" />
              <span className="text-sm">Moje artykuły</span>
              <span className="ml-auto text-xs bg-pink-100 text-pink-600 px-2 py-1 rounded-full">
                {currentUser.publications?.length || 0}
              </span>
            </Button>
          </Link>

          <Link href="/saved" className="block">
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-700 hover:text-pink-600 hover:bg-pink-50 rounded-lg"
            >
              <Bookmark className="w-5 h-5 mr-3 text-pink-500" />
              <span className="text-sm">Zapisane</span>
              <span className="ml-auto text-xs bg-pink-100 text-pink-600 px-2 py-1 rounded-full">
                {savedPosts?.length || 0}
              </span>
            </Button>
          </Link>

          <Link href="/network" className="block">
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-700 hover:text-pink-600 hover:bg-pink-50 rounded-lg"
            >
              <Users2 className="w-5 h-5 mr-3 text-pink-500" />
              <span className="text-sm">Grupy</span>
              <span className="ml-auto text-xs bg-pink-100 text-pink-600 px-2 py-1 rounded-full">
                3
              </span>
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
