import { Card } from './ui/card';
import { Bookmark } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { PostCard } from './PostCard';

interface SavedPostsTabProps {
  onEditPost: (post: any) => void;
}

export function SavedPostsTab({ onEditPost }: SavedPostsTabProps) {
  const { posts, savedPosts } = useApp();
  
  const savedPostsData = posts.filter(p => savedPosts.includes(p.id));

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Bookmark className="w-6 h-6 text-pink-600" />
        <h1 className="text-2xl text-gray-900">Zapisane posty</h1>
      </div>

      {savedPostsData.length === 0 ? (
        <Card className="bg-white border-pink-200 p-12 text-center">
          <Bookmark className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-gray-900 mb-2">Brak zapisanych postĂłw</h3>
          <p className="text-gray-600">Posty, ktĂłre zapiszesz, pojawiÄ… siÄ™ tutaj</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {savedPostsData.map(post => (
            <PostCard key={post.id} post={post} onEdit={onEditPost} />
          ))}
        </div>
      )}
    </div>
  );
}
