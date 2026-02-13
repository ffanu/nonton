
import { Movie, Category } from './types';

export const INITIAL_MOVIES: Movie[] = [
  {
    id: '1',
    title: 'The Midnight Horizon',
    description: 'A deep space explorer discovers an ancient signal that could rewrite the history of the universe. Caught between duty and a galaxy-altering secret.',
    thumbnail: 'https://picsum.photos/id/10/800/450',
    videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    trailerUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    category: 'Sci-Fi',
    duration: '2h 15m',
    year: 2024,
    rating: 'PG-13',
    trending: true,
    featured: true,
  },
  {
    id: '2',
    title: 'Shadow of the City',
    description: 'In a neon-drenched metropolis, a rogue detective hunts for a hacker who has the power to shut down the entire grid.',
    thumbnail: 'https://picsum.photos/id/11/800/450',
    videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    trailerUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    category: 'Action',
    duration: '1h 45m',
    year: 2023,
    rating: 'R',
    trending: true,
    featured: false,
  },
  {
    id: '3',
    title: 'Echoes of Summer',
    description: 'A nostalgic look at the lives of four friends who reunite at their childhood beach house after a decade apart.',
    thumbnail: 'https://picsum.photos/id/12/800/450',
    videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    trailerUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    category: 'Drama',
    duration: '1h 58m',
    year: 2024,
    rating: 'PG',
    trending: false,
    featured: false,
  },
  {
    id: '4',
    title: 'The Silent Forest',
    description: 'Documentary exploring the hidden communication networks of trees and how they survive in the harshest climates.',
    thumbnail: 'https://picsum.photos/id/13/800/450',
    videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    trailerUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    category: 'Documentary',
    duration: '1h 30m',
    year: 2022,
    rating: 'G',
    trending: false,
    featured: false,
  },
  {
    id: '5',
    title: 'Neon Drift',
    description: 'High-stakes illegal racing in the streets of futuristic Tokyo. Fast cars, faster decisions, and a legacy at stake.',
    thumbnail: 'https://picsum.photos/id/14/800/450',
    videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    trailerUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    category: 'Action',
    duration: '1h 40m',
    year: 2024,
    rating: 'PG-13',
    trending: true,
    featured: false,
  }
];

// Added movieCount to each category to fix the missing property error
export const CATEGORIES: Category[] = [
  { id: '1', name: 'Action', movieCount: 2 },
  { id: '2', name: 'Drama', movieCount: 1 },
  { id: '3', name: 'Sci-Fi', movieCount: 1 },
  { id: '4', name: 'Comedy', movieCount: 0 },
  { id: '5', name: 'Documentary', movieCount: 1 }
];

export const ANALYTICS_MOCK = [
  { name: 'Mon', views: 4000, watchTime: 2400 },
  { name: 'Tue', views: 3000, watchTime: 1398 },
  { name: 'Wed', views: 2000, watchTime: 9800 },
  { name: 'Thu', views: 2780, watchTime: 3908 },
  { name: 'Fri', views: 1890, watchTime: 4800 },
  { name: 'Sat', views: 2390, watchTime: 3800 },
  { name: 'Sun', views: 3490, watchTime: 4300 },
];
