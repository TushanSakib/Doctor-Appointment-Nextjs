"use client";
import GlobalAPI from '@/app/_utils/GlobalAPI';
import React, { useEffect, useState } from 'react';
import DoctorDetail from '../_components/DoctorDetail';

export default function Details({ params }) {
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const resp = await GlobalAPI.getDoctorById(params.recordId);
        setDoctor(resp.data.data);
      } catch (error) {
        console.error('Error fetching doctor details:', error);
      }
    };

    fetchDoctor();
  }, [params.recordId]);

  return (
    <div className='p-5 md:px-20'>
      <h2 className='font-bold text-[22px]'>Details</h2>
      <div className='grid grid-cols-1 md:grid-cols-4'>
        <div className='col-span-3'>
          {doctor ? <DoctorDetail doctor={doctor} /> : <p>Loading...</p>}
        </div>
  
        <div>
          {/* Additional content can go here */}
          
        </div>
      </div>
    </div>
  );
}
