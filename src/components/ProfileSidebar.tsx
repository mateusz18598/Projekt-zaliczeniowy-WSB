import { Card } from './ui/card';
import { Button } from './ui/button';
import { Bookmark, Edit } from 'lucide-react';

interface ProfileSidebarProps {
  user: any;
  onEditProfile: () => void;
  savedPostsCount: number;
}

export function ProfileSidebar({ user, onEditProfile, savedPostsCount }: ProfileSidebarProps) {
  return (
    <div className="space-y-4">
      {/* Profile Card */}
      <Card className="bg-white border-pink-200 overflow-hidden">
        {/* Cover Image */}
        <div
          className="h-16 bg-gradient-to-r from-pink-400 to-pink-600 relative"
          style={{
            backgroundImage: `url(${user.coverImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />

        {/* Profile Content */}
        <div className="relative px-4 pb-4">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-16 h-16 rounded-full border-4 border-white -mt-8 relative object-cover"
          />
          <div className="mt-2">
            <h3 className="text-gray-900">{user.name}</h3>
            <p className="text-sm text-gray-600 mt-1">{user.title}</p>
            <p className="text-xs text-gray-500 mt-1">{user.institution}</p>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={onEditProfile}
            className="w-full mt-3 border-pink-300 text-pink-600 hover:bg-pink-50"
          >
            <Edit className="w-4 h-4 mr-2" />
            Edytuj profil
          </Button>

          <div className="mt-4 pt-4 border-t border-pink-100">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Wyświetlenia profilu</span>
              <span className="text-pink-600">{user.profileViews}</span>
            </div>
            <div className="flex justify-between items-center text-sm mt-2">
              <span className="text-gray-600">Kontakty</span>
              <span className="text-pink-600">{user.connections.length}</span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-pink-100">
            <p className="text-xs text-gray-600">{user.bio}</p>
          </div>
        </div>
      </Card>

      {/* Saved Items */}
      <Card className="bg-white border-pink-200 p-4 hover:bg-pink-50 transition-colors cursor-pointer">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-700">
            <Bookmark className="w-5 h-5 text-pink-600" />
            <span className="text-sm">Moje elementy</span>
          </div>
          {savedPostsCount > 0 && (
            <span className="text-xs bg-pink-100 text-pink-600 px-2 py-1 rounded-full">
              {savedPostsCount}
            </span>
          )}
        </div>
      </Card>
    </div>
  );
}
