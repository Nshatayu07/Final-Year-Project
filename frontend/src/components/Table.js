import React from 'react'
import { useState, useEffect, } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Table = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([])

    useEffect(() => {
      const requestData = async () => {
          try {
              const response = await axios.get('http://localhost:5000/getStudents', {
                  
              })
              if (response.status === 200) {
                  setData(response.data.data)
                  console.log(response.data.data);
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
                        <div className="col mcol-2">Student prn</div>
                        <div>Progress</div>
                    </li>
                    {data.map((item, index) => {
                        return (
                            <li className="table-row" key={index}>
                                <div className="col mcol-1" data-label="Sr no">{index + 1}</div>
                                <div className="col mcol-2" data-label="Company Name">{item.orgName}</div>
                            </li>
                        )
                    })}
                   <li>
                   <button data-label="Status" style={{borderColor:"white"}}>Show progress</button>
                   </li>
                    
                </ul>
            </div>
    </>
  )
}

export default Table