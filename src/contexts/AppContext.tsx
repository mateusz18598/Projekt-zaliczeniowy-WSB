"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { initialPosts } from '../data/mockData';

export interface Experience {
  id: string;
  position: string;
  institution: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startYear: string;
  endYear?: string;
  current: boolean;
}

export interface Publication {
  id: string;
  title: string;
  authors: string[];
  journal: string;
  year: string;
  doi?: string;
  citations: number;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'completed' | 'planned';
  team: string[];
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  coverImage: string;
  title: string;
  bio: string;
  institution: string;
  location: string;
  connections: string[];
  profileViews: number;
  citations: number;
  skills: string[];
  researchInterests: string[];
  experience: Experience[];
  education: Education[];
  publications: Publication[];
  projects: Project[];
  gallery: string[];
}

export interface Comment {
  id: string;
  postId: string;
  author: User;
  content: string;
  timeAgo: string;
  timestamp: number;
  replies?: Comment[];
}

export interface Post {
  id: string;
  author: User;
  content: string;
  images?: string[];
  youtubeUrl?: string;
  pdfUrl?: string;
  likes: string[];
  comments: Comment[];
  shares: number;
  timeAgo: string;
  timestamp: number;
  type: 'post' | 'article' | 'job';
  jobDetails?: {
    position: string;
    company: string;
    location: string;
    salary?: string;
    jobType: string;
    field: string;
    level: string;
    description: string;
    requirements: string;
    benefits: string;
    views?: number;
    applications?: number;
  };
  articleDetails?: {
    abstract: string;
    keywords: string[];
    coAuthors: string[];
    doi?: string;
    journal?: string;
    citations: number;
    downloads: number;
    views: number;
  };
}

export interface Notification {
  id: string;
  type: 'like' | 'comment' | 'share' | 'connection' | 'citation' | 'job_match';
  from: User;
  post?: Post;
  message: string;
  timeAgo: string;
  timestamp: number;
  read: boolean;
}

export interface ConnectionRequest {
  id: string;
  from: User;
  timestamp: number;
  status: 'pending' | 'accepted' | 'rejected';
  mutualConnections: number;
}

export interface Message {
  id: string;
  conversationId: string;
  from: string;
  to: string;
  content: string;
  timestamp: number;
  read: boolean;
}

export interface Conversation {
  id: string;
  participants: string[];
  lastMessage: Message;
  unreadCount: number;
}

