import React from 'react';
import LazyImage from '../components/LazyImage';
import classImage from '../assets/class-2.jpg';


const Curricular: React.FC = () => {
  const subjects = [
    { name: 'Mathematics', icon: '🔢', description: 'Advanced mathematics including algebra, geometry, calculus, and statistics.' },
    { name: 'English Language', icon: '📚', description: 'Comprehensive English language studies including literature, grammar, and composition.' },
    { name: 'Sciences', icon: '🔬', description: 'Physics, Chemistry, and Biology with practical laboratory sessions.' },
    { name: 'Social Studies', icon: '🌍', description: 'History, Geography, Government, and Economics.' },
    { name: 'Computer Science', icon: '💻', description: 'Programming, ICT, and digital literacy skills.' },
    { name: 'Languages', icon: '🗣️', description: 'French, Igbo, and other local and international languages.' },
    { name: 'Arts & Music', icon: '🎨', description: 'Creative arts, music appreciation, and cultural studies.' },
    { name: 'Physical Education', icon: '⚽', description: 'Sports, fitness, and health education.' }
  ];

  const faculties = [
    {
      name: 'Faculty of Pure Sciences/Technical Education',
      subjects: ['Physics', 'Chemistry', 'Biology', 'Mathematics', 'Computer Science', 'Technical Drawing']
    },
    {
      name: 'Faculty of Arts and Humanities',
      subjects: ['English Language', 'Literature', 'History', 'Government', 'Religious Studies', 'Fine Arts']
    },
    {
      name: 'Faculty of Social Sciences and Commercials',
      subjects: ['Economics', 'Commerce', 'Accounting', 'Geography', 'Social Studies', 'Business Studies']
    },
    {
      name: 'Vocational/Entrepreneurship Studies',
      subjects: ['Entrepreneurship', 'Home Economics', 'Agricultural Science', 'Technical Skills', 'Life Skills']
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="relative h-96 overflow-hidden">
        <LazyImage 
          src={classImage}
          alt="LASA Curriculum"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-6">
          <h1 className="text-4xl font-bold mb-4">Curricular Activities</h1>
          <p className="text-xl">Comprehensive Academic Excellence</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Introduction */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Academic Curriculum</h2>
              <p className="text-lg text-gray-600 mb-4">
                At LASA, we offer a solid foundation in STEM (Science, Technology, Engineering and Mathematics). 
                We unlock creativity through English, Art, and cultural activities. We promote health, sports, 
                and team spirit – because education is beyond books.
              </p>
              <p className="text-lg text-gray-600">
                We use a hybrid of a British and Nigerian well blended curriculum to actualize the vision of our school. 
                Our curriculum is characterized by a focus on subject areas within an integrated, thematic approach, 
                cross curricular development of literacy and numeracy, and infusion of tech and entrepreneurial skills development.
              </p>
            </div>
          </div>

          {/* Core Subjects */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Core Subjects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {subjects.map((subject, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="text-4xl mb-4">{subject.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{subject.name}</h3>
                  <p className="text-sm text-gray-600">{subject.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Secondary School Faculties */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Secondary School Faculties</h2>
            <p className="text-lg text-gray-600 text-center mb-8 max-w-4xl mx-auto">
              LASA Secondary School is a platform for preparing students to rule their world. We endeavour to give our students 
              all the training they need to succeed in life. Whether they decide to go further to the higher institutions or 
              go into technical and vocational discipline, our trainings are quite sufficient for them to do exploits in their different areas of choice.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {faculties.map((faculty, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">{faculty.name}</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {faculty.subjects.map((subject, subjectIndex) => (
                      <div key={subjectIndex} className="flex items-center">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                        <span className="text-gray-700 text-sm">{subject}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Assessment */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Assessment System</h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-gray-600 mb-6">
                Our curriculum includes a prioritization of assessment for learning through our unique weekly 
                Liberal Choice Assessment (LCA). We also provide explicit attention to differentiate instruction 
                to meet the needs of a range of students, taking cognizance of their strengths and weaknesses 
                through our customized learning approach.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Liberal Choice Assessment (LCA)</h3>
                  <p className="text-gray-600">Weekly assessments designed to evaluate student progress and understanding</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Customized Learning</h3>
                  <p className="text-gray-600">Personalized instruction tailored to individual student needs and learning styles</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Continuous Evaluation</h3>
                  <p className="text-gray-600">Ongoing assessment to track progress and provide timely feedback</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Curricular; 