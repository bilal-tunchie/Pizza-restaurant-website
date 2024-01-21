'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import logo  from "@/public/images/logo.png";

const Logo = () => {
    const router = useRouter();

    return ( 
        <div
            onClick={() => router.push('/')}
            className="flex items-center gap-4 cursor-pointer text-3xl font-bold text-primary" 
        >
            <div className="flex ">
                <Image
                    src={logo}
                    alt="logo"
                    priority={true}
                    width={50}
                    height={50}
                />
            </div>
            <h2 className="logo-text text-2xl">ليسريا بيتزا</h2>
        </div>
    );
}

export default Logo;