interface AppContextType {
  currentUser: User;
  updateCurrentUser: (user: Partial<User>) => void;
  posts: Post[];
  addPost: (post: Omit<Post, 'id' | 'timestamp' | 'timeAgo'>) => void;
  updatePost: (id: string, post: Partial<Post>) => void;
  deletePost: (id: string) => void;
  likePost: (postId: string) => void;
  addComment: (postId: string, content: string, parentId?: string) => void;
  deleteComment: (postId: string, commentId: string) => void;
  savedPosts: string[];
  toggleSavePost: (postId: string) => void;
  notifications: Notification[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  connectionRequests: ConnectionRequest[];
  sendConnectionRequest: (toUser: User) => void;
  acceptConnectionRequest: (requestId: string) => void;
  rejectConnectionRequest: (requestId: string) => void;
  withdrawConnectionRequest: (requestId: string) => void;
  removeConnection: (userId: string) => void;
  allUsers: User[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  conversations: Conversation[];
  messages: Message[];
  sendMessage: (to: string, content: string) => void;
  addExperience: (exp: Omit<Experience, 'id'>) => void;
  updateExperience: (id: string, exp: Partial<Experience>) => void;
  deleteExperience: (id: string) => void;
  addEducation: (edu: Omit<Education, 'id'>) => void;
  updateEducation: (id: string, edu: Partial<Education>) => void;
  deleteEducation: (id: string) => void;
  addPublication: (pub: Omit<Publication, 'id'>) => void;
  updatePublication: (id: string, pub: Partial<Publication>) => void;
  deletePublication: (id: string) => void;
  addProject: (proj: Omit<Project, 'id'>) => void;
  updateProject: (id: string, proj: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  addToGallery: (imageUrl: string) => void;
  removeFromGallery: (imageUrl: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User>(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('currentUser') : null;
    const user = saved ? JSON.parse(saved) : {
      id: '1',
      name: 'Dr Jan Kowalski',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop',
      coverImage: 'https://images.unsplash.com/photo-1628017975048-74768e00219e?w=1440&h=300&fit=crop',
      title: 'PhD in Artificial Intelligence',
      bio: 'Specjalista w dziedzinie sztucznej inteligencji i machine learning. Doktorat z informatyki na Uniwersytecie Warszawskim. Pasjonuję się deep learning i jego zastosowaniami w medycynie.',
      institution: 'TechCorp Research Lab',
      location: 'Warszawa, Polska',
      connections: ['2', '3'],
      profileViews: 892,
      citations: 145,
      skills: ['Machine Learning', 'Deep Learning', 'Python', 'TensorFlow', 'Research', 'Data Science'],
      researchInterests: ['Artificial Intelligence', 'Medical Imaging', 'Neural Networks', 'Computer Vision'],
      experience: [
        {
          id: 'exp-1',
          position: 'Senior Research Scientist',
          institution: 'TechCorp Research Lab',
          startDate: '2020-01',
          current: true,
          description: 'Prowadzenie badań nad zastosowaniem AI w diagnostyce medycznej. Kierowanie zespołem 5 naukowców.'
        },
        {
          id: 'exp-2',
          position: 'Research Fellow',
          institution: 'MIT Media Lab',
          startDate: '2018-06',
          endDate: '2019-12',
          current: false,
          description: 'Praca nad projektami deep learning i computer vision.'
        }
      ],
      education: [
        {
          id: 'edu-1',
          institution: 'Uniwersytet Warszawski',
          degree: 'Doktor (PhD)',
          field: 'Informatyka',
          startYear: '2015',
          endYear: '2019',
          current: false
        },
        {
          id: 'edu-2',
          institution: 'Politechnika Warszawska',
          degree: 'Magister',
          field: 'Informatyka',
          startYear: '2011',
          endYear: '2015',
          current: false
        }
      ],
      publications: [
        {
          id: 'pub-1',
          title: 'Deep Learning Approaches in Medical Image Analysis',
          authors: ['Jan Kowalski', 'Anna Nowak', 'Piotr Wiśniewski'],
          journal: 'Nature Machine Intelligence',
          year: '2023',
          doi: '10.1038/s42256-023-00000-0',
          citations: 78
        },
        {
          id: 'pub-2',
          title: 'Neural Networks for Cancer Detection',
          authors: ['Jan Kowalski', 'Maria Kowalczyk'],
          journal: 'Journal of Medical AI',
          year: '2022',
          doi: '10.1016/j.jmai.2022.00000',
          citations: 67
        }
      ],
      projects: [
        {
          id: 'proj-1',
          name: 'AI-Powered Medical Diagnosis',
          description: 'System diagnostyczny wykorzystujący deep learning do wykrywania nowotworów.',
          status: 'active',
          team: ['1', '2', '4']
        }
      ],
      gallery: [
        'https://images.unsplash.com/photo-1707944745899-104a4b12d945?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1631599143424-5bc234fbebf1?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1765830403209-a5eceac4c198?w=400&h=400&fit=crop'
      ]
    };

    // Ensure all required arrays exist (migration for old data)
    return {
      ...user,
      skills: user.skills || [],
      researchInterests: user.researchInterests || [],
      experience: user.experience || [],
      education: user.education || [],
      publications: user.publications || [],
      projects: user.projects || [],
      gallery: user.gallery || [],
      connections: user.connections || []
    };
  });

  const [allUsers, setAllUsers] = useState<User[]>(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('allUsers') : null;
    return saved ? JSON.parse(saved) : [
      {
        id: '2',
        name: 'Dr Anna Nowak',
        avatar: 'https://images.unsplash.com/photo-1649589244330-09ca58e4fa64?w=100&h=100&fit=crop',
        coverImage: 'https://images.unsplash.com/photo-1633457896836-f8d6025c85d1?w=1440&h=300&fit=crop',
        title: 'Professor of Computer Science',
        bio: 'Badaczka AI i deep learning. Publikacje w Nature i Science. Kierownik laboratorium AI na MIT.',
        institution: 'MIT',
        location: 'Boston, USA',
        connections: ['1', '3'],
        profileViews: 2340,
        citations: 567,
        skills: ['AI', 'Deep Learning', 'Research', 'Python', 'TensorFlow'],
        researchInterests: ['Quantum Computing', 'AI', 'Machine Learning'],
        experience: [],
        education: [],
        publications: [],
        projects: [],
        gallery: []
      },
      {
        id: '3',
        name: 'Prof. Piotr Wiśniewski',
        avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop',
        coverImage: 'https://images.unsplash.com/photo-1628017975048-74768e00219e?w=1440&h=300&fit=crop',
        title: 'Research Director in Quantum Computing',
        bio: 'Pionier w dziedzinie obliczeń kwantowych. 50+ publikacji w renomowanych czasopismach.',
        institution: 'Stanford University',
        location: 'Stanford, USA',
        connections: ['1', '2'],
        profileViews: 3456,
        citations: 892,
        skills: ['Quantum Computing', 'Physics', 'Mathematics'],
        researchInterests: ['Quantum Computing', 'Quantum Algorithms', 'Quantum ML'],
        experience: [],
        education: [],
        publications: [],
        projects: [],
        gallery: []
      },
      {
        id: '4',
        name: 'Dr Maria Kowalczyk',
        avatar: 'https://images.unsplash.com/photo-1649589244330-09ca58e4fa64?w=100&h=100&fit=crop',
        coverImage: 'https://images.unsplash.com/photo-1633457896836-f8d6025c85d1?w=1440&h=300&fit=crop',
        title: 'Biomedical Engineer',
        bio: 'Badania nad bioniką i protezami inteligentnymi. Interfejsy mózg-komputer.',
        institution: 'Harvard Medical School',
        location: 'Boston, USA',
        connections: [],
        profileViews: 1234,
        citations: 234,
        skills: ['Bioengineering', 'BCI', 'Neuroscience'],
        researchInterests: ['Brain-Computer Interfaces', 'Prosthetics', 'Rehabilitation'],
        experience: [],
        education: [],
        publications: [],
        projects: [],
        gallery: []
      },
      {
        id: '5',
        name: 'Prof. Tomasz Nowicki',
        avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop',
        coverImage: 'https://images.unsplash.com/photo-1631599143424-5bc234fbebf1?w=1440&h=300&fit=crop',
        title: 'Astrophysics Professor',
        bio: 'Badania nad ciemną materią i egzoplanetami. Wykładowca na University of Cambridge.',
        institution: 'University of Cambridge',
        location: 'Cambridge, UK',
        connections: [],
        profileViews: 2890,
        citations: 1234,
        skills: ['Astrophysics', 'Data Analysis', 'Research'],
        researchInterests: ['Dark Matter', 'Exoplanets', 'Cosmology'],
        experience: [],
        education: [],
        publications: [],
        projects: [],
        gallery: []
      }
    ];
  });

  const [posts, setPosts] = useState<Post[]>(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('posts') : null;
    if (saved) {
      return JSON.parse(saved);
    }
    return initialPosts;
  });

  const [savedPosts, setSavedPosts] = useState<string[]>(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('savedPosts') : null;
    return saved ? JSON.parse(saved) : [];
  });

