
import { render, screen, fireEvent } from '@testing-library/react';
import { PostCard } from './PostCard';
import { useApp } from '../contexts/AppContext';

// Mock the context hook
jest.mock('../contexts/AppContext', () => ({
    useApp: jest.fn(),
}));

const mockUser = {
    id: 'user-1',
    name: 'Test User',
    avatar: 'avatar.jpg',
    title: 'Tester',
};

const mockPost = {
    id: 'post-1',
    author: mockUser,
    content: 'Test content',
    likes: [],
    comments: [],
    shares: 0,
    timeAgo: '1h',
    timestamp: 123456789,
    type: 'post',
};

describe('PostCard', () => {
    const mockLikePost = jest.fn();
    const mockToggleSavePost = jest.fn();
    const mockAddComment = jest.fn();

    beforeEach(() => {
        (useApp as jest.Mock).mockReturnValue({
            currentUser: mockUser,
            likePost: mockLikePost,
            toggleSavePost: mockToggleSavePost,
            addComment: mockAddComment,
            savedPosts: [],
        });
        jest.clearAllMocks();
    });

    it('renders post content correctly', () => {
        render(<PostCard post={mockPost} />);
        expect(screen.getByText('Test content')).toBeInTheDocument();
        expect(screen.getByText('Test User')).toBeInTheDocument();
    });

    it('handles like action', () => {
        render(<PostCard post={mockPost} />);
        const likeButton = screen.getByRole('button', { name: /lubię to/i });
        fireEvent.click(likeButton);
        expect(mockLikePost).toHaveBeenCalledWith('post-1');
    });

    it('shows like count correctly', () => {
        const likedPost = { ...mockPost, likes: ['user-2'] };
        render(<PostCard post={likedPost} />);
        expect(screen.getByText('1 polubień')).toBeInTheDocument();
    });

    it('toggles comment section', () => {
        render(<PostCard post={mockPost} />);
        const commentButton = screen.getByRole('button', { name: /komentuj/i });

        // Comments section should not be visible initially
        expect(screen.queryByPlaceholderText('Dodaj komentarz...')).not.toBeInTheDocument();

        // Click to show
        fireEvent.click(commentButton);
        expect(screen.getByPlaceholderText('Dodaj komentarz...')).toBeInTheDocument();
    });
});
