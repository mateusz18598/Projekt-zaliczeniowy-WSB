'use client';

import { useState, useEffect } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Navbar } from '@/components/layout/Navbar';
import { LeftSidebar } from '@/components/home/LeftSidebar';
import { RightSidebar } from '@/components/RightSidebar';
import { NewPostCard } from '@/components/NewPostCard';
import { PostCard } from '@/components/PostCard';
import { CreatePostModal } from '@/components/modals/CreatePostModal';
import { Toaster } from '@/components/ui/sonner';
import { NetworkTab } from '@/components/NetworkTab';
import { NotificationsTab } from '@/components/NotificationsTab';
import { SearchResults } from '@/components/SearchResults';
import { SavedPostsTab } from '@/components/SavedPostsTab';
import { ProfilePage } from '@/components/profile/ProfilePage';
import { JobsPage } from '@/components/jobs/JobsPage';
import { MessagesPage } from '@/components/messages/MessagesPage';
import { ArticlesPage } from '@/components/articles/ArticlesPage';

// Helper to determine active tab from URL path would be better, 
// but for initial migration we might use a client-side approach or 
// preferably refactor tabs to routes. 
// EXCEPT: The user approved the plan to use ROUTES. 
// So this page should ONLY render the HOME content.
// The other tabs should be other pages.
// HOWEVER, I need to create those pages. 
// For this step, I will create the HOME page content here.

export default function HomePage() {
    const { posts } = useApp();
    const [showCreatePost, setShowCreatePost] = useState(false);
    const [editingPost, setEditingPost] = useState<any>(null);

    // We need to keep Navbar mainly for layout usage, BUT 
    // in Next.js App Router, Navbar is usually in Layout.tsx.
    // However, Navbar needs 'activeTab' or highlighting based on standard navigation.
    // I will refactor Navbar later. For now, I'll put it in the Layout?
    // No, I put <AppProvider> in Layout, I should probably put <Navbar> in Layout too 
    // so it persists. 
    // But Navbar takes props like `onTabChange`. 
    // In routing world, `onTabChange` is just `Link`.

    const handleEditPost = (post: any) => {
        setEditingPost(post);
        setShowCreatePost(true);
    };

    const handleCloseCreatePost = () => {
        setShowCreatePost(false);
        setEditingPost(null);
    };

    const handleCreatePost = (type?: 'post' | 'article' | 'job') => {
        setEditingPost(null);
        setShowCreatePost(true);
    };

    return (
        <div className="min-h-screen bg-pink-50">
            {/* Navbar should be in Layout ideally, but if I put it here for now it's okay? 
           Refactoring everything at once is risky. 
           But plan said: "[NEW] app/layout.tsx: Will include the Navbar".
           So I should modify Layout to include Navbar.
       */}

            {/* 
         Since Navbar wraps functionality requiring params, 
         I need to refactor Navbar to not depend on passing 'activeTab' manually 
         but getting it from usePathname.
       */}

            <div className="max-w-[1440px] mx-auto px-6 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <aside className="lg:col-span-3">
                        {/* LeftSidebar usually navigates tabs. It needs refactoring to use Links. */}
                        <LeftSidebar onNavigate={() => { }} />
                    </aside>

                    <main className="lg:col-span-6 space-y-4">
                        <NewPostCard
                            userAvatar={posts[0]?.author.avatar || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop'}
                            onCreatePost={handleCreatePost}
                        />

                        {posts.length === 0 ? (
                            <div className="bg-white border-2 border-pink-200 rounded-xl p-12 text-center">
                                <div className="text-gray-400 mb-4">
                                    <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <h3 className="text-gray-900 mb-2">Brak postĂłw</h3>
                                <p className="text-gray-600">Zacznij dodawaÄ‡ treĹ›ci, aby zobaczyÄ‡ swĂłj feed</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {posts.map((post) => (
                                    <PostCard key={post.id} post={post} onEdit={handleEditPost} />
                                ))}
                            </div>
                        )}
                    </main>

                    <aside className="lg:col-span-3 hidden lg:block">
                        <RightSidebar />
                    </aside>
                </div>
            </div>

            <CreatePostModal
                open={showCreatePost}
                onClose={handleCloseCreatePost}
                editPost={editingPost}
            />
            <Toaster position="top-right" />
        </div>
    );
}
