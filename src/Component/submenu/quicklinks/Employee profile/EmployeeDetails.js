import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './EmployeeDetails.css';
const EmployeeDetails = () => {
    const [showSections, setShowSections] = useState({
        employment: false,
        reporting: false,
        payroll: false,
        personal: false,
        experience: false,
        family: false,
        emergencyContact: false,
        training: false,
        certification: false,
        passport: false,
        visa: false,
        documents: false,
        languages: false,
    });
    const [employmentInfo, setEmploymentInfo] = useState({
        name: '',
        gender: '',
        location: '',
        department: '',
        division: '',
        designation: '',
        category: '',
        employeeType: ''
    });
    const [reportingInfo, setReportingInfo] = useState({
        managerName: '',
        departmentName: '',
        role: '',
        location: ''
    });
    const [payrollDetails, setPayrollDetails] = useState({
        panNo: '',
        pfAccountNo: '',
        pfUAN: '',
        bankName: '',
        branchName: '',
        epfNo: '',
        ptState: '',
        ifscCode: '',
        accountNo: '',
        esiAccountNo: '',
        costCenter: '',
        subCostCenter: '',
        variableAmount: '',
        ctc: '',
        ctcEffectiveDate: '',
        totalCTC: ''
    });
    const [personalDetails, setPersonalDetails] = useState({
        maritalStatus: '',
        title: '',
        bloodGroup: '',
        originalBirthDate: '',
        phoneNo: '',
        placeOfBirth: '',
        nationality: '',
        personalMailId: '',
        aadhaarNo: '',
        motherName: '',
        fatherName: '',
        gender: ''
    });
    const [experienceFields, setExperienceFields] = useState([{ company: '', position: '', duration: '', marks: '', institution: '' }]);
    const [trainingFields, setTrainingFields] = useState([{ trainingName: '', institution: '', year: '', marks: '' }]);
    const [certificationFields, setCertificationFields] = useState([{ certificationName: '', issuingOrg: '', year: '', marks: '' }]);
    const [passportFields, setPassportFields] = useState([{ passportNumber: '', issuedBy: '', expiryDate: '', marks: '' }]);
    const [visaFields, setVisaFields] = useState([{ visaNumber: '', issuedBy: '', expiryDate: '', marks: '' }]);
    const [languageFields, setLanguageFields] = useState([{ language: '', proficiency: '', marks: '' }]);
    const [familyFields, setFamilyFields] = useState([{ memberName: '', relation: '' }]);
    const [emergencyFields, setEmergencyFields] = useState([{ contactName: '', relationship: '', phoneNumber: '' }]);
      const [documentFields, setDocumentFields] = useState([{ documentType: '', documentNumber: '', documentFile: null }]);
       // Function to add a new field
    const addField = (setFields, newField) => {
        setFields((prevFields) => [...prevFields, newField]);
    };
    // Function to delete a field
    const deleteField = (setFields, index) => {
        setFields((prevFields) => prevFields.filter((_, i) => i !== index));
    };
    // Function to handle form submission for Basic Details
    const handleBasicSubmit = async (event) => {
        event.preventDefault();
        const employeeData = {
            employmentInfo,
            reportingInfo,
            payrollDetails,
            personalDetails,
            experience: experienceFields,
            family: familyFields,
            emergencyContacts: emergencyFields,
            training: trainingFields,
            certifications: certificationFields,
            passports: passportFields,
            visas: visaFields,
            documents: documentFields.map(field => ({
                documentType: field.documentType,
                documentNumber: field.documentNumber,
                documentFile: field.documentFile,
            })),
            languages: languageFields,
        };
        console.log('Employee Basic Data:', employeeData);
        try {
            const response = await fetch('http://localhost:5000/employee_profile/basic-details', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(employeeData),
            });
            const result = await response.json();
            console.log('Employee Basic Data Response:', result);
            alert(result.message);
        } catch (error) {
            console.error('Error:', error);
            alert('Error saving data');
        }
    };
    // Function to handle form submission for Other Details
    const handleOtherSubmit = async (event) => {
        event.preventDefault();
        const otherDetailsData = {
            documents: documentFields.map(field => ({
                documentType: field.documentType,
                documentNumber: field.documentNumber,
                documentFile: field.documentFile,
            })),
            experience: experienceFields,
            family: familyFields,
            emergencyContacts: emergencyFields,
            training: trainingFields,
            certifications: certificationFields,
            passports: passportFields,
            visas: visaFields,
            languages: languageFields,
        };
        console.log('Employee Other Details Data:', otherDetailsData);
        try {
            const response = await fetch('http://localhost:5000/employee_profile/other-details', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(otherDetailsData),
            });
            const result = await response.json();
            console.log('Employee Other Details Data Response:', result);
            alert(result.message);
        } catch (error) {
            console.error('Error:', error);
            alert('Error saving data');
        }
    };
    // Toggle visibility of sections
    const toggleSection = (section) => {
        setShowSections((prev) => ({ ...prev, [section]: !prev[section] }));
    };
    return (
        <div>
            <Tabs>
                <TabList>
                    <Tab>Employee Basic Details</Tab>
                    <Tab>Employee Other Details</Tab>
                </TabList>
                <TabPanel>
                    <div className="details-container">
                        {/* Employment Information */}
                        <div className="detail-item">
                            <div className="detail-header" onClick={() => toggleSection('employment')}>
                                <i className="fas fa-plus"></i>
                                <span> Employment Information</span>
                            </div>
                            {showSections.employment && (
                                <div className="detail-content">
                                    <div className="payroll-container">
                                        {/* Employment Fields */}
                                        {[
                                            { label: "Name", placeholder: "", value: employmentInfo.name, setValue: (value) => setEmploymentInfo(prev => ({ ...prev, name: value })) },
                                            { label: "Gender", placeholder: "", value: employmentInfo.gender, setValue: (value) => setEmploymentInfo(prev => ({ ...prev, gender: value })) },
                                            { label: "Location", placeholder: "", value: employmentInfo.location, setValue: (value) => setEmploymentInfo(prev => ({ ...prev, location: value })) },
                                            { label: "Department", placeholder: "", value: employmentInfo.department, setValue: (value) => setEmploymentInfo(prev => ({ ...prev, department: value })) },
                                            { label: "Division", placeholder: "", value: employmentInfo.division, setValue: (value) => setEmploymentInfo(prev => ({ ...prev, division: value })) },
                                            { label: "Designation", placeholder: "", value: employmentInfo.designation, setValue: (value) => setEmploymentInfo(prev => ({ ...prev, designation: value })) },
                                            { label: "Category", placeholder: "", value: employmentInfo.category, setValue: (value) => setEmploymentInfo(prev => ({ ...prev, category: value })) },
                                            { label: "Employee Type", placeholder: "", value: employmentInfo.employeeType, setValue: (value) => setEmploymentInfo(prev => ({ ...prev, employeeType: value })) },
                                        ].map((field, index) => (
                                            <div className="payroll-field" key={index}>
                                                <label>{field.label}</label>
                                                <input
                                                    type="text"
                                                    placeholder={field.placeholder}
                                                    value={field.value}
                                                    onChange={(e) => field.setValue(e.target.value)}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        
                        {/* Reporting Structure */}
                        <div className="detail-item">
                            <div className="detail-header" onClick={() => toggleSection('reporting')}>
                                <i className="fas fa-plus"></i>
                                <span> Reporting Structure</span>
                            </div>
                            {showSections.reporting && (
                                <div className="detail-content">
                                    <p>Details about the employee's reporting structure...</p>
                                    <input
                                        type="text"
                                        placeholder="Manager Name"
                                        value={reportingInfo.managerName}
                                        onChange={(e) => setReportingInfo(prev => ({ ...prev, managerName: e.target.value }))}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Department Name"
                                        value={reportingInfo.departmentName}
                                        onChange={(e) => setReportingInfo(prev => ({ ...prev, departmentName: e.target.value }))}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Role"
                                        value={reportingInfo.role}
                                        onChange={(e) => setReportingInfo(prev => ({ ...prev, role: e.target.value }))}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Location"
                                        value={reportingInfo.location}
                                        onChange={(e) => setReportingInfo(prev => ({ ...prev, location: e.target.value }))}
                                    />
                                </div>
                            )}
                        </div>
                        
                        {/* Payroll Details */}
                        <div className="detail-item">
                            <div className="detail-header" onClick={() => toggleSection('payroll')}>
                                <i className="fas fa-plus"></i>
                                <span> Payroll Details</span>
                            </div>
                            {showSections.payroll && (
                                <div className="detail-content">
                                    <div className="payroll-container">
                                        <div className="payroll-left-column">
                                            <h3>Payroll Information</h3>
                                            {Object.keys(payrollDetails).map((key, index) => (
                                                <div className="payroll-field" key={index}>
                                                    <label>{key.replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase(); })}</label>
                                                    <input
                                                        type="text"
                                                        placeholder={`${key}`}
                                                        value={payrollDetails[key]}
                                                        onChange={(e) => setPayrollDetails(prev => ({ ...prev, [key]: e.target.value }))} />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        {/* Personal Details */}
                        <div className="detail-item">
                            <div className="detail-header" onClick={() => toggleSection('personal')}>
                                <i className="fas fa-plus"></i>
                                <span> Personal Details</span>
                            </div>
                            {showSections.personal && (
                                <div className="detail-content">
                                    <h3>Personal Information</h3>
                                    <div className="personal-details">
                                        <div className="personal-details-left">
                                            {[
                                                { label: "Marital Status", placeholder: "Select Marital Status", type: "select", options: ["Single", "Married", "Divorced", "Widowed"] },
                                                { label: "Title", placeholder: "Enter Title" },
                                                { label: "Blood Group", placeholder: "Enter Blood Group" },
                                                { label: "Original Birth Date", placeholder: "", type: "date" },
                                                { label: "Phone No.", placeholder: "Enter Phone No." },
                                                { label: "Place of Birth", placeholder: "Enter Place of Birth" },
                                                { label: "Nationality", placeholder: "Enter Nationality" },
                                                { label: "Personal Mail-ID", placeholder: "Enter Personal Mail-ID" },
                                            ].map((field, index) => (
                                                <div className="personal-field" key={index}>
                                                    <label>{field.label}</label>
                                                    {field.type === "select" ? (
                                                        <select>
                                                            <option value="">{field.placeholder}</option>
                                                            {field.options.map((option, idx) => (
                                                                <option key={idx} value={option}>{option}</option>
                                                            ))}
                                                        </select>
                                                    ) : (
                                                        <input
                                                            type={field.type || "text"}
                                                            placeholder={field.placeholder}
                                                            value={personalDetails[field.label.toLowerCase().replace(/ /g, '')]} // Map field to state
                                                            onChange={(e) => setPersonalDetails(prev => ({ ...prev, [field.label.toLowerCase().replace(/ /g, '')]: e.target.value }))}
                                                        />
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                        <div className="personal-details-right">
                                            {[
                                                { label: "Employee's Profile Image", placeholder: "Choose Image", type: "file" },
                                                { label: "Aadhaar No.", placeholder: "Enter Aadhaar No." },
                                                { label: "Mother's Name", placeholder: "Enter Mother's Name" },
                                                { label: "Father's Name", placeholder: "Enter Father's Name" },
                                                { label: "Gender", placeholder: "Select Gender", type: "select", options: ["Male", "Female", "Other"] },
                                            ].map((field, index) => (
                                                <div className="personal-field" key={index}>
                                                    <label>{field.label}</label>
                                                    {field.type === "select" ? (
                                                        <select>
                                                            <option value="">{field.placeholder}</option>
                                                            {field.options.map((option, idx) => (
                                                                <option key={idx} value={option}>{option}</option>
                                                            ))}
                                                        </select>
                                                    ) : (
                                                        <input
                                                            type={field.type || "text"}
                                                            placeholder={field.placeholder}
                                                            value={personalDetails[field.label.toLowerCase().replace(/ /g, '')]} // Map field to state
                                                            onChange={(e) => setPersonalDetails(prev => ({ ...prev, [field.label.toLowerCase().replace(/ /g, '')]: e.target.value }))}
                                                        />
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    {/* Submit Button for Basic Details */}
                    <button onClick={handleBasicSubmit} className="submit-button">
                        Submit
                    </button>
                </TabPanel>
                
                <TabPanel>
    <div className="other-details-container">
        <h3>Employee Other Details</h3>
        <div className="other-details-grid">
            {/* Educational Details */}
            <div className="detail-item">
    <div className="detail-header" onClick={() => toggleSection('documents')}>
        <i className="fas fa-plus"></i>
        <span> Educational Details</span>
    </div>
    {showSections.documents && (
        <div className="detail-content">
            {documentFields.map((field, index) => (
                <div key={index} className="document-field">
                    <label>Document Type</label>
                    <input
                        type="text"
                        placeholder="Enter Document Type (e.g., Degree, Diploma)"
                        value={field.documentType}
                        onChange={(e) => {
                            const newFields = [...documentFields];
                            newFields[index].documentType = e.target.value;
                            setDocumentFields(newFields);
                        }}
                    />
                    <label>Document Number</label>
                    <input
                        type="text"
                        placeholder="Enter Document Number (e.g., Enrollment Number)"
                        value={field.documentNumber}
                        onChange={(e) => {
                            const newFields = [...documentFields];
                            newFields[index].documentNumber = e.target.value;
                            setDocumentFields(newFields);
                        }}
                    />
                    <label>Institution Name</label>
                    <input
                        type="text"
                        placeholder="Enter Institution Name"
                        value={field.institutionName}
                        onChange={(e) => {
                            const newFields = [...documentFields];
                            newFields[index].institutionName = e.target.value;
                            setDocumentFields(newFields);
                        }}
                    />
                    <label>Marks</label>
                    <input
                        type="text"
                        placeholder="Enter Marks (e.g., 85%)"
                        value={field.marks}
                        onChange={(e) => {
                            const newFields = [...documentFields];
                            newFields[index].marks = e.target.value;
                            setDocumentFields(newFields);
                        }}
                    />
                    <label>Start Date</label>
                    <input
                        type="date"
                        value={field.startDate}
                        onChange={(e) => {
                            const newFields = [...documentFields];
                            newFields[index].startDate = e.target.value;
                            setDocumentFields(newFields);
                        }}
                    />
                    <label>End Date</label>
                    <input
                        type="date"
                        value={field.endDate}
                        onChange={(e) => {
                            const newFields = [...documentFields];
                            newFields[index].endDate = e.target.value;
                            setDocumentFields(newFields);
                        }}
                    />
                    <label>Upload Document</label>
                    <input
                        type="file"
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        onChange={(e) => {
                            const newFields = [...documentFields];
                            newFields[index].documentFile = e.target.files[0];
                            setDocumentFields(newFields);
                        }}
                    />
                    <button onClick={() => deleteField(setDocumentFields, index)}>
                        <i className="fas fa-trash"></i> Delete
                    </button>
                </div>
            ))}
            <button onClick={() => addField(setDocumentFields, { documentType: '', documentNumber: '', institutionName: '', marks: '', startDate: '', endDate: '', documentFile: null })}>
                <i className="fas fa-plus"></i> Add Educational Detail
            </button>
        </div>
    )}
</div>


            {/* Experience Details */}
           {/* Experience Details */}
<div className="detail-item">
    <div className="detail-header" onClick={() => toggleSection('experience')}>
        <i className="fas fa-plus"></i>
        <span> Experience Details</span>
    </div>
    {showSections.experience && (
        <div className="detail-content">
            {experienceFields.map((field, index) => (
                <div key={index} className="experience-field">
                    <label>Company Name</label>
                    <input
                        type="text"
                        placeholder="Enter Company Name"
                        value={field.company}
                        onChange={(e) => {
                            const newFields = [...experienceFields];
                            newFields[index].company = e.target.value;
                            setExperienceFields(newFields);
                        }}
                    />
                    <label>Position</label>
                    <input
                        type="text"
                        placeholder="Enter Position"
                        value={field.position}
                        onChange={(e) => {
                            const newFields = [...experienceFields];
                            newFields[index].position = e.target.value;
                            setExperienceFields(newFields);
                        }}
                    />
                    <label>Duration</label>
                    <input
                        type="text"
                        placeholder="Enter Duration"
                        value={field.duration}
                        onChange={(e) => {
                            const newFields = [...experienceFields];
                            newFields[index].duration = e.target.value;
                            setExperienceFields(newFields);
                        }}
                    />
                    <label>Institution</label>
                    <input
                        type="text"
                        placeholder="Enter Institution"
                        value={field.institution}
                        onChange={(e) => {
                            const newFields = [...experienceFields];
                            newFields[index].institution = e.target.value;
                            setExperienceFields(newFields);
                        }}
                    />
                    <label>Marks</label>
                    <input
                        type="text"
                        placeholder="Enter Marks"
                        value={field.marks}
                        onChange={(e) => {
                            const newFields = [...experienceFields];
                            newFields[index].marks = e.target.value;
                            setExperienceFields(newFields);
                        }}
                    />
                    <button onClick={() => deleteField(setExperienceFields, index)}>
                        <i className="fas fa-trash"></i> Delete
                    </button>
                </div>
            ))}
            <button onClick={() => addField(setExperienceFields, { company: '', position: '', duration: '', institution: '', marks: '' })}>
                <i className="fas fa-plus"></i> Add Experience
            </button>
        </div>
    )}
</div>


            {/* Family Details */}
            <div className="detail-item">
                <div className="detail-header" onClick={() => toggleSection('family')}>
                    <i className="fas fa-plus"></i>
                    <span> Family Details</span>
                </div>
                {showSections.family && (
                    <div className="detail-content">
                        {familyFields.map((field, index) => (
                            <div key={index} className="family-field">
                                <label>Member Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter Member Name"
                                    value={field.memberName}
                                    onChange={(e) => {
                                        const newFields = [...familyFields];
                                        newFields[index].memberName = e.target.value;
                                        setFamilyFields(newFields);
                                    }}
                                />
                                <label>Relation</label>
                                <input
                                    type="text"
                                    placeholder="Enter Relation"
                                    value={field.relation}
                                    onChange={(e) => {
                                        const newFields = [...familyFields];
                                        newFields[index].relation = e.target.value;
                                        setFamilyFields(newFields);
                                    }}
                                />
                                <button onClick={() => deleteField(setFamilyFields, index)}>
                                    <i className="fas fa-trash"></i> Delete
                                </button>
                            </div>
                        ))}
                        <button onClick={() => addField(setFamilyFields, { memberName: '', relation: '' })}>
                            <i className="fas fa-plus"></i> Add Family Member
                        </button>
                    </div>
                )}
            </div>

            {/* Emergency Contact Details */}
            <div className="detail-item">
                <div className="detail-header" onClick={() => toggleSection('emergencyContact')}>
                    <i className="fas fa-plus"></i>
                    <span> Emergency Contact Details</span>
                </div>
                {showSections.emergencyContact && (
                    <div className="detail-content">
                        {emergencyFields.map((field, index) => (
                            <div key={index} className="emergency-field">
                                <label>Contact Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter Contact Name"
                                    value={field.contactName}
                                    onChange={(e) => {
                                        const newFields = [...emergencyFields];
                                        newFields[index].contactName = e.target.value;
                                        setEmergencyFields(newFields);
                                    }}
                                />
                                <label>Relationship</label>
                                <input
                                    type="text"
                                    placeholder="Enter Relationship"
                                    value={field.relationship}
                                    onChange={(e) => {
                                        const newFields = [...emergencyFields];
                                        newFields[index].relationship = e.target.value;
                                        setEmergencyFields(newFields);
                                    }}
                                />
                                <label>Phone Number</label>
                                <input
                                    type="text"
                                    placeholder="Enter Phone Number"
                                    value={field.phoneNumber}
                                    onChange={(e) => {
                                        const newFields = [...emergencyFields];
                                        newFields[index].phoneNumber = e.target.value;
                                        setEmergencyFields(newFields);
                                    }}
                                />
                                <button onClick={() => deleteField(setEmergencyFields, index)}>
                                    <i className="fas fa-trash"></i> Delete
                                </button>
                            </div>
                        ))}
                        <button onClick={() => addField(setEmergencyFields, { contactName: '', relationship: '', phoneNumber: '' })}>
                            <i className="fas fa-plus"></i> Add Emergency Contact
                        </button>
                    </div>
                )}
            </div>

            {/* Training Details */}
           {/* Training Details */}
<div className="detail-item">
    <div className="detail-header" onClick={() => toggleSection('training')}>
        <i className="fas fa-plus"></i>
        <span> Training Details</span>
    </div>
    {showSections.training && (
        <div className="detail-content">
            {trainingFields.map((field, index) => (
                <div key={index} className="training-field">
                    <label>Training Name</label>
                    <input
                        type="text"
                        placeholder="Enter Training Name"
                        value={field.trainingName}
                        onChange={(e) => {
                            const newFields = [...trainingFields];
                            newFields[index].trainingName = e.target.value;
                            setTrainingFields(newFields);
                        }}
                    />
                    <label>Institution</label>
                    <input
                        type="text"
                        placeholder="Enter Institution"
                        value={field.institution}
                        onChange={(e) => {
                            const newFields = [...trainingFields];
                            newFields[index].institution = e.target.value;
                            setTrainingFields(newFields);
                        }}
                    />
                    <label>Year</label>
                    <input
                        type="text"
                        placeholder="Enter Year"
                        value={field.year}
                        onChange={(e) => {
                            const newFields = [...trainingFields];
                            newFields[index].year = e.target.value;
                            setTrainingFields(newFields);
                        }}
                    />
                    <label>Marks</label>
                    <input
                        type="text"
                        placeholder="Enter Marks"
                        value={field.marks}
                        onChange={(e) => {
                            const newFields = [...trainingFields];
                            newFields[index].marks = e.target.value;
                            setTrainingFields(newFields);
                        }}
                    />
                    <button onClick={() => deleteField(setTrainingFields, index)}>
                        <i className="fas fa-trash"></i> Delete
                    </button>
                </div>
            ))}
            <button onClick={() => addField(setTrainingFields, { trainingName: '', institution: '', year: '', marks: '' })}>
                <i className="fas fa-plus"></i> Add Training
            </button>
        </div>
    )}
</div>

            {/* Certification Details */}
          {/* Certification Details */}
<div className="detail-item">
    <div className="detail-header" onClick={() => toggleSection('certification')}>
        <i className="fas fa-plus"></i>
        <span> Certification Details</span>
    </div>
    {showSections.certification && (
        <div className="detail-content">
            {certificationFields.map((field, index) => (
                <div key={index} className="certification-field">
                    <label>Certification Name</label>
                    <input
                        type="text"
                        placeholder="Enter Certification Name"
                        value={field.certificationName}
                        onChange={(e) => {
                            const newFields = [...certificationFields];
                            newFields[index].certificationName = e.target.value;
                            setCertificationFields(newFields);
                        }}
                    />
                    <label>Issuing Organization</label>
                    <input
                        type="text"
                        placeholder="Enter Issuing Organization"
                        value={field.issuingOrg}
                        onChange={(e) => {
                            const newFields = [...certificationFields];
                            newFields[index].issuingOrg = e.target.value;
                            setCertificationFields(newFields);
                        }}
                    />
                    <label>Year</label>
                    <input
                        type="text"
                        placeholder="Enter Year"
                        value={field.year}
                        onChange={(e) => {
                            const newFields = [...certificationFields];
                            newFields[index].year = e.target.value;
                            setCertificationFields(newFields);
                        }}
                    />
                    <label>Marks</label>
                    <input
                        type="text"
                        placeholder="Enter Marks"
                        value={field.marks}
                        onChange={(e) => {
                            const newFields = [...certificationFields];
                            newFields[index].marks = e.target.value;
                            setCertificationFields(newFields);
                        }}
                    />
                    <button onClick={() => deleteField(setCertificationFields, index)}>
                        <i className="fas fa-trash"></i> Delete
                    </button>
                </div>
            ))}
            <button onClick={() => addField(setCertificationFields, { certificationName: '', issuingOrg: '', year: '', marks: '' })}>
                <i className="fas fa-plus"></i> Add Certification
            </button>
        </div>
    )}
</div>


            {/* Passport Details */}
            <div className="detail-item">
                <div className="detail-header" onClick={() => toggleSection('passport')}>
                    <i className="fas fa-plus"></i>
                    <span> Passport Details</span>
                </div>
                {showSections.passport && (
                    <div className="detail-content">
                        {passportFields.map((field, index) => (
                            <div key={index} className="passport-field">
                                <label>Passport Number</label>
                                <input
                                    type="text"
                                    placeholder="Enter Passport Number"
                                    value={field.passportNumber}
                                    onChange={(e) => {
                                        const newFields = [...passportFields];
                                        newFields[index].passportNumber = e.target.value;
                                        setPassportFields(newFields);
                                    }}
                                />
                                <label>Issued By</label>
                                <input
                                    type="text"
                                    placeholder="Enter Issued By"
                                    value={field.issuedBy}
                                    onChange={(e) => {
                                        const newFields = [...passportFields];
                                        newFields[index].issuedBy = e.target.value;
                                        setPassportFields(newFields);
                                    }}
                                />
                                <label>Expiry Date</label>
                                <input
                                    type="date"
                                    value={field.expiryDate}
                                    onChange={(e) => {
                                        const newFields = [...passportFields];
                                        newFields[index].expiryDate = e.target.value;
                                        setPassportFields(newFields);
                                    }}
                                />
                                <label>Start Date</label>
                                <input
                                    type="date"
                                    value={field.startDate}
                                    onChange={(e) => {
                                        const newFields = [...passportFields];
                                        newFields[index].startDate = e.target.value;
                                        setPassportFields(newFields);
                                    }}
                                />
                                <label>End Date</label>
                                <input
                                    type="date"
                                    value={field.endDate}
                                    onChange={(e) => {
                                        const newFields = [...passportFields];
                                        newFields[index].endDate = e.target.value;
                                        setPassportFields(newFields);
                                    }}
                                />
                                <button onClick={() => deleteField(setPassportFields, index)}>
                                    <i className="fas fa-trash"></i> Delete
                                </button>
                            </div>
                        ))}
                        <button onClick={() => addField(setPassportFields, { passportNumber: '', issuedBy: '', expiryDate: '', startDate: '', endDate: '' })}>
                            <i className="fas fa-plus"></i> Add Passport
                        </button>
                    </div>
                )}
            </div>

            {/* Visa Details */}
            <div className="detail-item">
                <div className="detail-header" onClick={() => toggleSection('visa')}>
                    <i className="fas fa-plus"></i>
                    <span> Visa Details</span>
                </div>
                {showSections.visa && (
                    <div className="detail-content">
                        {visaFields.map((field, index) => (
                            <div key={index} className="visa-field">
                                <label>Visa Number</label>
                                <input
                                    type="text"
                                    placeholder="Enter Visa Number"
                                    value={field.visaNumber}
                                    onChange={(e) => {
                                        const newFields = [...visaFields];
                                        newFields[index].visaNumber = e.target.value;
                                        setVisaFields(newFields);
                                    }}
                                />
                                <label>Issued By</label>
                                <input
                                    type="text"
                                    placeholder="Enter Issued By"
                                    value={field.issuedBy}
                                    onChange={(e) => {
                                        const newFields = [...visaFields];
                                        newFields[index].issuedBy = e.target.value;
                                        setVisaFields(newFields);
                                    }}
                                />
                                <label>Expiry Date</label>
                                <input
                                    type="date"
                                    value={field.expiryDate}
                                    onChange={(e) => {
                                        const newFields = [...visaFields];
                                        newFields[index].expiryDate = e.target.value;
                                        setVisaFields(newFields);
                                    }}
                                />
                                <label>Start Date</label>
                                <input
                                    type="date"
                                    value={field.startDate}
                                    onChange={(e) => {
                                        const newFields = [...visaFields];
                                        newFields[index].startDate = e.target.value;
                                        setVisaFields(newFields);
                                    }}
                                />
                                <label>End Date</label>
                                <input
                                    type="date"
                                    value={field.endDate}
                                    onChange={(e) => {
                                        const newFields = [...visaFields];
                                        newFields[index].endDate = e.target.value;
                                        setVisaFields(newFields);
                                    }}
                                />
                                <button onClick={() => deleteField(setVisaFields, index)}>
                                    <i className="fas fa-trash"></i> Delete
                                </button>
                            </div>
                        ))}
                        <button onClick={() => addField(setVisaFields, { visaNumber: '', issuedBy: '', expiryDate: '', startDate: '', endDate: '' })}>
                            <i className="fas fa-plus"></i> Add Visa
                        </button>
                    </div>
                )}
            </div>

            {/* Language Details */}
            <div className="detail-item">
                <div className="detail-header" onClick={() => toggleSection('languages')}>
                    <i className="fas fa-plus"></i>
                    <span> Language Details</span>
                </div>
                {showSections.languages && (
                    <div className="detail-content">
                        {languageFields.map((field, index) => (
                            <div key={index} className="language-field">
                                <label>Language</label>
                                <input
                                    type="text"
                                    placeholder="Enter Language"
                                    value={field.language}
                                    onChange={(e) => {
                                        const newFields = [...languageFields];
                                        newFields[index].language = e.target.value;
                                        setLanguageFields(newFields);
                                    }}
                                />
                                <label>Proficiency</label>
                                <input
                                    type="text"
                                    placeholder="Enter Proficiency"
                                    value={field.proficiency}
                                    onChange={(e) => {
                                        const newFields = [...languageFields];
                                        newFields[index].proficiency = e.target.value;
                                        setLanguageFields(newFields);
                                    }}
                                />
                                <button onClick={() => deleteField(setLanguageFields, index)}>
                                    <i className="fas fa-trash"></i> Delete
                                </button>
                            </div>
                        ))}
                        <button onClick={() => addField(setLanguageFields, { language: '', proficiency: '' })}>
                            <i className="fas fa-plus"></i> Add Language
                        </button>
                    </div>
                )}
            </div>
        </div>
    </div>
    {/* Submit Button for Other Details */}
    <button onClick={handleOtherSubmit} className="submit-button">
        Submit
    </button>
</TabPanel>

            </Tabs>
        </div>
    );
};
export default EmployeeDetails;