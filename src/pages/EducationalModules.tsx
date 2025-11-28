import React, { useState } from 'react';
import { Play, CheckCircle, Clock, BookOpen } from 'lucide-react';
import Button from '@/components/Button';
import { EducationalModule } from '@/assets/types';

const EducationalModules: React.FC = () => {
  const [progress, setProgress] = useState<Record<string, number>>({
    'digital-literacy': 75,
    'online-safety': 40,
    'consent-education': 20,
    'bystander-intervention': 0
  });

  const modules: EducationalModule[] = [
    {
      id: 'digital-literacy',
      title: 'Digital Literacy & Rights',
      description: 'Understand your digital rights and learn essential online safety practices',
      duration: '45 min',
      lessons: 6,
      icon: BookOpen,
      category: 'Foundation',
      progress: 75,
      completed: false
    },
    {
      id: 'online-safety',
      title: 'Online Safety Fundamentals',
      description: 'Learn how to protect yourself from online harassment and cyber threats',
      duration: '30 min',
      lessons: 4,
      icon: BookOpen,
      category: 'Safety',
      progress: 40,
      completed: false
    },
    {
      id: 'consent-education',
      title: 'Digital Consent & Boundaries',
      description: 'Understanding consent in digital spaces and setting healthy boundaries',
      duration: '35 min',
      lessons: 5,
      icon: BookOpen,
      category: 'Relationships',
      progress: 20,
      completed: false
    },
    {
      id: 'bystander-intervention',
      title: 'Bystander Intervention Training',
      description: 'Learn how to safely intervene when witnessing online harassment',
      duration: '50 min',
      lessons: 7,
      icon: BookOpen,
      category: 'Community',
      progress: 0,
      completed: false
    }
  ];

  const startModule = (moduleId: string) => {
    const currentProgress = progress[moduleId];
    if (currentProgress < 100) {
      const newProgress = Math.min(currentProgress + 25, 100);
      setProgress(prev => ({
        ...prev,
        [moduleId]: newProgress
      }));
    }
  };

  const overallProgress = Math.round(
    Object.values(progress).reduce((a, b) => a + b, 0) / Object.keys(progress).length
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Educational Modules</h1>
        <p className="text-gray-600 mt-2">Interactive digital literacy and safety education content</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Overall Progress</h3>
          <div className="flex items-center space-x-6">
            <div className="relative w-24 h-24">
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#E5E7EB"
                  strokeWidth="3"
                />
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="3"
                  strokeDasharray={`${overallProgress}, 100`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-900">{overallProgress}%</span>
              </div>
            </div>
            <div>
              <p className="text-gray-600">
                {modules.filter(m => progress[m.id] === 100).length} of {modules.length} modules completed
              </p>
              <p className="text-sm text-gray-500 mt-1">Keep learning to improve your safety skills</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Learning Stats</h3>
          <div className="space-y-3">
            {modules.map(module => (
              <div key={module.id} className="flex items-center justify-between">
                <span className="text-gray-700">{module.title}</span>
                <div className="flex items-center space-x-2">
                  {progress[module.id] === 100 ? (
                    <div className="text-green-600">
                      <CheckCircle />
                    </div>
                  ) : (
                    <div className="text-yellow-600">
                      <Clock />
                    </div>
                  )}
                  <span className="text-sm text-gray-600">{progress[module.id]}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {modules.map((module) => {
          const Icon = module.icon;
          const isCompleted = progress[module.id] === 100;
          
          return (
            <div key={module.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="text-blue-600" style={{ width: '24px', height: '24px' }}>
                    <Icon />
                  </div>
                </div>
                <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm font-medium">
                  {module.category}
                </span>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-2">{module.title}</h3>
              <p className="text-gray-600 mb-4">{module.description}</p>

              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span>{module.duration}</span>
                <span>{module.lessons} lessons</span>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Progress</span>
                  <span>{progress[module.id]}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${progress[module.id]}%` }}
                  />
                </div>
              </div>

              <Button
                onClick={() => startModule(module.id)}
                variant={isCompleted ? 'success' : 'primary'}
                className="w-full flex items-center justify-center space-x-2"
              >
                {isCompleted ? (
                  <>
                    <div className="text-white">
                      <CheckCircle />
                    </div>
                    <span>Completed</span>
                  </>
                ) : (
                  <>
                    <div className="text-white">
                      <Play />
                    </div>
                    <span>Start Module</span>
                  </>
                )}
              </Button>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Resources</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a href="#" className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="p-2 bg-blue-50 rounded">
              <div className="text-blue-600" style={{ width: '20px', height: '20px' }}>
                <BookOpen />
              </div>
            </div>
            <span className="font-medium text-gray-900">Safety Guidelines</span>
          </a>
          <a href="#" className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="p-2 bg-green-50 rounded">
              <div className="text-green-600" style={{ width: '20px', height: '20px' }}>
                <BookOpen />
              </div>
            </div>
            <span className="font-medium text-gray-900">Video Tutorials</span>
          </a>
          <a href="#" className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="p-2 bg-purple-50 rounded">
              <div className="text-purple-600" style={{ width: '20px', height: '20px' }}>
                <BookOpen />
              </div>
            </div>
            <span className="font-medium text-gray-900">Research Papers</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default EducationalModules;