  const [notifications, setNotifications] = useState<Notification[]>(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('notifications') : null;
    return saved ? JSON.parse(saved) : [];
  });

  const [connectionRequests, setConnectionRequests] = useState<ConnectionRequest[]>(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('connectionRequests') : null;
    return saved ? JSON.parse(saved) : [];
  });

  const [conversations, setConversations] = useState<Conversation[]>(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('conversations') : null;
    return saved ? JSON.parse(saved) : [];
  });

  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('messages') : null;
    return saved ? JSON.parse(saved) : [];
  });

  const [searchQuery, setSearchQuery] = useState('');

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('allUsers', JSON.stringify(allUsers));
  }, [allUsers]);

  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('savedPosts', JSON.stringify(savedPosts));
  }, [savedPosts]);

  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('connectionRequests', JSON.stringify(connectionRequests));
  }, [connectionRequests]);

  useEffect(() => {
    localStorage.setItem('conversations', JSON.stringify(conversations));
  }, [conversations]);

  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(messages));
  }, [messages]);

  const updateCurrentUser = (updates: Partial<User>) => {
    setCurrentUser(prev => ({ ...prev, ...updates }));
    setAllUsers(prev => prev.map(u => u.id === currentUser.id ? { ...u, ...updates } : u));
  };

  const addPost = (post: Omit<Post, 'id' | 'timestamp' | 'timeAgo'>) => {
    const timestamp = Date.now();
    const newPost: Post = {
      ...post,
      id: `post-${timestamp}`,
      timestamp,
      timeAgo: 'Teraz'
    };
    setPosts(prev => [newPost, ...prev]);
  };

  const updatePost = (id: string, updates: Partial<Post>) => {
    setPosts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const deletePost = (id: string) => {
    setPosts(prev => prev.filter(p => p.id !== id));
    setSavedPosts(prev => prev.filter(pid => pid !== id));
  };

  const likePost = (postId: string) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        const liked = post.likes.includes(currentUser.id);
        const newLikes = liked
          ? post.likes.filter(id => id !== currentUser.id)
          : [...post.likes, currentUser.id];

        if (!liked && post.author.id !== currentUser.id) {
          const notification: Notification = {
            id: `notif-${Date.now()}`,
            type: 'like',
            from: currentUser,
            post,
            message: 'polubił(a) Twój post',
            timeAgo: 'Teraz',
            timestamp: Date.now(),
            read: false
          };
          setNotifications(prev => [notification, ...prev]);
        }

        return { ...post, likes: newLikes };
      }
      return post;
    }));
  };

  const addComment = (postId: string, content: string, parentId?: string) => {
    const timestamp = Date.now();
    const newComment: Comment = {
      id: `comment-${timestamp}`,
      postId,
      author: currentUser,
      content,
      timeAgo: 'Teraz',
      timestamp,
      replies: []
    };

    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        if (post.author.id !== currentUser.id) {
          const notification: Notification = {
            id: `notif-${timestamp}-comment`,
            type: 'comment',
            from: currentUser,
            post,
            message: 'skomentował(a) Twój post',
            timeAgo: 'Teraz',
            timestamp,
            read: false
          };
          setNotifications(prev => [notification, ...prev]);
        }
        return { ...post, comments: [...post.comments, newComment] };
      }
      return post;
    }));
  };

  const deleteComment = (postId: string, commentId: string) => {
    setPosts(prev => prev.map(post =>
      post.id === postId
        ? { ...post, comments: post.comments.filter(c => c.id !== commentId) }
        : post
    ));
  };

  const toggleSavePost = (postId: string) => {
    setSavedPosts(prev =>
      prev.includes(postId)
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const sendConnectionRequest = (toUser: User) => {
    const timestamp = Date.now();
    const mutualConnections = currentUser.connections.filter(c => toUser.connections.includes(c)).length;
    const request: ConnectionRequest = {
      id: `req-${timestamp}`,
      from: currentUser,
      timestamp,
      status: 'pending',
      mutualConnections
    };
    setConnectionRequests(prev => [...prev, request]);

    const notification: Notification = {
      id: `notif-${timestamp}`,
      type: 'connection',
      from: currentUser,
      message: 'wysłał(a) zaproszenie do kontaktów',
      timeAgo: 'Teraz',
      timestamp,
      read: false
    };
    setNotifications(prev => [notification, ...prev]);
  };

  const acceptConnectionRequest = (requestId: string) => {
    const request = connectionRequests.find(r => r.id === requestId);
    if (request) {
      setCurrentUser(prev => ({
        ...prev,
        connections: [...prev.connections, request.from.id]
      }));
      setAllUsers(prev => prev.map(u =>
        u.id === request.from.id
          ? { ...u, connections: [...u.connections, currentUser.id] }
          : u
      ));
      setConnectionRequests(prev => prev.map(r =>
        r.id === requestId ? { ...r, status: 'accepted' as const } : r
      ));
    }
  };

  const rejectConnectionRequest = (requestId: string) => {
    setConnectionRequests(prev => prev.map(r =>
      r.id === requestId ? { ...r, status: 'rejected' as const } : r
    ));
  };

  const withdrawConnectionRequest = (requestId: string) => {
    setConnectionRequests(prev => prev.filter(r => r.id !== requestId));
  };

  const removeConnection = (userId: string) => {
    setCurrentUser(prev => ({
      ...prev,
      connections: prev.connections.filter(id => id !== userId)
    }));
    setAllUsers(prev => prev.map(u =>
      u.id === userId
        ? { ...u, connections: u.connections.filter(id => id !== currentUser.id) }
        : u
    ));
  };

  const sendMessage = (to: string, content: string) => {
    const timestamp = Date.now();
    const conversationId = [currentUser.id, to].sort().join('-');

    const newMessage: Message = {
      id: `msg-${timestamp}`,
      conversationId,
      from: currentUser.id,
      to,
      content,
      timestamp,
      read: false
    };

    setMessages(prev => [...prev, newMessage]);

    setConversations(prev => {
      const existing = prev.find(c => c.id === conversationId);
      if (existing) {
        return prev.map(c =>
          c.id === conversationId
            ? { ...c, lastMessage: newMessage, unreadCount: c.unreadCount + 1 }
            : c
        );
      } else {
        return [...prev, {
          id: conversationId,
          participants: [currentUser.id, to],
          lastMessage: newMessage,
          unreadCount: 0
        }];
      }
    });
  };

  const addExperience = (exp: Omit<Experience, 'id'>) => {
    const newExp: Experience = { ...exp, id: `exp-${Date.now()}` };
    setCurrentUser(prev => ({
      ...prev,
      experience: [...prev.experience, newExp]
    }));
  };

  const updateExperience = (id: string, exp: Partial<Experience>) => {
    setCurrentUser(prev => ({
      ...prev,
      experience: prev.experience.map(e => e.id === id ? { ...e, ...exp } : e)
    }));
  };

  const deleteExperience = (id: string) => {
    setCurrentUser(prev => ({
      ...prev,
      experience: prev.experience.filter(e => e.id !== id)
    }));
  };

  const addEducation = (edu: Omit<Education, 'id'>) => {
    const newEdu: Education = { ...edu, id: `edu-${Date.now()}` };
    setCurrentUser(prev => ({
      ...prev,
      education: [...prev.education, newEdu]
    }));
  };

  const updateEducation = (id: string, edu: Partial<Education>) => {
    setCurrentUser(prev => ({
      ...prev,
      education: prev.education.map(e => e.id === id ? { ...e, ...edu } : e)
    }));
  };

  const deleteEducation = (id: string) => {
    setCurrentUser(prev => ({
      ...prev,
      education: prev.education.filter(e => e.id !== id)
    }));
  };

  const addPublication = (pub: Omit<Publication, 'id'>) => {
    const newPub: Publication = { ...pub, id: `pub-${Date.now()}` };
    setCurrentUser(prev => ({
      ...prev,
      publications: [...prev.publications, newPub]
    }));
  };

  const updatePublication = (id: string, pub: Partial<Publication>) => {
    setCurrentUser(prev => ({
      ...prev,
      publications: prev.publications.map(p => p.id === id ? { ...p, ...pub } : p)
    }));
  };

  const deletePublication = (id: string) => {
    setCurrentUser(prev => ({
      ...prev,
      publications: prev.publications.filter(p => p.id !== id)
    }));
  };

  const addProject = (proj: Omit<Project, 'id'>) => {
    const newProj: Project = { ...proj, id: `proj-${Date.now()}` };
    setCurrentUser(prev => ({
      ...prev,
      projects: [...prev.projects, newProj]
    }));
  };

  const updateProject = (id: string, proj: Partial<Project>) => {
    setCurrentUser(prev => ({
      ...prev,
      projects: prev.projects.map(p => p.id === id ? { ...p, ...proj } : p)
    }));
  };

  const deleteProject = (id: string) => {
    setCurrentUser(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== id)
    }));
  };

  const addToGallery = (imageUrl: string) => {
    setCurrentUser(prev => ({
      ...prev,
      gallery: [...prev.gallery, imageUrl]
    }));
  };

  const removeFromGallery = (imageUrl: string) => {
    setCurrentUser(prev => ({
      ...prev,
      gallery: prev.gallery.filter(img => img !== imageUrl)
    }));
  };

  return (
    <AppContext.Provider value={{
      currentUser,
      updateCurrentUser,
      posts,
      addPost,
      updatePost,
      deletePost,
      likePost,
      addComment,
      deleteComment,
      savedPosts,
      toggleSavePost,
      notifications,
      markNotificationRead,
      markAllNotificationsRead,
      connectionRequests,
      sendConnectionRequest,
      acceptConnectionRequest,
      rejectConnectionRequest,
      withdrawConnectionRequest,
      removeConnection,
      allUsers,
      searchQuery,
      setSearchQuery,
      conversations,
      messages,
      sendMessage,
      addExperience,
      updateExperience,
      deleteExperience,
      addEducation,
      updateEducation,
      deleteEducation,
      addPublication,
      updatePublication,
      deletePublication,
      addProject,
      updateProject,
      deleteProject,
      addToGallery,
      removeFromGallery
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
