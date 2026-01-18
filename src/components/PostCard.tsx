import { useState } from 'react';
import { Heart, MessageCircle, Share2, Send, Bookmark, MoreVertical, Edit2, Trash2, Briefcase, FileText, Download } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { useApp } from '../contexts/AppContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface PostCardProps {
  post: any;
  onEdit?: (post: any) => void;
}

export function PostCard({ post, onEdit }: PostCardProps) {
  const { currentUser, likePost, addComment, deleteComment, deletePost, savedPosts, toggleSavePost } = useApp();
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');

  const isLiked = post.likes.includes(currentUser.id);
  const isSaved = savedPosts.includes(post.id);
  const isAuthor = post.author.id === currentUser.id;

  const handleLike = () => {
    likePost(post.id);
  };

  const handleComment = () => {
    if (commentText.trim()) {
      addComment(post.id, commentText);
      setCommentText('');
    }
  };

  const handleShare = () => {
    // Simulate share
    alert('Post udostępniony!');
  };

  const getYouTubeVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  return (
    <Card className="bg-white border-pink-200 overflow-hidden">
      <div className="p-4">
        {/* Author Info */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-3">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-pink-300"
            />
            <div>
              <h3 className="text-gray-900">{post.author.name}</h3>
              <p className="text-sm text-gray-600">{post.author.title}</p>
              <p className="text-xs text-gray-500">{post.timeAgo}</p>
            </div>
          </div>

          {/* More menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreVertical className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => toggleSavePost(post.id)}>
                <Bookmark className={`w-4 h-4 mr-2 ${isSaved ? 'fill-pink-600 text-pink-600' : ''}`} />
                {isSaved ? 'Usuń z zapisanych' : 'Zapisz post'}
              </DropdownMenuItem>
              {isAuthor && (
                <>
                  <DropdownMenuItem onClick={() => onEdit?.(post)}>
                    <Edit2 className="w-4 h-4 mr-2" />
                    Edytuj
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      if (confirm('Czy na pewno chcesz usunąć ten post?')) {
                        deletePost(post.id);
                      }
                    }}
                    className="text-red-600"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Usuń
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Job Badge */}
        {post.type === 'job' && post.jobDetails && (
          <div className="mb-3 p-3 bg-pink-50 rounded-lg border border-pink-200">
            <div className="flex items-center gap-2 mb-2">
              <Briefcase className="w-5 h-5 text-pink-600" />
              <span className="text-pink-900">Oferta pracy</span>
            </div>
            <h4 className="text-gray-900 mb-1">{post.jobDetails.position}</h4>
            <p className="text-sm text-gray-600">{post.jobDetails.company} â€˘ {post.jobDetails.location}</p>
            {post.jobDetails.salary && (
              <p className="text-sm text-pink-600 mt-1">{post.jobDetails.salary}</p>
            )}
          </div>
        )}

        {/* Content */}
        <p className="text-gray-800 mb-3 whitespace-pre-wrap">{post.content}</p>
      </div>

      {/* Image */}
      {post.image && (
        <img
          src={post.image}
          alt="Post content"
          className="w-full max-h-96 object-cover"
        />
      )}

      {/* Images Gallery */}
      {post.images && post.images.length > 0 && (
        <div className={`grid gap-2 ${post.images.length === 1 ? 'grid-cols-1' :
          post.images.length === 2 ? 'grid-cols-2' :
            post.images.length === 3 ? 'grid-cols-3' :
              'grid-cols-2'
          }`}>
          {post.images.slice(0, 4).map((img: string, index: number) => (
            <div key={index} className="relative">
              <img
                src={img}
                alt={`Post image ${index + 1}`}
                className="w-full h-64 object-cover cursor-pointer hover:opacity-90 transition-opacity"
              />
              {index === 3 && post.images.length > 4 && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-2xl">
                  +{post.images.length - 4}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* PDF Attachment */}
      {post.pdfUrl && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex items-center gap-3">
          <div className="w-12 h-12 bg-red-100 rounded flex items-center justify-center">
            <FileText className="w-6 h-6 text-red-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-900">Załącznik PDF</p>
            <p className="text-xs text-gray-500">Dokument badawczy</p>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={() => window.open(post.pdfUrl, '_blank')}
          >
            <Download className="w-4 h-4 mr-1" />
            Pobierz
          </Button>
        </div>
      )}

      {/* YouTube Video */}
      {post.youtubeUrl && getYouTubeVideoId(post.youtubeUrl) && (
        <div className="w-full aspect-video">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${getYouTubeVideoId(post.youtubeUrl)}`}
            title="YouTube video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}

      {/* Stats */}
      <div className="px-4 py-2 border-t border-pink-100">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>{post.likes.length} polubień</span>
          <span>{post.comments.length} komentarzy • {post.shares} udostępnień</span>
        </div>
      </div>

      {/* Actions */}
      <div className="px-4 py-2 border-t border-pink-100 flex items-center justify-around">
        <Button
          variant="ghost"
          className={`flex items-center gap-2 ${isLiked ? 'text-pink-600' : 'text-gray-600'} hover:text-pink-600 hover:bg-pink-50`}
          onClick={handleLike}
        >
          <Heart className={`w-5 h-5 ${isLiked ? 'fill-pink-600' : ''}`} />
          <span>Lubię to</span>
        </Button>
        <Button
          variant="ghost"
          className="flex items-center gap-2 text-gray-600 hover:text-pink-600 hover:bg-pink-50"
          onClick={() => setShowComments(!showComments)}
        >
          <MessageCircle className="w-5 h-5" />
          <span>Komentuj</span>
        </Button>
        <Button
          variant="ghost"
          className="flex items-center gap-2 text-gray-600 hover:text-pink-600 hover:bg-pink-50"
          onClick={handleShare}
        >
          <Share2 className="w-5 h-5" />
          <span>Udostępnij</span>
        </Button>
        <Button
          variant="ghost"
          className={`flex items-center gap-2 ${isSaved ? 'text-pink-600' : 'text-gray-600'} hover:text-pink-600 hover:bg-pink-50`}
          onClick={() => toggleSavePost(post.id)}
        >
          <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-pink-600' : ''}`} />
          <span>Zapisz</span>
        </Button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="px-4 pb-4 border-t border-pink-100">
          {/* Add Comment */}
          <div className="flex gap-2 mt-4 mb-4">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-8 h-8 rounded-full object-cover border-2 border-pink-300"
            />
            <div className="flex-1 flex gap-2">
              <Textarea
                placeholder="Dodaj komentarz..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                rows={2}
                className="flex-1"
              />
              <Button
                onClick={handleComment}
                disabled={!commentText.trim()}
                className="bg-pink-600 hover:bg-pink-700 text-white"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Comments List */}
          <div className="space-y-3">
            {post.comments.map((comment: any) => (
              <div key={comment.id} className="flex gap-2 group">
                <img
                  src={comment.author.avatar}
                  alt={comment.author.name}
                  className="w-8 h-8 rounded-full object-cover border-2 border-pink-200"
                />
                <div className="flex-1 bg-pink-50 rounded-lg p-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-sm text-gray-900">{comment.author.name}</h4>
                      <p className="text-xs text-gray-500">{comment.timeAgo}</p>
                    </div>
                    {comment.author.id === currentUser.id && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => {
                          if (confirm('Czy na pewno chcesz usunąć ten komentarz?')) {
                            deleteComment(post.id, comment.id);
                          }
                        }}
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </Button>
                    )}
                  </div>
                  <p className="text-sm text-gray-800 mt-1">{comment.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}
