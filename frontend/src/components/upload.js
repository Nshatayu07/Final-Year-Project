import React from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../constants/constants.js'


const Upload = () => {
    const navigate = useNavigate();
    const [testCode, setName] = React.useState('');
    const [file, setFile] = React.useState('');

    const HandleFile = (e) => {
        setFile(e.target.files[0]);
    }

    const HandleName = (e) => {
        setName(e.target.value);
    }

    const submitButton = async () => {
        try {
            console.log("hehehehe");
            if (testCode === '') {
                alert('Enter test code');
                return;
            }
            if (file === '') {
                alert('Upload file');
                return;
            }
            const formData = new FormData();
            formData.append('file', file);
            formData.append('test_code', testCode);

            document.querySelector('.App').style.opacity = '0.5';
            document.querySelector('.loader').style.display = 'block';

            const res = await axios.post(`${BASE_URL}/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            document.querySelector('.loader').style.display = 'none';
            document.querySelector('.App').style.opacity = '1';

            if (res.status === 200) {
                alert('File uploaded successfully');
                navigate('/Table', { state: { data: res.data, code: testCode } });
            }
        }
        catch (e) {
            document.querySelector('.loader').style.display = 'none';
            document.querySelector('.App').style.opacity = '1';
            console.log(e);
            if (e.response.status === 400 && e.response.data.message === 'Test already exists') {
                alert('Test already exists');
            }
        }
    }

    return (
        <>
            <div className='Header'>
                <h2>Performance Analysis</h2>
            </div>
            {/* insert loading spinner */}
            <div className="loader"></div>
            <div className='App'>
                <div className="Auth-form-container">
                    <div className="Auth-form mt-0 mb-5">
                        <div className="Auth-form-content">
                            <h3 className="Auth-form-title">Upload file</h3>
                            <div className="form-group mt-4">
                                <label>Unique Test Code</label>
                                <input
                                    type="text"
                                    className="form-control mt-1"
                                    placeholder="Enter unique code"
                                    value={testCode}
                                    onChange={HandleName}
                                />
                            </div>
                            <div className="form-group mt-3">
                                <label>Upload file</label>
                                <input
                                    type="file"
                                    className="form-control mt-1"
                                    placeholder="choose file"
                                    onChange={HandleFile}
                                    accept=".csv"
                                />
                            </div>
                            <div className="d-grid gap-2 mt-5">
                                <input type="submit" className="btn btn-primary" value="submit" onClick={() => submitButton()} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Upload