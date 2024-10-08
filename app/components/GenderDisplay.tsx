import React, { useEffect, useState } from "react";

export default function AgeDisplay({ gender }: { gender: string }) {
    const [genderColor, setGenderColor] = useState("");
    //TODO; MORE INFORMATION (gender probability, count)
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
         <div className={`flex flex-col justify-center mt-4 lg:w-[32rem]`}>
             <h2 className={`font-bold text-[1rem] lg:text-[1.25rem] text-[#D1D1D1] flex justify-center `}>
                Your Gender
             </h2>
             <div
                 className={`flex justify-center ${genderColor} text-[1.1rem] bg-[#222222] text-center rounded-lg py-2 px-5`}
             >
                 From your name you could be a {gender}.
             </div>
         </div>
    );
}
