'use client';
import { SavedPostsTab } from '@/components/SavedPostsTab';

export default function SavedPageRoute() {
    return (
        <div className="max-w-4xl mx-auto py-6 px-6">
            <SavedPostsTab onEditPost={() => { }} />
        </div>
    );
}
