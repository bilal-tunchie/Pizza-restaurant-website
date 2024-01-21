import loader from "@/public/loader.svg"
import Image from "next/image";

const Loading = () => {
    return (
        <div className="mx-auto w-full h-screen flex justify-center items-center">
            <Image src={loader} width={100} height={100} alt="loader"/>
        </div> 
    );
}

export default Loading;