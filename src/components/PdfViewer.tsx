import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PdfViewer = () => {
  const { docId } = useParams<{ docId: string }>(); // Get the docId from the URL
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchPdf = async () => {
      try {
        // Assuming there's an API that provides the PDF URL for the docId
        const response = await fetch(`http://127.0.0.1:8000/documents/${docId}`);
        const data = await response.json();
        setPdfUrl(data.pdfUrl); // Assuming the response contains a pdfUrl field
      } catch (error) {
        console.error('Error fetching PDF:', error);
      }
    };

    if (docId) {
      fetchPdf();
    }
  }, [docId]);

  if (!pdfUrl) {
    return <p>Loading PDF...</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold">Document Viewer</h2>
      <iframe
        src={pdfUrl}
        width="100%"
        height="600px"
        title="PDF Viewer"
      ></iframe>
    </div>
  );
};

export default PdfViewer;
