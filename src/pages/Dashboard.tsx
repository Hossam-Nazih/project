import React, { useEffect, useState } from 'react';
import { BookOpen } from 'lucide-react';
import PdfViewer from '../components/PdfViewer'; // Corrected import

export default function Dashboard() {
  const [documents, setDocuments] = useState<any[]>([]);
  const [selectedDocId, setSelectedDocId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Fetch the list of documents from the backend
    const fetchDocuments = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/documents/');
        const data = await response.json();
        console.log("Fetched documents:", data); // Debugging: Check API response
        setDocuments(data);
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    };

    fetchDocuments();
  }, []);

  // Handle the click event to open the PDF viewer modal
  const handleDocumentClick = (docId: string) => {
    setSelectedDocId(docId);
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDocId(null);
  };

  return (
    <div className="space-y-6 relative">
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Liste des Documents</h3>
        </div>
        <div className="border-t border-gray-200">
          <ul className="divide-y divide-gray-200">
            {/* Ensure the documents are being mapped correctly */}
            {documents.length > 0 ? (
              documents.map((doc) => (
                <li key={doc._id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <BookOpen className="h-5 w-5 text-indigo-600" />
                      </div>
                      <div className="ml-4">
                        {/* Display document name and make it clickable */}
                        <p
                          className="text-sm font-medium text-indigo-600 cursor-pointer"
                          onClick={() => handleDocumentClick(doc._id)}
                        >
                          {doc.name ? doc.name : 'No name available'} {/* Display name */}
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <p className="text-center text-gray-500">No documents found</p>
            )}
          </ul>
        </div>
      </div>

      {/* Modal to display PDF */}
      {isModalOpen && selectedDocId && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-full md:w-2/3 lg:w-1/2">
            <button
              className="absolute top-2 right-2 text-gray-500"
              onClick={closeModal}
            >
              Close
            </button>
            {/* Render PdfViewer with the selected document */}
            <PdfViewer docId={selectedDocId} />
          </div>
        </div>
      )}
    </div>
  );
}
