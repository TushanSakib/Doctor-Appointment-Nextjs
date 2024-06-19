import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

export default function DoctorList({doctorList,heading='Popular Dcotors'}) {
  return (
    <div className='mb-10 px-8'>
        <h2 className='font-bold text-xl'>{heading}</h2>

        <div className='grid grid-cols-2 md:grid-cols-2 mt-4
         lg:grid-cols-4 gap-7'>

            {doctorList.length>0?doctorList.map((item,index)=>{
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
            }):
            [1,2,3,4,5,6].map((load,i)=>(
                <div key={i} className='h-[220px] bg-slate-200 w-full
                rounded-lg animate-pulse '>
            
        </div>

            ))
        }
        </div>
      
    </div>
  )
}
