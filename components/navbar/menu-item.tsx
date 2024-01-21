'use client';

import { cn } from "@/lib/utils";
import Link from "next/link";

interface MenuItemProps {
    onClick: () => void;
    label: string;
    active: boolean;
    hidden?: boolean;
    href?: string
}

const MenuItem: React.FC<MenuItemProps> = ({
    onClick,
    label,
    active,
    hidden,
    href
}) => {
    return (
        <Link
            href={href || ''}
            onClick={onClick}
            className={cn("text-primary px-3 mx-1 py-2 hover:bg-light-shade transition rounded-lg mb-2 lg:mb-0",
            active && "bg-light-shade font-semibold",
            hidden && "2xl:hidden"
            )}
        >
            {label}
        </Link>
    );
}

export default MenuItem;