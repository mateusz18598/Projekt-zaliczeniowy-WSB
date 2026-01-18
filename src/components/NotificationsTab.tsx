import { Card } from './ui/card';
import { Button } from './ui/button';
import { Heart, MessageCircle, Share2, UserPlus, Quote, Briefcase, CheckCheck } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

export function NotificationsTab() {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useApp();

  const getIcon = (type: string) => {
    switch (type) {
      case 'like':
        return <Heart className="w-5 h-5 text-pink-500" />;
      case 'comment':
        return <MessageCircle className="w-5 h-5 text-blue-500" />;
      case 'share':
        return <Share2 className="w-5 h-5 text-green-500" />;
      case 'connection':
        return <UserPlus className="w-5 h-5 text-purple-500" />;
      case 'citation':
        return <Quote className="w-5 h-5 text-orange-500" />;
      case 'job_match':
        return <Briefcase className="w-5 h-5 text-indigo-500" />;
      default:
        return <Heart className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-4">
      <Card className="bg-white border-pink-200">
        <div className="p-4 border-b border-pink-100 flex items-center justify-between">
          <h2 className="text-xl text-gray-900">Powiadomienia</h2>
          {notifications.some(n => !n.read) && (
            <Button
              size="sm"
              variant="ghost"
              onClick={markAllNotificationsRead}
              className="text-pink-600 hover:text-pink-700 hover:bg-pink-50"
            >
              <CheckCheck className="w-4 h-4 mr-2" />
              Oznacz wszystkie jako przeczytane
            </Button>
          )}
        </div>

        {notifications.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <p>Brak powiadomień</p>
          </div>
        ) : (
          <div className="divide-y divide-pink-100">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                onClick={() => !notification.read && markNotificationRead(notification.id)}
                className={`p-4 flex gap-3 cursor-pointer transition-colors ${notification.read ? 'hover:bg-gray-50' : 'bg-pink-50 hover:bg-pink-100'
                  }`}
              >
                {/* User Avatar */}
                <img
                  src={notification.from.avatar}
                  alt={notification.from.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-pink-200 flex-shrink-0"
                />

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-2">
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">
                        <span className="text-pink-600">{notification.from.name}</span>
                        {' '}
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{notification.timeAgo}</p>
                    </div>
                    {/* Icon */}
                    <div className="flex-shrink-0">
                      {getIcon(notification.type)}
                    </div>
                  </div>

                  {/* Post Preview */}
                  {notification.post && (
                    <div className="mt-2 p-2 bg-white rounded border border-pink-200">
                      <p className="text-xs text-gray-700 line-clamp-2">
                        {notification.post.content}
                      </p>
                    </div>
                  )}
                </div>

                {/* Unread Indicator */}
                {!notification.read && (
                  <div className="flex-shrink-0">
                    <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
