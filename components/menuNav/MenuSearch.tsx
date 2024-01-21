"use client"
import { X } from "lucide-react";
interface MenuSearchProps {
    searchTerm: string
    setSearchTerm: (value: string) => void
    setIsSearch: (value: boolean) => void
}
function MenuSearch({ searchTerm, setSearchTerm, setIsSearch } : MenuSearchProps) {
    return (
        <div className='flex items-center border border-primary rounded-full p-1 gap-5'>
            <span 
                className='text-primary-tint cursor-pointer font-light transition-[0.5s] p-2 rounded-[50%] bg-light'
                onClick={ () => {
                    setIsSearch(false)
                    setSearchTerm('')
                }}
            >
                <X />
            </span>
            <input 
                type="search" 
                placeholder='بحث' 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} 
                className="w-full focus:outline-none bg-transparent text-primary pl-2"
            />

        </div>
    )
}

export default MenuSearch