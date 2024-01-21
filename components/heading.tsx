"use client"

function Heading({title}: {title: string}) {
    return (
        <div className='relative rounded-md mx-auto w-[150px] h-16 px-5 py-3 mb-12'>
            <div className='absolute top-0 right-0 -translate-x-[45%] rounded-md w-[80%] h-full bg-light'/>
            <h1 className='absolute text-primary text-3xl font-bold'>{title}</h1>
        </div>
    )
}

export default Heading;