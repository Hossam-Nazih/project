import React from 'react';
import { Clock, Download, Eye } from 'lucide-react';

export default function ProjectHistory() {
  const submissions = [];

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Générateur de Résumés</h3>
          <p className="mt-1 text-sm text-gray-500">Cliquez sur un bouton pour générer un résumé d'un document PDF.</p>
        </div>

        <div className="divide-y divide-gray-200">
          {submissions.map((submission) => (
            <div key={submission.id} className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`flex-shrink-0 w-2.5 h-2.5 rounded-full ${
                    submission.status === 'Approuvé' ? 'bg-green-600' :
                    submission.status === 'En révision' ? 'bg-yellow-500' :
                    'bg-red-600'
                  }`} />
                  <h4 className="text-lg font-medium text-gray-900">{submission.title}</h4>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="flex-shrink-0 mr-1.5 h-4 w-4" />
                  {submission.date}
                </div>
              </div>

              <div className="mt-4 text-sm text-gray-700">
                <p className="font-medium">Retour :</p>
                <p className="mt-1">{submission.feedback}</p>
              </div>

              <div className="mt-4">
                <div className="flex flex-wrap gap-2">
                  {submission.files.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700"
                    >
                      <span>{file}</span>
                      <div className="ml-2 flex space-x-1">
                        <button className="text-gray-500 hover:text-gray-700">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="text-gray-500 hover:text-gray-700">
                          <Download className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}