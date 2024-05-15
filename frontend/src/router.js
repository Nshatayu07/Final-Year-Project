import React from 'react'
import { Routes, Route } from 'react-router-dom'
// import Upload from './components/upload.js'
import Graph from './components/graph.js'
import Table from './components/Table.js'

const Router = () => {
  return (
    <>
    <Routes>
        <Route path="/" element={<Table />} />
        <Route path="/graph" element={<Graph />} />
    </Routes>
    </>
  )
}

export default Router