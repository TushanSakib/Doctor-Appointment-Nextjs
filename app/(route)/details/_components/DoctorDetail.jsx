import { GraduationCap, MapPin } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { FaSquareYoutube } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { ImFacebook2 } from "react-icons/im";
import { FaSquareXTwitter } from "react-icons/fa6";
import DoctorSuggestionList from './DoctorSuggestionList';
import BookAppointment from './BookAppointment';

export default function DoctorDetail({ doctor }) {
  // Check if the doctor data is available and has the necessary attributes
  const imageUrl = doctor?.attributes?.Image?.data?.attributes?.url;
  const fullImageUrl = imageUrl ? `http://127.0.0.1:1337${imageUrl}` : '/default-doctor.png'; // Fallback image

  return (
    <div className='flex flex-col md:flex-row gap-8 w-full'>
      {/* Doctor Details Section */}
      <div className='flex-grow border p-5 mt-5 rounded-lg'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <div>
            {imageUrl ? (
              <Image src={fullImageUrl} alt="doctor-image" width={200} height={200} className='rounded-lg h-[270px] object-cover' />
            ) : (
              <Image src="/default-doctor.png" alt="Default Doctor" width={200} height={200} />
            )}
          </div>
          <div className='col-span-2 mt-5 flex flex-col gap-3'>
            <h2 className='font-bold text-2xl'>{doctor.attributes.Name}</h2>
            <div className='flex items-center gap-2 text-gray-500 text-md'>
              <GraduationCap />
              <span>{doctor.attributes.Year_of_Experience} Years of Experience</span>
            </div>
            <div className='flex items-center gap-2 text-gray-500'>
              <MapPin />
              <span>{doctor.attributes.Address}</span>
            </div>
            <div className='text-xs bg-blue-100 p-1 rounded-full px-2 text-primary'>
              {doctor.attributes?.category.data.attributes.Name}
            </div>
            <div className='flex gap-3'>
              <FaSquareYoutube className='text-red-500 w-6 h-6 rounded-lg' />
              <FaLinkedin className='text-blue-500 w-6 h-6 rounded-lg' />
              <ImFacebook2 className='text-blue-500 w-6 h-6 rounded-lg' />
              <FaSquareXTwitter className='text-blue-500 w-6 h-6 rounded-lg' />
            </div>
            <BookAppointment doctor={doctor} />
          </div>
        </div>

        {/* About Me Section */}
        <div className='p-3 border rounded-lg mt-5'>
          <h2 className='font-bold text-lg mb-2'>About Me</h2>
          {doctor.attributes?.About?.map((aboutItem, index) => (
            <div key={index}>
              {aboutItem.children?.map((child, childIndex) => (
                <p key={childIndex} className='text-gray-500 tracking-wide mt-1'>{child.text}</p>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Doctor Suggestion List Section */}
      <div className='w-full md:w-[30%] p-3 border rounded-lg mt-5'>
        <h2 className='font-bold text-lg mb-2'>Other Doctors</h2>
        <DoctorSuggestionList doctorId={doctor.id} />
      </div>
    </div>
  );
}
