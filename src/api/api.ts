// src/api/api.ts fixes

import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000',
});

export async function uploadPDF(file: File) {
  try {
    const formData = new FormData()
    formData.append('file', file)

    const response = await api.post('/upload/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    return response.data // contains id, filename, preview
  } catch (error) {
    console.error('Error uploading PDF:', error);
    throw error; // Make sure we're properly propagating errors
  }
}

// === 2. Ask a question ===
interface AskResponse {
  answer: string;
  document_title: string;
  confidence?: number;
}

export async function askQuestion(docId: string, question: string): Promise<AskResponse> {
  try {
    // Fix the request payload format - use document_id instead of docId
    const response = await api.post('/ask/', {
      document_id: docId,
      question,
    });
    
    return response.data;
  } catch (error) {
    console.error('Error in askQuestion:', error);
    throw error;
  }
}


// === 3. List documents ===
export async function fetchDocuments() {
  try {
    const response = await api.get('/documents/')
    return response.data // document list
  } catch (error) {
    console.error('Error fetching documents:', error);
    throw error;
  }
}

// === 4. Local document summary ===
export async function summarizeDocument(documentId: string) {
  try {
    const response = await api.get(`/summarize/${documentId}`)
    return response.data // contains summary
  } catch (error) {
    console.error('Error summarizing document:', error);
    throw error;
  }
}

// === 5. Health check ===
export async function checkHealth() {
  try {
    const response = await api.get('/health')
    return response.data
  } catch (error) {
    console.error('Error checking health:', error);
    return { message: "Le serveur est injoignable." };
  }
}

export default api;