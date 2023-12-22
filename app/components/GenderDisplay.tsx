import React, { useEffect, useState } from "react";

export default function AgeDisplay({ gender }: { gender: string }) {
    const [genderColor, setGenderColor] = useState("");

    useEffect(() => {
        getGenderColor(); // Invoke the function to set the initial color
    }, [gender]); // Add gender to the dependency array

    const getGenderColor = () => {
        if (gender === "female") {
            setGenderColor("text-pink-600");
        } else if (gender === "male") {
            setGenderColor("text-blue-600");
        } else {
            setGenderColor("text-white");
        }
    };

    return (
        <div
            className={`
                flex 
                mt-8
                justify-center 
                items-center 
                lg:h-fit 
                ${genderColor}
                text-[1.1rem] 
                bg-[#222222] 
                w-1/2 
                lg:w-[32rem] 
                h-fit                
                text-center 
                rounded-lg  
                py-2 
                px-5
            `}
        >
            From your name you could be a {gender}.
        </div>
    );
}
