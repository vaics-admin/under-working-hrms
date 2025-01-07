import React, { useState } from 'react';
import axios from 'axios';

const ProfilePictureUpload = () => {
    const [file, setFile] = useState(null); // Stores the selected file
    const [username, setUsername] = useState('');
    const [previewUrl, setPreviewUrl] = useState(''); // Stores the image preview URL

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);

        // Create a preview URL for the selected file
        const objectUrl = URL.createObjectURL(selectedFile);
        setPreviewUrl(objectUrl);
    };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('profile_picture', file);
        formData.append('username', username);

        try {
            const response = await axios.post('http://localhost:3001/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert(response.data);
        } catch (error) {
            console.error('There was an error uploading the file!', error);
        }
    };

    const handleReupload = () => {
        // Reset the file and preview
        setFile(null);
        setPreviewUrl('');
        
        // Clear the file input field manually by getting the file input element
        const fileInput = document.getElementById('profile_picture');
        fileInput.value = ''; // Clear the file input
    };

    return (
        <>
            <style>{`
                body {
                    margin: 0;
                    font-family: Arial, sans-serif;
                    background: linear-gradient(to right, #f8f9fa, #e9ecef);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                }

                .upload-container {
                    background: white;
                    border-radius: 8px;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                    padding: 30px;
                    width: 100%;
                    max-width: 500px;
                    margin: 20px;
                }

                .upload-form {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }

                .form-item {
                    display: flex;
                    flex-direction: column;
                }

                .form-label {
                    font-size: 16px;
                    margin-bottom: 8px;
                    color: #333;
                }

                .form-input {
                    padding: 10px;
                    font-size: 14px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    width: 100%;
                    margin-bottom: 15px;
                }

                .submit-button {
                    background-color: #28a745;
                    color: white;
                    font-size: 16px;
                    padding: 12px;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    transition: background-color 0.3s ease;
                    width: 100%;
                }

                .submit-button:hover {
                    background-color: #218838;
                }

                .image-preview-container {
                    display: flex;
                    justify-content: center;
                    margin-top: 20px;
                }

                .image-preview {
                    width: 150px;
                    height: 150px;
                    object-fit: cover;
                    border-radius: 50%;
                    border: 2px solid #007bff;
                }

                .reupload-button {
                    background-color: #ff6347;
                    color: white;
                    font-size: 14px;
                    padding: 8px;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    width: 100%;
                    margin-top: 10px;
                    transition: background-color 0.3s ease;
                }

                .reupload-button:hover {
                    background-color: #e53e31;
                }

                @media (max-width: 768px) {
                    .upload-container {
                        width: 90%;
                        padding: 20px;
                    }

                    .form-input {
                        font-size: 16px;
                    }

                    .submit-button {
                        font-size: 18px;
                    }
                }
            `}</style>

            <div className="upload-container">
                <form onSubmit={handleSubmit} className="upload-form">
                    <div className="form-item">
                        <label htmlFor="username" className="form-label">
                            Username:
                            <input
                                id="username"
                                type="text"
                                value={username}
                                onChange={handleUsernameChange}
                                required
                                className="form-input"
                            />
                        </label>
                    </div>
                    <div className="form-item">
                        <label htmlFor="profile_picture" className="form-label">
                            Upload Profile Picture:
                            <input
                                id="profile_picture"
                                type="file"
                                onChange={handleFileChange}
                                required
                                className="form-input"
                            />
                        </label>
                    </div>

                    {previewUrl && (
                        <div className="image-preview-container">
                            <img src={previewUrl} alt="Profile Preview" className="image-preview" />
                        </div>
                    )}

                    {previewUrl && (
                        <button type="button" className="reupload-button" onClick={handleReupload}>
                            Re-upload
                        </button>
                    )}

                    <button type="submit" className="submit-button">
                        Upload
                    </button>
                </form>
            </div>
        </>
    );
};

export default ProfilePictureUpload;
