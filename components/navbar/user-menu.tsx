'use client';
import { useRouter, usePathname } from "next/navigation";
import { useClerk } from "@clerk/nextjs";
import { useAuth } from "@clerk/nextjs";

import useCartSheet from "@/hooks/useCartSheet"
import MenuItem from "./menu-item";
import { Button } from "../ui/button";

interface UserMenuProps {
    setIsOpen?: (value: boolean) => void
}

const UserMenu = ({ setIsOpen }: UserMenuProps) => {
    const clerk = useClerk();
    const { userId } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    const cartSheet = useCartSheet();
    
    const routes = [
        { label: "القائمة",  href: '/'},
        { label: "العروض",   href: '/offers'},
        { label: "طلباتي",   href: '/orders'},
        { label: "حسابي",    href: '/account'},
        { label: "تواصل",    href: '/contact'},
    ]

    const toggleCartSheet = () => {
        if (cartSheet.isOpen) {
            cartSheet.onClose()
            return;
        }
        cartSheet.onOpen()
    }

    return (
        <div className="flex lg:items-center flex-col lg:flex-row lg:gap-4 xl:gap-3 cursor-pointer">
            {routes.map( route => (
                <MenuItem
                    key={route.label}
                    label={route.label}
                    onClick={() => {
                        if (setIsOpen) {
                            setIsOpen(false)
                        }
                        router.push(route.href)
                    }}
                    active={pathname === route.href}
                    href={route.href}
                />
            ))}
            <MenuItem
                key="السلة"
                label="السلة"
                onClick={toggleCartSheet}
                active={false}
                hidden
            />
            {userId ? (
                <Button 
                    key="خروج"
                    variant="outline" 
                    className="text-sm"
                    onClick={() => clerk.signOut()}
                >
                    تسجيل خروج
                </Button>

                ) : (
                <Button 
                    key="دخول" 
                    className="text-sm"
                    onClick={() => clerk.openSignIn()}
                >تسجيل دخول</Button>
            )}
        </div>
    );
}

export default UserMenu;