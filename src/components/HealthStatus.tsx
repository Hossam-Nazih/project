import { useEffect, useState } from 'react'
import { checkHealth } from '../api/api'

export function HealthStatus() {
  const [status, setStatus] = useState<string>('Vérification...')

  useEffect(() => {
    checkHealth()
      .then(res => setStatus(res.message))
      .catch(() => setStatus("Le serveur est injoignable."))
  }, [])

  return (
    <div className="p-4 text-sm text-gray-600 italic">{status}</div>
  )
}