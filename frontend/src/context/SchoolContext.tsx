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
  aboutSchool: "Liberal Arts and Science Academy (LASA) is a unique and fast-growing prestigious citadel of learning, situated in a serene and conducive environment, at the heart of the Capital City of Ebonyi State, Abakaliki, Nigeria, where children are specially groomed and trained for greater exploits in future. LASA is a group of schools comprising of Nursery, Primary and Secondary schools. Excellence in Education Since 2021.",
  vision: "To raise generations who will critically and creatively think, skilfully and rightly act, and comfortably live with excellence in a competitive and rapidly changing world.",
  mission: "To set a positive example in education by promoting self-discipline and excellence in learning in order to develop a sense of uniqueness in our learners and by so doing become self-reliant and role model for others.",
  activities: "At LASA, we take education beyond the classroom. We build strong foundation in arts, science and technology in a safe and supportive environment. We offer a solid foundation in STEM (Science, Technology, Engineering and Mathematics). We unlock creativity through English, Art, and cultural activities. We promote health, sports, and team spirit – because education is beyond books.",
  founderBio: "LASA was founded in 2021 with a vision to provide quality education that empowers students with knowledge, skills, and values necessary for lifelong learning and responsible citizenship in a global society. Our leadership team is committed to upholding the school's motto 'Think, Act, Live' and ensuring that every student receives the best possible education in a nurturing and supportive environment."
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