import React, { useState } from 'react';
import './EmployeeDetails.css';

const EmployeeDetails = () => {
    const [currentStep, setCurrentStep] = useState(0);

    const [employmentInfo, setEmploymentInfo] = useState({
        name: '',
        gender: '',
        location: '',
        department: '',
        division: '',
        designation: '',
        category: '',
        employeeType: '',
    });

    const [documentFields, setDocumentFields] = useState([{ documentType: '', institutionName: '', marks: '', startDate: '', endDate: '' }]);
    const [experienceFields, setExperienceFields] = useState([{ company: '', position: '', duration: '' }]);
    const [familyFields, setFamilyFields] = useState([{ memberName: '', relation: '' }]);
    const [emergencyFields, setEmergencyFields] = useState([{ contactName: '', relationship: '', phoneNumber: '' }]);
    const [trainingFields, setTrainingFields] = useState([{ trainingName: '', institution: '', year: '', marks: '' }]);
    const [certificationFields, setCertificationFields] = useState([{ certificationName: '', issuingOrg: '', year: '', marks: '' }]);
    const [passportFields, setPassportFields] = useState([{ passportNumber: '', issuedBy: '', expiryDate: '', startDate: '', endDate: '' }]);
    const [visaFields, setVisaFields] = useState([{ visaNumber: '', issuedBy: '', expiryDate: '', startDate: '', endDate: '' }]);
    const [languageFields, setLanguageFields] = useState([{ language: '', proficiency: '' }]);

    const sections = [
        { title: 'Employment Information', content: employmentForm() },
        { title: 'Educational Details', content: educationalForm() },
        { title: 'Experience Details', content: experienceForm() },
        { title: 'Family Details', content: familyForm() },
        { title: 'Emergency Contact Details', content: emergencyContactForm() },
        { title: 'Training Details', content: trainingForm() },
        { title: 'Certification Details', content: certificationForm() },
        { title: 'Passport Details', content: passportForm() },
        { title: 'Visa Details', content: visaForm() },
        { title: 'Language Details', content: languageForm() },
    ];

    function employmentForm() {
        return (
            <div className="form-section">
                {Object.entries(employmentInfo).map(([key, value]) => (
                    <div className="form-group" key={key}>
                        <label>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                        <input
                            type="text"
                            value={value}
                            onChange={(e) => setEmploymentInfo({ ...employmentInfo, [key]: e.target.value })}
                        />
                    </div>
                ))}
            </div>
        );
    }

    function educationalForm() {
        return (
            <div className="form-section">
                {documentFields.map((field, index) => (
                    <div key={index} className="form-group">
                        <label>Document Type</label>
                        <input
                            type="text"
                            value={field.documentType}
                            onChange={(e) => {
                                const newFields = [...documentFields];
                                newFields[index].documentType = e.target.value;
                                setDocumentFields(newFields);
                            }}
                        />
                        <label>Institution Name</label>
                        <input
                            type="text"
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
                            value={field.marks}
                            onChange={(e) => {
                                const newFields = [...documentFields];
                                newFields[index].marks = e.target.value;
                                setDocumentFields(newFields);
                            }}
                        />
                        <button type="button" onClick={() => deleteField(setDocumentFields, index)}>Delete</button>
                    </div>
                ))}
                <button type="button" onClick={() => addField(setDocumentFields, { documentType: '', institutionName: '', marks: '', startDate: '', endDate: '' })}>Add Educational Detail</button>
                <button type="button" onClick={() => handleSectionSubmit('documents')}>Submit Educational Info</button>
            </div>
        );
    }

    function experienceForm() {
        return (
            <div className="form-section">
                {experienceFields.map((field, index) => (
                    <div key={index} className="form-group">
                        <label>Company Name</label>
                        <input
                            type="text"
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
                            value={field.duration}
                            onChange={(e) => {
                                const newFields = [...experienceFields];
                                newFields[index].duration = e.target.value;
                                setExperienceFields(newFields);
                            }}
                        />
                        <button type="button" onClick={() => deleteField(setExperienceFields, index)}>Delete</button>
                    </div>
                ))}
                <button type="button" onClick={() => addField(setExperienceFields, { company: '', position: '', duration: '' })}>Add Experience</button>
                <button type="button" onClick={() => handleSectionSubmit('experience')}>Submit Experience Info</button>
            </div>
        );
    }

    function familyForm() {
        return (
            <div className="form-section">
                {familyFields.map((field, index) => (
                    <div key={index} className="form-group">
                        <label>Member Name</label>
                        <input
                            type="text"
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
                            value={field.relation}
                            onChange={(e) => {
                                const newFields = [...familyFields];
                                newFields[index].relation = e.target.value;
                                setFamilyFields(newFields);
                            }}
                        />
                        <button type="button" onClick={() => deleteField(setFamilyFields, index)}>Delete</button>
                    </div>
                ))}
                <button type="button" onClick={() => addField(setFamilyFields, { memberName: '', relation: '' })}>Add Family Member</button>
                <button type="button" onClick={() => handleSectionSubmit('family')}>Submit Family Info</button>
            </div>
        );
    }

    function emergencyContactForm() {
        return (
            <div className="form-section">
                {emergencyFields.map((field, index) => (
                    <div key={index} className="form-group">
                        <label>Contact Name</label>
                        <input
                            type="text"
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
                            value={field.phoneNumber}
                            onChange={(e) => {
                                const newFields = [...emergencyFields];
                                newFields[index].phoneNumber = e.target.value;
                                setEmergencyFields(newFields);
                            }}
                        />
                        <button type="button" onClick={() => deleteField(setEmergencyFields, index)}>Delete</button>
                    </div>
                ))}
                <button type="button" onClick={() => addField(setEmergencyFields, { contactName: '', relationship: '', phoneNumber: '' })}>Add Emergency Contact</button>
                <button type="button" onClick={() => handleSectionSubmit('emergencyContacts')}>Submit Emergency Contacts</button>
            </div>
        );
    }

    function trainingForm() {
        return (
            <div className="form-section">
                {trainingFields.map((field, index) => (
                    <div key={index} className="form-group">
                        <label>Training Name</label>
                        <input
                            type="text"
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
                            value={field.marks}
                            onChange={(e) => {
                                const newFields = [...trainingFields];
                                newFields[index].marks = e.target.value;
                                setTrainingFields(newFields);
                            }}
                        />
                        <button type="button" onClick={() => deleteField(setTrainingFields, index)}>Delete</button>
                    </div>
                ))}
                <button type="button" onClick={() => addField(setTrainingFields, { trainingName: '', institution: '', year: '', marks: '' })}>Add Training</button>
                <button type="button" onClick={() => handleSectionSubmit('training')}>Submit Training Info</button>
            </div>
        );
    }

    function certificationForm() {
        return (
            <div className="form-section">
                {certificationFields.map((field, index) => (
                    <div key={index} className="form-group">
                        <label>Certification Name</label>
                        <input
                            type="text"
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
                            value={field.marks}
                            onChange={(e) => {
                                const newFields = [...certificationFields];
                                newFields[index].marks = e.target.value;
                                setCertificationFields(newFields);
                            }}
                        />
                        <button type="button" onClick={() => deleteField(setCertificationFields, index)}>Delete</button>
                    </div>
                ))}
                <button type="button" onClick={() => addField(setCertificationFields, { certificationName: '', issuingOrg: '', year: '', marks: '' })}>Add Certification</button>
                <button type="button" onClick={() => handleSectionSubmit('certification')}>Submit Certification Info</button>
            </div>
        );
    }

    function passportForm() {
        return (
            <div className="form-section">
                {passportFields.map((field, index) => (
                    <div key={index} className="form-group">
                        <label>Passport Number</label>
                        <input
                            type="text"
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
                            value={field.issuedBy}
                            onChange={(e) => {
                                const newFields = [...passportFields];
                                newFields[index].issuedBy = e.target.value;
                                setPassportFields(newFields);
                            }}
                        />
                        <label>Expiration Date</label>
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
                        <button type="button" onClick={() => deleteField(setPassportFields, index)}>Delete</button>
                    </div>
                ))}
                <button type="button" onClick={() => addField(setPassportFields, { passportNumber: '', issuedBy: '', expiryDate: '', startDate: '', endDate: '' })}>Add Passport</button>
                <button type="button" onClick={() => handleSectionSubmit('passport')}>Submit Passport Info</button>
            </div>
        );
    }

    function visaForm() {
        return (
            <div className="form-section">
                {visaFields.map((field, index) => (
                    <div key={index} className="form-group">
                        <label>Visa Number</label>
                        <input
                            type="text"
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
                            value={field.issuedBy}
                            onChange={(e) => {
                                const newFields = [...visaFields];
                                newFields[index].issuedBy = e.target.value;
                                setVisaFields(newFields);
                            }}
                        />
                        <label>Expiration Date</label>
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
                        <button type="button" onClick={() => deleteField(setVisaFields, index)}>Delete</button>
                    </div>
                ))}
                <button type="button" onClick={() => addField(setVisaFields, { visaNumber: '', issuedBy: '', expiryDate: '', startDate: '', endDate: '' })}>Add Visa</button>
                <button type="button" onClick={() => handleSectionSubmit('visa')}>Submit Visa Info</button>
            </div>
        );
    }

    function languageForm() {
        return (
            <div className="form-section">
                {languageFields.map((field, index) => (
                    <div key={index} className="form-group">
                        <label>Language</label>
                        <input
                            type="text"
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
                            value={field.proficiency}
                            onChange={(e) => {
                                const newFields = [...languageFields];
                                newFields[index].proficiency = e.target.value;
                                setLanguageFields(newFields);
                            }}
                        />
                        <button type="button" onClick={() => deleteField(setLanguageFields, index)}>Delete</button>
                    </div>
                ))}
                <button type="button" onClick={() => addField(setLanguageFields, { language: '', proficiency: '' })}>Add Language</button>
                <button type="button" onClick={() => handleSectionSubmit('languages')}>Submit Language Info</button>
            </div>
        );
    }

    const deleteField = (setFields, index) => {
        setFields((prevFields) => prevFields.filter((_, i) => i !== index));
    };

    const addField = (setFields, newField) => {
        setFields((prevFields) => [...prevFields, newField]);
    };

    const handleSectionSubmit = (sectionName) => {
        console.log(`Submitting ${sectionName}:`, { employmentInfo, documentFields, experienceFields, familyFields, emergencyFields, trainingFields, certificationFields, passportFields, visaFields, languageFields });
        // API call for section submission can be implemented here
    };

    const handleFinalSubmit = (event) => {
        event.preventDefault();
        const employeeData = {
            employmentInfo,
            documents: documentFields,
            experience: experienceFields,
            family: familyFields,
            emergencyContacts: emergencyFields,
            training: trainingFields,
            certifications: certificationFields,
            passports: passportFields,
            visas: visaFields,
            languages: languageFields,
        };
        
        console.log('Submitting All Data:', employeeData);
        // API call for final submission can be implemented here
    };

    return (
        <div className="employee-details-container">
            <h1>Employee Details</h1>
            <div className="navigation-sidebar">
                {sections.map((section, index) => (
                    <div key={index} className={`nav-item ${currentStep === index ? 'active' : ''}`} onClick={() => setCurrentStep(index)}>
                        {section.title}
                    </div>
                ))}
            </div>
            <form onSubmit={handleFinalSubmit}>
                <div className="form-content">
                    {sections[currentStep].content}

                    <div className="form-navigation">
                        {currentStep > 0 && <button type="button" className="nav-button" onClick={() => setCurrentStep(currentStep - 1)}>Previous</button>}
                        {currentStep < sections.length - 1 ? (
                            <button type="button" className="nav-button" onClick={() => setCurrentStep(currentStep + 1)}>Next</button>
                        ) : (
                            <button type="submit" className="nav-button">Submit All Details</button>
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
};

export default EmployeeDetails;
