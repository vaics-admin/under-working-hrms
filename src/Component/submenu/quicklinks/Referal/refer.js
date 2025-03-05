import React, { useState } from 'react';
import './ReferAFriend.css';

const countries = [
  { code: 'US', name: 'United States', dialCode: '+1' },
  { code: 'IN', name: 'India', dialCode: '+91' },
  { code: 'CA', name: 'Canada', dialCode: '+1' },
  { code: 'GB', name: 'United Kingdom', dialCode: '+44' },
  // Add more countries as needed
];

const skills = [
  'JavaScript',
  'Python',
  'React',
  'Node.js',
  'Java',
  'Ruby on Rails',
  'Django',
  'C++',
  'C#',
  // Add more skills as needed
];

const getFlagUrl = (countryCode) => `https://flagcdn.com/w320/${countryCode.toLowerCase()}.png`;

const ReferAFriend = () => {
  const [fullName, setFullName] = useState('');
  const [friendEmail, setFriendEmail] = useState('');
  const [friendMobile, setFriendMobile] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('US');
  const [primarySkill, setPrimarySkill] = useState('');
  const [consent, setConsent] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  const handleFullNameChange = (e) => setFullName(e.target.value);
  const handleEmailChange = (e) => setFriendEmail(e.target.value);
  const handleMobileChange = (e) => setFriendMobile(e.target.value);
  const handleCountryChange = (e) => setSelectedCountry(e.target.value);
  const handleSkillChange = (e) => setPrimarySkill(e.target.value);
  const handleConsentChange = (e) => setConsent(e.target.checked);

  // Validate form inputs
  const validateForm = () => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const mobilePattern = /^[0-9]{10}$/;

    if (!fullName) {
      setMessage('Full name is required.');
      return false;
    }

    if (!emailPattern.test(friendEmail)) {
      setMessage('Please enter a valid email address.');
      return false;
    }

    if (!mobilePattern.test(friendMobile)) {
      setMessage('Please enter a valid mobile number.');
      return false;
    }

    if (!primarySkill) {
      setMessage('Please select a primary skill.');
      return false;
    }

    if (!consent) {
      setMessage('You must agree to refer the candidate.');
      return false;
    }

    return true;
  };

  const handleReferralSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError(false);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    // Simulate API call (use your actual API here)
    try {
      const response = await fetch('/api/refer-friend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName,
          email: friendEmail,
          mobile: friendMobile,
          country: selectedCountry,
          primarySkill,
        }),
      });

      if (response.ok) {
        setPopupMessage('Referral sent successfully! Thank you for referring.');
        setShowPopup(true);
        setFullName('');
        setFriendEmail('');
        setFriendMobile('');
        setPrimarySkill('');
        setConsent(false);
      } else {
        setError(true);
        setPopupMessage('Failed to send referral. Please try again later.');
        setShowPopup(true);
      }
    } catch (error) {
      setError(true);
      setPopupMessage('Something went wrong. Please check your internet connection or try again later.');
      setShowPopup(true);
    }

    setLoading(false);
  };

  return (
    <div className="refer-a-friend">
      <h2>Refer a Friend</h2>
      <form onSubmit={handleReferralSubmit} className="refer-form">
        <div className="form-group">
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={handleFullNameChange}
            placeholder="Enter your friend's full name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="friendEmail">Friend's Email:</label>
          <input
            type="email"
            id="friendEmail"
            value={friendEmail}
            onChange={handleEmailChange}
            placeholder="Enter your friend's email"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="friendMobile">Friend's Mobile Number:</label>
          <div className="mobile-wrapper">
            <select
              value={selectedCountry}
              onChange={handleCountryChange}
              className="country-code"
            >
              {countries.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.name} ({country.dialCode})
                </option>
              ))}
            </select>
            <input
              type="tel"
              id="friendMobile"
              value={friendMobile}
              onChange={handleMobileChange}
              placeholder="Enter your friend's mobile number"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="primarySkill">Primary Skill Set:</label>
          <select
            id="primarySkill"
            value={primarySkill}
            onChange={handleSkillChange}
            required
          >
            <option value="">Select Primary Skill</option>
            {skills.map((skill, index) => (
              <option key={index} value={skill}>
                {skill}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group consent-checkbox">
          <label>
            <input
              type="checkbox"
              checked={consent}
              onChange={handleConsentChange}
              required
              style={{width:'30px'}}
            />
            I agree to refer this candidate.
          </label>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Sending...' : 'Send Referral'}
        </button>
      </form>

      {message && (
        <p className={error ? 'error-message' : 'success-message'}>{message}</p>
      )}

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>{popupMessage}</h3>
            <button onClick={() => setShowPopup(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReferAFriend;
