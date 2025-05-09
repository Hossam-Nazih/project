import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import Dashboard from './pages/Dashboard';
import ProjectSubmission from './pages/ProjectSubmission';
import ProjectHistory from './pages/Summarizer';
import Chat from './pages/Chat';
import PdfViewer from './components/PdfViewer'; // Import PdfViewer

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route
            path="/*"
            element={
              <div>
                <Navigation />
                <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/submit" element={<ProjectSubmission />} />
                    <Route path="/summarize" element={<ProjectHistory />} />
                    <Route path="/chat" element={<Chat />} />
                    <Route path="/pdf/:docId" element={<PdfViewer />} /> {/* New route for PDF viewing */}
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                  </Routes>
                </main>
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
