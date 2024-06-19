"use client"
import { Button } from "@/components/ui/button"
import Hero from "./_components/Hero";
import CategorySearch from "./_components/CategorySearch";
import DoctorList from "./_components/DoctorList";
import GlobalAPI from "./_utils/GlobalAPI";
import { useEffect, useState } from "react";

export default function Home() {
  const[doctorList,setDoctorList] = useState([])

  useEffect(()=>{
    getDoctorLists()
  },[])

  const getDoctorLists = ()=>{
    GlobalAPI.getDoctorList().then(resp=>{
      setDoctorList(resp.data.data)
    })
  }

  return (
   <>
    <Hero/>

    <CategorySearch doctorList = {doctorList}/>

    <DoctorList doctorList={doctorList} />
   </>
  );
}
