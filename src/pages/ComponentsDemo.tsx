import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const demoItems = [
  { path: '/accordion-example', label: 'Accordion Example' },
  { path: '/accordion-admin', label: 'Accordion Admin' },
];

const ComponentsDemo: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Component Demos</h1>
      <p className="mb-6 text-gray-600">This page lists components and demos for quick previews.</p>

      <div className="space-y-3">
        {demoItems.map((item) => (
          <Link key={item.path} to={item.path} className="block p-4 border rounded-lg hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="text-lg font-medium">{item.label}</div>
              <ArrowRight className="h-4 w-4 text-gray-400" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ComponentsDemo;
