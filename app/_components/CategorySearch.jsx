"use client"

import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';
import GlobalAPI from '../_utils/GlobalAPI';
import Image from 'next/image';
import Link from 'next/link';
import DoctorList from './DoctorList';

export default function CategorySearch({doctorList}) {
  const [categoryList, setCategoryList] = useState([]);
  const [searchDoctors,setSearchDoctors] = useState([])
  const [query,setQuery] = useState('')

  useEffect(() => {
    getCategoryList();
  }, []);

  const getCategoryList = () => {
    GlobalAPI.getCategory().then(resp => {
      setCategoryList(resp.data.data);
    });
  };

  const handleSearch = () =>{
    if(query.trim===''){
      setSearchDoctors([])
    } else{
      const filteredDoctors = doctorList.filter(doctor=>
        doctor.attributes.Name.toLowerCase().includes(query.toLowerCase())
      )
      setSearchDoctors(filteredDoctors)
    }
  }

  return (
    <div className='mb-10 items-center px-5 flex flex-col gap-4'>
      <h2 className='font-bold text-4xl tracking-wide'>Search <span className='text-primary'>Doctors</span></h2>
      <h2 className='text-gray-400 text-xl'>Search Your Doctor and Book Appointment in one click</h2>
      
      <div className="flex w-full mt-3 max-w-sm items-center space-x-2">
        <Input type="text" placeholder="Search" value={query} onChange={(e)=>setQuery(e.target.value)} />
        <Button type="submit" onClick={handleSearch}>
          <Search className='h-4 w-4 mr-2' />
          Search
        </Button>
      </div>
      
      {searchDoctors.length > 0 && (
        <div className='w-full mt-5'>
          <h3 className='font-bold text-2xl'>Search Results</h3>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4'>
            {searchDoctors.map((item,index)=>{
               const imageUrl = item.attributes.Image.data.attributes.url;
               const fullImageUrl = `http://127.0.0.1:1337${imageUrl}`;

               return(
                   <div key={index} className='border-[1px] 
                   rounded-lg p-3 cursor-pointer hover:border-primary hover:shadow-sm
                   transition-all ease-in-out'>
                       <Image src={fullImageUrl}
                       alt='doctorImage'
                       width={500}
                       height={200}
                       className='object-cover rounded-lg' />

                       <div className='mt-3 items-baseline flex flex-col gap-1'>
                           <h2 className='text-[10px] bg-blue-100 p-1 rounded-full
                            px-2 text-primary '>
                               {item.attributes?.category.data.attributes.Name}
                               </h2>
                               <h2 className='font-bold'>{item.attributes.Name}</h2>
                               <h2>Years Of Experience: <span className='text-primary text-sm'>
                               {item.attributes.Year_of_Experience}
                                   </span>
                                   </h2>
                                   <h2 className='text-gray-500 text-sm'>
                                        {item.attributes.Address} 
                                        </h2>
                                        <Link href={'/details/'+item?.id} className="w-full">
                                        <h2 className='p-2 px-3 border-[1px] border-primary text-primary rounded-full
                                         w-full text-center text-[11px] mt-2 cursor-pointer
                                         hover:bg-primary hover:text-white'>Book Now</h2>
                                        </Link>
                                        
                       </div>
                   </div>
               )
            })}
          </div>
        </div>
      )}

      <div className='grid grid-cols-3 mt-5 md:grid-cols-4 lg:grid-cols-9'>
      {categoryList.length>0? categoryList.map((item, index) => {
         // Log the constructed URL to ensure it's correct
         const imageUrl = item.attributes.Icon.data.attributes.url;
          const fullImageUrl = `http://127.0.0.1:1337${imageUrl}`;
        return (
          <Link href={'/search/'+item.attributes.Name} key={index} className='flex flex-col text-center
           gap-2 items-center p-5 bg-blue-50 m-2 rounded-lg
           hover:scale-110 transition-all ease-in-out cursor-pointer '>
            <Image 
              src={fullImageUrl} // Ensure the URL is correctly constructed
              alt='icon'
              width={40}
              height={40}
            />
            <label className='text-blue-600 text-sm'>{item.attributes.Name}</label>
          </Link>
        );
      }):
      [1,2,3,4,5,6].map((i,x)=>(
        <div key={x} className='h-[120px] m-2 w-[130px]
       bg-slate-200 animate-pulse rounded-lg'>

      </div>

      ))
    }
      </div>


    </div>
  );
}
