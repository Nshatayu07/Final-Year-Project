import React from 'react'
// import { useState, useEffect, } from 'react';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

const Table = () => {
    const navigate = useNavigate();
  return (
    <>
      <div className="container-table">
                <ul className="responsive-table">
                    <li className="table-header">
                        <div className="col mcol-1">Sr no</div>
                        <div className="col mcol-2">Student prn</div>
                        <div>Progress</div>
                    </li>
                        <li className="table-row">
                                <div className="col mcol-1" data-label="Sr no">1</div>
                                <div className="col mcol-2" data-label="Student prn">2020bteit00031</div>
                                <button data-label="Status" style={{borderColor:"white"}}>Show progress</button>
                    </li>
                    <li className="table-row">
                                <div className="col mcol-1" data-label="Sr no">2</div>
                                <div className="col mcol-2" data-label="Student prn">2020bteit00055</div>
                                <button data-label="Status" style={{borderColor:"white"}}>Show progress</button>
                    </li>

                    
                </ul>
            </div>
    </>
  )
}

export default Table