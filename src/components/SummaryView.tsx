import { useState } from 'react'
import { summarizeDocument } from '../api/api'

export function SummaryView() {
  const [docId, setDocId] = useState('')
  const [summary, setSummary] = useState('')

  const handleSummarize = async () => {
    try {
      const result = await summarizeDocument(docId)
      setSummary(result.summary)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="p-4">
      <input value={docId} onChange={(e) => setDocId(e.target.value)} placeholder="ID du document" className="border p-1 mr-2" />
      <button onClick={handleSummarize} className="px-4 py-1 bg-purple-600 text-white rounded">Résumer</button>
      {summary && <p className="mt-2 whitespace-pre-line">{summary}</p>}
    </div>
  )
}