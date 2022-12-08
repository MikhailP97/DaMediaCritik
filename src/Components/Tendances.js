import React, { Component } from 'react'

export default class Tendances extends Component {
    render() {
      return(
        <>
        <div className=" mt-5 relative flex py-5 items-center">
        <div className="flex-grow border-t ml-20 border-amber-50"></div>
        <span className="flex-shrink my-10 mx-4 text-amber-50 text-2xl font-bold">Tendances</span>
        <div className="flex-grow border-t mr-20 border-amber-50"></div>
    </div>
        <p>Code ici....</p>
        </>
      )
    }
  }