import GlobalAPI from '@/app/_utils/GlobalAPI';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { GraduationCap } from 'lucide-react';
import Link from 'next/link';

export default function DoctorSuggestionList({doctorId}) {
  const [doctorList, setDoctorList] = useState([]);

  useEffect(() => {
    getDoctorLists();
  }, []);

  const getDoctorLists = () => {
    GlobalAPI.getDoctorList().then(resp => {
      setDoctorList(resp.data.data);
    });
  };
  const filteredDoctorList = doctorList.filter(doc=>doc.id !== doctorId)

  return (
    <div className='overflow-y-auto max-h-[800px]'>
      {filteredDoctorList.map((doctor, index) => {
        const imageUrl = doctor.attributes.Image?.data?.attributes?.url;
        const fullImageUrl = imageUrl ? `http://127.0.0.1:1337${imageUrl}` : '/default-doctor.png'; // Fallback image

        return (
          <Link href={`/details/${doctor.id}`} key={index}>
          <div key={index} className='mb-6 flex items-center border border-gray-200 rounded-lg p-4'>
            <div className='relative w-16 h-16'>
              <Image src={fullImageUrl} alt="doctor-image" width={200} height={200} className=' rounded-md ' />
            </div>
            <div className='ml-4'>
              <h1 className='font-bold text-lg'>{doctor.attributes.Name}</h1>
              <div className='flex items-center mt-1'>
                <GraduationCap size={18} className='mr-2' />
                <span className='text-gray-600'>{doctor.attributes.Year_of_Experience} Years of Experience</span>
              </div>
              <div className='text-sm text-blue-700 bg-blue-100 px-2 py-1 rounded-full mt-1'>
                {doctor.attributes?.category?.data?.attributes?.Name}
              </div>
            </div>
          </div>
          </Link>
        );
      })}
    </div>
  );
}