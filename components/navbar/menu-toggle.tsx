"use client"

import { AiOutlineMenu } from "react-icons/ai";

interface MenuToggleProps {
    onToggleOpen: () => void;
}

const MenuToggle:React.FC<MenuToggleProps> = ({
    onToggleOpen
}) => {
    return (
        <div
            onClick={onToggleOpen}
            className="lg:hidden p-2 border-[1px] border-primary-200 flex flex-row items-center rounded-lg cursor-pointer hover:shadow-md transition"
            role="button"
        >
            <AiOutlineMenu size={20}/>
        </div>
    )
}

export default MenuToggle