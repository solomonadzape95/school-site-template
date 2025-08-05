// import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SchoolProvider } from './context/SchoolContext';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Vision from './pages/Vision';
import Founder from './pages/Founder';
import Curricular from './pages/Curricular';
import Extracurricular from './pages/Extracurricular';
import Admissions from './pages/Admissions';
import News from './pages/News';
import NewsDetail from './pages/NewsDetail';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import DressCode from './pages/DressCode';
import DailySchedule from './pages/DailySchedule';
// import Gallery from './pages/Gallery';
import Login from './pages/Login';
import ResultChecker from './pages/ResultChecker';
import Contact from './pages/Contact';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
import './styles/App.css';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SchoolProvider>
        <Router>
          <Routes>
            {/* Admin Routes - No Header/Footer */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route 
              path="/admin/dashboard" 
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* All Other Routes - With Header/Footer */}
            <Route path="*" element={
              <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/vision" element={<Vision />} />
                    <Route path="/founder" element={<Founder />} />
                    <Route path="/curricular" element={<Curricular />} />
                    <Route path="/extracurricular" element={<Extracurricular />} />
                    <Route path="/admissions" element={<Admissions />} />
                    <Route path="/dress-code" element={<DressCode />} />
                    <Route path="/daily-schedule" element={<DailySchedule />} />
                    <Route path="/news" element={<News />} />
                    <Route path="/news/:newsSlug" element={<NewsDetail />} />
                    <Route path="/events" element={<Events />} />
                    <Route path="/events/:eventSlug" element={<EventDetail />} />
                    {/* <Route path="/gallery" element={<Gallery />} /> */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/result-checker" element={<ResultChecker />} />
                    <Route path="/contact" element={<Contact />} />
                  </Routes>
                </main>
                <Footer />
              </div>
            } />
          </Routes>
        </Router>
      </SchoolProvider>
      <ReactQueryDevtools/>
    </QueryClientProvider>
  );
}

export default App;
