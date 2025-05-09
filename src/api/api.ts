import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000',
});

export async function uploadPDF(file: File) {
  const formData = new FormData()
  formData.append('file', file)

  const response = await api.post('/upload/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return response.data // contient id, filename, preview
}

// === 2. Ask a question ===
interface AskResponse {
  answer: string;
  document_title: string;
  confidence?: number;
}

export async function askQuestion(docId: string, question: string): Promise<AskResponse> {
  try {
    const response = await fetch('http://127.0.0.1:8000/ask/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        docId,
        question,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const message = errorData.detail || response.statusText || 'Une erreur est survenue.';
      throw new Error(`Erreur serveur: ${message}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erreur dans askQuestion:', error);
    throw error;
  }
}


// === 3. List documents ===
export async function fetchDocuments() {
  const response = await api.get('/documents/')
  return response.data // liste de documents
}

// === 4. Résumé local d’un document ===
export async function summarizeDocument(documentId: string) {
  const response = await api.get(`/summarize/${documentId}`)

  return response.data // contient summary
}

// === 5. Health check ===
export async function checkHealth() {
  const response = await api.get('/health')
  return response.data
}

export default api;