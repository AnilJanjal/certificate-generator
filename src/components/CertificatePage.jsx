import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import CertificateView from './CertificateView'

const CertificatePage = () => {
  const { id } = useParams()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`http://localhost:5000/api/certificates/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Certificate not found')
        return res.json()
      })
      .then(data => setData(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <h2>Loading...</h2>
  if (!data) return <h2>Certificate not found</h2>

  return <CertificateView data={data} />
}

export default CertificatePage
