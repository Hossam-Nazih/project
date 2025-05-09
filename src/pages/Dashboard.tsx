import React, { useEffect, useState } from 'react';
import { BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchDocuments } from '../api/api';
import { HealthStatus } from '../components/HealthStatus';

// Define a proper interface for document objects
interface Document {
  _id: string;
  name: string;
  filename?: string;
  uploadDate?: string;
}

export default function Dashboard() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Use the fetchDocuments function from api.ts
    const getDocuments = async () => {
      try {
        setLoading(true);
        const data = await fetchDocuments();
        console.log("Fetched documents:", data);
        setDocuments(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching documents:', err);
        setError('Failed to load documents. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    getDocuments();
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Liste des Documents</h3>
          <HealthStatus />
        </div>
        
        <div className="border-t border-gray-200">
          {loading ? (
            <div className="px-4 py-12 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-indigo-600"></div>
              <p className="mt-2 text-sm text-gray-500">Chargement des documents...</p>
            </div>
          ) : error ? (
            <div className="px-4 py-6 text-center text-red-500">{error}</div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {documents.length > 0 ? (
                documents.map((doc) => (
                  <li key={doc._id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <BookOpen className="h-5 w-5 text-indigo-600" />
                        </div>
                        <div className="ml-4">
                          <Link 
                            to={`/pdf/${doc._id}`}
                            className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
                          >
                            {doc.name || doc.filename || 'Document sans nom'}
                          </Link>
                          {doc.uploadDate && (
                            <p className="text-xs text-gray-500">
                              Uploadé le: {new Date(doc.uploadDate).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <div className="px-4 py-6 text-center text-gray-500">
                  Aucun document trouvé. Commencez par en soumettre un.
                </div>
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}