import React, { createContext, useContext, useReducer } from 'react';

// Types
export interface NewsItem {
  id: string;
  title: string;
  date: string;
  content: string;
  category: string;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  description: string;
  location?: string;
}

export interface SchoolData {
  news: NewsItem[];
  events: EventItem[];
  aboutSchool: string;
  vision: string;
  mission: string;
  activities: string;
  founderBio: string;
}

// Initial data
const initialData: SchoolData = {
  news: [
    {
      id: '1',
      title: '2024/2025 First Term Results',
      date: 'Jan 15, 2025',
      content: 'Excellent academic performance across all classes with 95% pass rate.',
      category: 'Academic'
    },
    {
      id: '2',
      title: '2023/2024 Third Term Results',
      date: 'Aug 10, 2024',
      content: 'Outstanding results with many students achieving distinction grades.',
      category: 'Academic'
    },
    {
      id: '3',
      title: '2023/2024 Newsletter',
      date: 'Aug 10, 2024',
      content: 'Comprehensive overview of school activities and achievements.',
      category: 'General'
    },
    {
      id: '4',
      title: '2022/2023 Academic Year Results',
      date: 'Jul 25, 2023',
      content: 'Record-breaking performance in national examinations.',
      category: 'Academic'
    }
  ],
  events: [
    {
      id: '1',
      title: 'Annual Sports Day',
      date: 'Mar 15, 2025',
      description: 'Inter-house sports competition featuring track and field events.',
      location: 'School Sports Complex'
    },
    {
      id: '2',
      title: 'Science Fair',
      date: 'Apr 20, 2025',
      description: 'Students showcase innovative science projects and experiments.',
      location: 'School Auditorium'
    },
    {
      id: '3',
      title: 'Graduation Ceremony',
      date: 'Jul 10, 2025',
      description: 'Celebration of graduating students and their achievements.',
      location: 'Main Hall'
    }
  ],
  aboutSchool: "Born out of passion through the divine Grace of God, the school was founded by Chief Dr. Pius Chinedu Ogbonnia Okoh on the 1st July 1975. It was formerly known as 'Glasgow' and has grown to become one of the most prestigious educational institutions in the region.",
  vision: "Holy Ghost Schools strive towards producing pupils/students with intellectual capacity, sound morals, spiritual and social values who will grow to become world-class leaders and responsible citizens.",
  mission: "To provide quality education in a conducive environment that nurtures academic excellence, character development, and spiritual growth, preparing students for future challenges and opportunities.",
  activities: "Our students get involved in activities that not only stimulate the mind but also stimulate the body, to break barriers they never thought possible. From academic competitions to sports, arts, and community service.",
  founderBio: "Nze (Dr.) Pius Chinedum Ogbonnia Okoh was born on May 10, 1950, in Ezi Idume, Ngodo Village Afikpo North Local Government Area of Ebonyi State, Nigeria. A visionary educator and philanthropist, he dedicated his life to providing quality education to children regardless of their financial background. His legacy continues to inspire generations of students and educators."
};

// Action types
type Action = 
  | { type: 'ADD_NEWS'; payload: NewsItem }
  | { type: 'UPDATE_NEWS'; payload: NewsItem }
  | { type: 'DELETE_NEWS'; payload: string }
  | { type: 'ADD_EVENT'; payload: EventItem }
  | { type: 'UPDATE_EVENT'; payload: EventItem }
  | { type: 'DELETE_EVENT'; payload: string }
  | { type: 'UPDATE_ABOUT'; payload: string }
  | { type: 'UPDATE_VISION'; payload: string }
  | { type: 'UPDATE_MISSION'; payload: string }
  | { type: 'UPDATE_ACTIVITIES'; payload: string }
  | { type: 'UPDATE_FOUNDER_BIO'; payload: string };

// Reducer
const schoolReducer = (state: SchoolData, action: Action): SchoolData => {
  switch (action.type) {
    case 'ADD_NEWS':
      return { ...state, news: [...state.news, action.payload] };
    case 'UPDATE_NEWS':
      return { 
        ...state, 
        news: state.news.map(item => 
          item.id === action.payload.id ? action.payload : item
        ) 
      };
    case 'DELETE_NEWS':
      return { 
        ...state, 
        news: state.news.filter(item => item.id !== action.payload) 
      };
    case 'ADD_EVENT':
      return { ...state, events: [...state.events, action.payload] };
    case 'UPDATE_EVENT':
      return { 
        ...state, 
        events: state.events.map(item => 
          item.id === action.payload.id ? action.payload : item
        ) 
      };
    case 'DELETE_EVENT':
      return { 
        ...state, 
        events: state.events.filter(item => item.id !== action.payload) 
      };
    case 'UPDATE_ABOUT':
      return { ...state, aboutSchool: action.payload };
    case 'UPDATE_VISION':
      return { ...state, vision: action.payload };
    case 'UPDATE_MISSION':
      return { ...state, mission: action.payload };
    case 'UPDATE_ACTIVITIES':
      return { ...state, activities: action.payload };
    case 'UPDATE_FOUNDER_BIO':
      return { ...state, founderBio: action.payload };
    default:
      return state;
  }
};

// Context
interface SchoolContextType {
  data: SchoolData;
  dispatch: React.Dispatch<Action>;
}

const SchoolContext = createContext<SchoolContextType | undefined>(undefined);

type Props = {
  children: React.ReactNode;
}
// Provider
export const SchoolProvider: React.FC<Props> = ({ children }) => {
  const [data, dispatch] = useReducer(schoolReducer, initialData);

  return (
    <SchoolContext.Provider value={{ data, dispatch }}>
      {children}
    </SchoolContext.Provider>
  );
};

// Hook
export const useSchool = () => {
  const context = useContext(SchoolContext);
  if (context === undefined) {
    throw new Error('useSchool must be used within a SchoolProvider');
  }
  return context;
}; 