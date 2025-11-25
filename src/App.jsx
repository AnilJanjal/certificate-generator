import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import CertificateForm from './components/CertificateForm'
import CertificateView from './components/CertificateView'
import CertificatePage from './components/CertificatePage'

function App() {
  const [certificateData, setCertificateData] = useState(null)
  const [showCertificate, setShowCertificate] = useState(false)

  const handleGenerate = (data) => {
    setCertificateData(data)  // store ALL form data globally
    setShowCertificate(true)  // show certificate page
  }

  const handleBack = () => {
    setShowCertificate(false) // go back to form WITHOUT RESETTING
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            showCertificate ? (
              <CertificateView 
                data={certificateData} 
                onBack={handleBack} 
              />
            ) : (
              <CertificateForm 
                onGenerate={handleGenerate}
                savedData={certificateData}   // <-- THIS WAS MISSING
              />
            )
          }
        />

        <Route path="/certificate/:id" element={<CertificatePage />} />
      </Routes>
    </Router>
  )
}

export default App
