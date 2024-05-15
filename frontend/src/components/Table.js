import React from 'react'
import { useState, useEffect, } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../constants/constants.js'

const Table = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([])

    useEffect(() => {
      const requestData = async () => {
          try {
              const response = await axios.get(`${BASE_URL}/rolllist`, {
                  
              })
              if (response.status === 200) {
                  setData(response.data.student_numbers)
                  console.log(response.data);
              }
          } catch (error) {
              console.log(error)
          }
      }
      requestData()
  }, [])
  return (
    <>
      <div className="container-table">
                <ul className="responsive-table">
                    <li className="table-header">
                        <div className="col mcol-1">Sr no</div>
                        <div className="col mcol-2">Student Roll Number</div>
                        <div>Progress</div>
                    </li>
                    {data.map((item, index) => {
                        return (
                            <li className="table-row" key={index}>
                                <div className="col mcol-1">{index + 1}</div>
                                <div className="col mcol-2">{item}</div>
                                <button data-label="Status" style={{borderColor:"white"}} onClick={() => navigate('/graph', { state: { roll_number: item } })}>View</button>
                            </li>
                        )
                    })}                    
                </ul>
            </div>
    </>
  )
}

export default Table