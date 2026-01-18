import { Card } from './ui/card';
import { Button } from './ui/button';
import { Image, Video, FileText, Briefcase } from 'lucide-react';

interface NewPostCardProps {
  userAvatar: string;
  onCreatePost: (type?: 'post' | 'article' | 'job') => void;
}

export function NewPostCard({ userAvatar, onCreatePost }: NewPostCardProps) {
  return (
    <Card className="bg-white border-pink-200 p-4">
      <div className="flex gap-3 items-start">
        <img
          src={userAvatar}
          alt="User avatar"
          className="w-12 h-12 rounded-full object-cover border-2 border-pink-300"
        />
        <button
          onClick={() => onCreatePost('post')}
          className="flex-1 text-left px-4 py-3 bg-pink-50 hover:bg-pink-100 border-2 border-pink-200 rounded-full text-gray-600 transition-colors"
        >
          Podziel się odkryciem...
        </button>
      </div>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-pink-100">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onCreatePost('post')}
          className="flex-1 text-gray-700 hover:text-pink-600 hover:bg-pink-50"
        >
          <Image className="w-5 h-5 mr-2 text-blue-500" />
          <span className="text-sm">Zdjęcie</span>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => onCreatePost('post')}
          className="flex-1 text-gray-700 hover:text-pink-600 hover:bg-pink-50"
        >
          <Video className="w-5 h-5 mr-2 text-red-500" />
          <span className="text-sm">Video</span>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => onCreatePost('article')}
          className="flex-1 text-gray-700 hover:text-pink-600 hover:bg-pink-50"
        >
          <FileText className="w-5 h-5 mr-2 text-green-500" />
          <span className="text-sm">Artykuł</span>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => onCreatePost('job')}
          className="flex-1 text-gray-700 hover:text-pink-600 hover:bg-pink-50"
        >
          <Briefcase className="w-5 h-5 mr-2 text-purple-500" />
          <span className="text-sm">Oferta</span>
        </Button>
      </div>
    </Card>
  );
}
