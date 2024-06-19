"use client"

import GlobalAPI from "@/app/_utils/GlobalAPI";
import { useEffect, useState } from "react";
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
  } from "@/components/ui/command"
import Link from "next/link";
import Image from "next/image";
  

export default function CategoryList({category}) {
    const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    getCategoryList();
  }, []);

  const getCategoryList = () => {
    GlobalAPI.getCategory().then(resp => {
      setCategoryList(resp.data.data);
    });
  };
    
    return(
        <div className="h-screen flex flex-col mt-5 ">
            <Command>
  <CommandInput placeholder="Type a command or search..." />
  <CommandList className="overflow-visible">
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Suggestions" >
        {categoryList&&categoryList.map((item,index)=>{
            const imageUrl = item.attributes.Icon.data.attributes.url;
            const fullImageUrl = `http://127.0.0.1:1337${imageUrl}`;
            return(
            <CommandItem key={index}>
            <Link href={'/search/'+item.attributes.Name} className={`p-2 flex gap-2 text-[12px] items-center
            text-blue-600 rounded-md cursor-pointer w-full ${category==item.attributes.Name && 'bg-blue-800'}`}>
            <Image src={fullImageUrl}
            alt='image'
            width={20}
            height={20} />
            <label> {item.attributes.Name} </label>
            </Link>
        </CommandItem>

            )
})}
    </CommandGroup>
    
  </CommandList>
</Command>

        </div>
    )
}
