import { useRef } from 'react'
import { QRCodeCanvas } from 'qrcode.react'
import { dateToWords } from "../utils/dateToWords" // <-- ADD THIS
import './CertificateView.css'
import govLogo from '../assets/maharashtra-logo.png'

import leftImage from '../assets/Seal.svg'
import rightImage from '../assets/iim.jpeg'



const CertificateView = ({ data, onBack }) => {
  const certificateRef = useRef()

  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  const handlePrint = () => {
    document.body.classList.add('printing')
    setTimeout(() => {
      window.print()
      setTimeout(() => document.body.classList.remove('printing'), 500)
    }, 100)
  }

  const certificateLink = `${window.location.origin}/certificate/${data.id}`

  return (
    <div className="certificate-view">
      <div className="certificate-actions">
        {onBack && <button className="btn btn-back" onClick={onBack}>Back to Form</button>}
        <button className="btn btn-print" onClick={handlePrint}>Print Certificate</button>
      </div>

      <div className="certificate" ref={certificateRef}>

        {/* HEADER */}
        <div className="certificate-header">
          <div className="header-left">
            <p>अनु. क्र. १<br />S.No. 1</p>
            <img src={leftImage} alt="Left Logo" className="header-small-logo" />
          </div>
          <div className="header-center">
            <img src={govLogo} alt="Government Logo" className="gov-logo" />
            <h2>महाराष्ट्र शासन<br />GOVERNMENT OF MAHARASHTRA</h2>
            <h3>सार्वजनिक आरोग्य विभाग<br />DEPARTMENT OF PUBLIC HEALTH</h3>
            <h4>GRAMA PANCHAYAT MANDANA</h4>
          </div>
          <div className="header-right">
            <p>फॉम ५<br />FORM 5</p>
            <img src={rightImage} alt="Right Logo" className="header-small-logo" />
          </div>
        </div>

     

        {/* STATEMENT */}
        <div className="certificate-body">
            <div className="certificate-title">
          <h1>जन्म प्रमाणपत्र<br />BIRTH CERTIFICATE</h1>
        </div>
          <p className="statement">
             (जन्म आणि मृत्यू नोंदणी अधिनियम, 1969 च्या कलम 12/17 आणि महाराष्ट्र जन्म आणि मृत्यू नियम 2000 च्या नियम 8/13 अंतर्गत देण्यात आले आहे)<br />
            (ISSUED UNDER SECTION 12/17 OF THE REGISTRATION OF BIRTHS AND DEATHS ACT, 1969 AND RULE 8/13 OF THE MAHARASHTRA REGISTRATION OF BIRTHS & DEATHS RULES 2000)
            प्रमाणित करण्यात येते की खालील माहिती जन्म नोंदवही या मूळ अभिलेखावरून घेण्यात आली आहे जी तहसील / ब्लॉक सिलोड जिल्हा छत्रपती संभाजीनगर राज्य / केंद्रशासित प्रदेश, भारत यांच्या नोंदवहीत उपलब्ध आहे.<br />
            THIS IS TO CERTIFY THAT THE FOLLOWING INFORMATION HAS BEEN TAKEN FROM THE ORIGINAL RECORD OF BIRTH WHICH IS THE REGISTER FOR GRAMA PANCHAYAT MANDANA OF TAHSIL/BLOCK SILLOD OF DISTRICT CHHATRAPATI SAMBHAJINAGAR OF STATE/UNION TERRITORY OF MAHARASHTRA, INDIA
          </p>

          {/* DETAILS SECTION */}
          <div className="certificate-details two-column">

            {/* LEFT SIDE */}
            <div className="details-left">
              <div className="detail-roww">
                <div className="detail-labell">नाव / NAME:</div>
                <div className="detail-valuee">{data.name} / {data.name_marathi}</div>
              </div>

              <div className="detail-roww">
                <div className="detail-labell">ईआयडी / EID:</div>
                <div className="detail-valuee">{data.eid} </div>
              </div>

              <div className="detail-row">
                <div className="detail-label">जन्म दिनांक / DATE OF BIRTH:</div>
                <div className="detail-value">{dateToWords(data.dateOfBirth)}</div>
              </div>

              <div className="detail-row">
                <div className="detail-label">जन्म ठिकाण / PLACE OF BIRTH:</div>
                <div className="detail-value">{data.placeOfBirth} / {data.placeOfBirth_marathi}</div>
              </div>

              <div className="detail-row">
                <div className="detail-label">आईचे नाव / NAME OF MOTHER:</div>
                <div className="detail-value">{data.nameOfMother} / {data.nameOfMother_marathi}</div>
              </div>

              <div className="detail-row">
                <div className="detail-label">वडिलांचे नाव / NAME OF FATHER:</div>
                <div className="detail-value">{data.nameOfFather}</div>
              </div>

              <div className="detail-row">
                <div className="detail-label">आईचा आधार / AADHAAR OF MOTHER:</div>
                <div className="detail-value">{data.aadhaarMother}</div>
              </div>

              <div className="detail-row">
                <div className="detail-label">वडिलांचा आधार / AADHAAR OF FATHER:</div>
                <div className="detail-value">{data.aadhaarFather}</div>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="details-right">
               <div className="detail-roww">
                <div className="detail-labell">लिंग / SEX:</div>
                <div className="detail-valuee">{data.sex} </div>
              </div>
              
              <div className="detail-row">
                <div className="detail-label">पालकांचा पत्ता (जन्माच्या वेळी) / ADDRESS AT BIRTH:</div>
                <div className="detail-value">{data.addressAtBirth} / {data.addressAtBirth_marathi}</div>
              </div>

              <div className="detail-row">
                <div className="detail-label">पालकांचा कायमचा पत्ता / PERMANENT ADDRESS:</div>
                <div className="detail-value">{data.permanentAddress} / {data.permanentAddress_marathi}</div>
              </div>

              <div className="detail-row">
                <div className="detail-label">नोंदणी दिनांक / DATE OF REGISTRATION:</div>
                <div className="detail-value">{formatDate(data.dateOfRegistration)} / {data.dateOfRegistration_marathi}</div>
              </div>

              <div className="detail-roww">
                <div className="detail-labell">शेरा / REMARKS:</div>
                <div className="detail-valuee">{data.remarks}</div>
              </div>

              <div className="detail-row">
                <div className="detail-label">प्रमाणपत्र दिल्याचा दिनांक / DATE OF ISSUE:</div>
                <div className="detail-valuee">{formatDate(data.dateOfIssue)}</div>
              </div>
            </div>
          </div>

          {/* FOOTER SECTION */}
          <div className="footer-section">
            <div className="qr-section">
              <QRCodeCanvas value={certificateLink} size={100} />
              <p className="qr-note"> "This	QR	code	can	be	used	to	check	the	authenticity	of	the
 certificate"</p>
            </div>

            <div className="signature-section">
              {data.signature && (
                <img
                  src={URL.createObjectURL(data.signature)}
                  alt="Signature"
                  className="signature-image"
                />
              )}
              <p>निर्गमित करणाऱ्या पदाधिकाऱ्याची सही / SIGNATURE OF ISSUING AUTHORITY</p>
              <p className="registrar-title">
                निबंधक (जन्म आणि मृत्यू) <br />
                Registrar (Birth & Death) <br />
                GRAMA PANCHAYAT MANDANA
              </p>
            </div>
          </div>

          <div className="footer-tagline">
            "प्रत्येक जन्म आणि मृत्यूची नोंदणी सुनिश्चित करा / ENSURE REGISTRATION OF EVERY BIRTH AND DEATH"
          </div>
        </div>
      </div>
    </div>
  )
}

export default CertificateView
