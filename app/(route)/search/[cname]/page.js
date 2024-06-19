"use client"
import DoctorList from '@/app/_components/DoctorList'
import GlobalAPI from '@/app/_utils/GlobalAPI'
import React, { useEffect, useState } from 'react'

export default function Search({params}) {
  const[doctorList,setDoctorList] = useState([])
  useEffect(()=>{
    getDoctors()
  },[])

  const getDoctors = ()=>{
    GlobalAPI.getDoctorByCategory(params.cname).then(resp=>{
      setDoctorList(resp.data.data)
    })
  }
  return (
    <div className='mt-5'>
      <DoctorList heading={params.cname} doctorList={doctorList} />
    </div>
  )
}
