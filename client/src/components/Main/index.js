import React from 'react'
import {BrowserRouter} from "react-router-dom";
import Form from './Form'


export default function Main() {
  return (
    <div className="main">
      <BrowserRouter>
      <Form />
      </BrowserRouter>
    </div>
  )
}
