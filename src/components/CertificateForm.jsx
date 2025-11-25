import { useState, useEffect } from "react";
import { engToMarathi } from "../utils/translate";
import { dateToWords } from "../utils/dateToWords";
import "./CertificateForm.css";

const CertificateForm = ({ onGenerate, savedData }) => {
  const [formData, setFormData] = useState({
    name: "",
    name_marathi: "",
    sex: "",
    sex_marathi: "",
    eid: "",
    eid_marathi: "",
    dateOfBirth: "",
    dateOfBirth_marathi: "",
    nameOfMother: "",
    nameOfMother_marathi: "",
    aadhaarMother: "",
    aadhaarMother_marathi: "",
    addressAtBirth: "",
    addressAtBirth_marathi: "",
    registrationNumber: "",
    remarks: "",
    remarks_marathi: "",
    dateOfIssue: "",
    dateOfIssue_marathi: "",
    placeOfBirth: "",
    placeOfBirth_marathi: "",
    nameOfFather: "",
    nameOfFather_marathi: "",
    aadhaarFather: "",
    aadhaarFather_marathi: "",
    permanentAddress: "",
    permanentAddress_marathi: "",
    dateOfRegistration: "",
    signature: null,
    photo: null,
  });

  const [typingTimeout, setTypingTimeout] = useState(null);

  useEffect(() => {
    if (savedData) setFormData(savedData);
  }, [savedData]);

  // -------------------
  // Handle Input Change
  // -------------------
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
      return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));

    if (typingTimeout) clearTimeout(typingTimeout);

    // Debounce transliteration
    setTypingTimeout(setTimeout(async () => {
      if (!value) {
        setFormData(prev => ({ ...prev, [name + "_marathi"]: "" }));
        return;
      }
      try {
        const cleanedValue = value.replace(/\n/g, " ").trim();
        const marathiText = await engToMarathi(cleanedValue);
        setFormData(prev => ({ ...prev, [name + "_marathi"]: marathiText }));
      } catch (err) {
        setFormData(prev => ({ ...prev, [name + "_marathi"]: value }));
      }
    }, 500));
  };

  // -------------------
  // Handle Form Submit
  // -------------------
  const handleSubmit = (e) => {
    e.preventDefault();
    const id = Date.now().toString();
    onGenerate({ ...formData, id });
  };

  return (
    <div className="certificate-form-container">
      <h2>Birth Certificate Information</h2>
      <form onSubmit={handleSubmit} className="certificate-form" autoComplete="off">

        {/* NAME & SEX */}
        <div className="form-row">
          <div className="form-group">
            <label>नाव / Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            <p className="mar-text">{formData.name_marathi}</p>
          </div>

          <div className="form-group">
            <label>लिंग / Sex</label>
            <select name="sex" value={formData.sex} onChange={handleChange} required>
              <option value="">Select</option>
              <option value="MALE / पुरुष">MALE / पुरुष</option>
              <option value="FEMALE / महिला">FEMALE / महिला</option>

            </select>
            <p className="mar-text"></p>
          </div>
        </div>

        {/* EID & DOB */}
        <div className="form-row">
          <div className="form-group">
            <label>ईआयडी / EID</label>
            <input type="text" name="eid" value={formData.eid} onChange={handleChange} />
            <p className="mar-text"></p>
          </div>

          <div className="form-group">
            <label>जन्म तारीख / Date of Birth</label>
            <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
            <p className="mar-text">{formData.dateOfBirth ? dateToWords(formData.dateOfBirth) : ""}</p>
          </div>
        </div>

        {/* MOTHER NAME & AADHAAR */}
        <div className="form-row">
          <div className="form-group">
            <label>आईचे नाव / Name of Mother</label>
            <input type="text" name="nameOfMother" value={formData.nameOfMother} onChange={handleChange} required />
            <p className="mar-text">{formData.nameOfMother_marathi}</p>
          </div>

          <div className="form-group">
            <label>आईचा आधार / Aadhaar Mother</label>
            <input type="text" name="aadhaarMother" value={formData.aadhaarMother} onChange={handleChange} />
            <p className="mar-text"></p>
          </div>
        </div>

        {/* ADDRESS AT BIRTH */}
        <div className="form-group full-width">
          <label>पालकांचा पत्ता (जन्माच्या वेळी) / Address at Birth</label>
          <input name="addressAtBirth" value={formData.addressAtBirth} onChange={handleChange} />
          <p className="mar-text">{formData.addressAtBirth_marathi}</p>
        </div>

        {/* PLACE OF BIRTH */}
        <div className="form-group full-width">
          <label>जन्मठिकाण / Place of Birth</label>
          <input type="text" name="placeOfBirth" value={formData.placeOfBirth} onChange={handleChange} />
          <p className="mar-text">{formData.placeOfBirth_marathi}</p>
        </div>

        {/* FATHER NAME & AADHAAR */}
        <div className="form-row">
          <div className="form-group">
            <label>वडिलांचे नाव / Name of Father</label>
            <input type="text" name="nameOfFather" value={formData.nameOfFather} onChange={handleChange} />
            <p className="mar-text">{formData.nameOfFather_marathi}</p>
          </div>

          <div className="form-group">
            <label>वडिलांचा आधार / Aadhaar Father</label>
            <input type="text" name="aadhaarFather" value={formData.aadhaarFather} onChange={handleChange} />
            <p className="mar-text"></p>
          </div>
        </div>

        {/* PERMANENT ADDRESS */}
        <div className="form-group full-width">
          <label>पालकांचा कायमचा पत्ता / Permanent Address</label>
          <input name="permanentAddress" value={formData.permanentAddress} onChange={handleChange} />
          <p className="mar-text">{formData.permanentAddress_marathi}</p>
        </div>

        {/* REGISTRATION, REMARKS, DATE OF ISSUE */}
        <div className="form-row">
          <div className="form-group">
            <label>नोंदणी दिनांक / Date of Registration</label>
            <input type="date" name="dateOfRegistration" value={formData.dateOfRegistration} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>शेरा (असल्यास) / Remarks</label>
            <input type="text" name="remarks" value={formData.remarks} onChange={handleChange} />
            <p className="mar-text"></p>
          </div>
          <div className="form-group">
            <label>प्रमाणपत्र दिल्याचा दिनांक / Date of Issue</label>
            <input type="date" name="dateOfIssue" value={formData.dateOfIssue} onChange={handleChange} />
          </div>
        </div>

        {/* SIGNATURE & PHOTO */}
        <div className="form-row">
          <div className="form-group">
            <label>Signature</label>
            <input type="file" name="signature" accept="image/*" onChange={handleChange} />
          </div>
          {/* <div className="form-group">
            <label>Photo</label>
            <input type="file" name="photo" accept="image/*" onChange={handleChange} />
          </div> */}
        </div>

        <button type="submit" className="btn btn-generate">Generate Certificate</button>
      </form>
    </div>
  );
};

export default CertificateForm;
