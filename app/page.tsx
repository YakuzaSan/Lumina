"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import NameInput from "@/app/components/NameInput";
import FactDisplay from "@/app/components/FactsDisplay";
import NationWrapper from "@/app/components/NationWrapper";
import NationItem from "@/app/components/NationItem";
import DisplayAge from "@/app/components/DisplayAge";
import GenderDisplay from "@/app/components/GenderDisplay";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from '@vercel/analytics/react';
import{Country, AgeData, FactData, GenderData} from "@/app/type/types";
import countryList from "country-list";
export default function Page() {
    const [name, setName] = useState("");
    const [fact, setFact] = useState("");
    const [countryName, setCountryName] = useState<Array<Country>>([]);
    const [probability, setProbability] = useState<number>();
    const [loadingCountries, setLoadingCountries] = useState<"waiting" | "loading" | "loaded">("waiting");
    const [gender, setGender] = useState<string> ("");
    const [age, setAge] = useState<number>(0);

    const countryCodeToName = (countryCode: string) => {
        if(countryCode === 'sq'){
            return countryList.getName("al".toUpperCase()) || "Unknown";
        }
        return countryList.getName(countryCode.toUpperCase()) || "Unknown";
    };

    const fetchFact = async () => {
        try {
            const res = await axios.get('/api/facts');
            const data: FactData = res.data;
            setFact(data.fact);
        } catch (error) {
            console.error("Error fetching facts:", error);
        }
    };
    const transformPercentage = (probability: number) => {
        let percentage = Math.round(probability * 100).toString();
        return percentage;
    };

    const handleNameSubmit = async (name: string) => {
        let lowerName = name.toLowerCase();
        try {
            const ageRes = await fetch(`https://api.agify.io?name=${lowerName}`);
            const ageData: AgeData = await ageRes.json();
            setAge(ageData.age);

            const gender = await fetch(` https://api.genderize.io?name=${lowerName}`);
            const genderData: GenderData = await gender.json();
            setGender(genderData.gender);

            const countryRes = await fetch(`https://api.nationalize.io?name=${lowerName}`);
            const countryData: { country: Country[], probability: number } = await countryRes.json();

            if (countryData.country && countryData.country.length > 0) {
                let newData: Array<Country> = countryData.country.map((country: Country) => ({
                    country_id: country.country_id.toLowerCase() === 'sq' ? 'al' : country.country_id.toLowerCase(),
                    probability: country.probability,
                    country_full: countryCodeToName(country.country_id.toLowerCase()),
                }));

                setCountryName(newData);
                setProbability(countryData.probability);
                setLoadingCountries("loaded");
            } else {
                setLoadingCountries("loading");
            }

        } catch (error) {
            console.error("Error handling name submit:", error);
        }
    };

    useEffect(() => {
        fetchFact();
        return () => {
            setFact("");
            setCountryName([]);
        };
    }, []);

    return (
        <>
            <div className="h-screen w-screen flex flex-row justify-center bg-[#181818] ">
                <div className="flex flex-col items-center pt-20">
                    <h3 className={` font-bold text-3xl text-neutral-600`}>Let me say something about you</h3>
                    <NameInput
                        Name={(YourName: string) => setName(YourName)}
                        handleNameSubmit={() => handleNameSubmit(name)}
                        fetchFact = {() => fetchFact()}
                    />
                    {loadingCountries !== "waiting" ? (
                        loadingCountries === "loaded" ? (
                            <>
                                <NationWrapper>
                                    {countryName.map((country: Country, index) => (
                                        <NationItem
                                            index={index}
                                            nation={country.country_full}
                                            img_src={`https://flagcdn.com/w160/${country.country_id}.png`}
                                            key={country.country_full}
                                            percentage={`${transformPercentage(country.probability)}`}
                                        />
                                    ))}
                                </NationWrapper>
                                <GenderDisplay gender={gender}/>
                                <FactDisplay fact={fact} />
                                <DisplayAge age={age}/>
                            </>
                        ) : (
                            <>
                                <div className={`font-poppins font-bold h-[29.95%] w-full flex flex-col items-center justify-center text-[1rem] lg:text-[1.25rem] text-[#D1D1D1] text-center`}>
                                    Are you sure that&apos;s a name?
                                </div>
                                <FactDisplay fact={fact} />
                            </>
                        )
                    ) : (
                        <>
                            <p className={`font-poppins font-bold h-[29.95%] flex flex-col items-center justify-center text-[1rem] lg:text-[1.25rem] text-[#D1D1D1] text-center`}>
                                Enter a name to get started.
                            </p>

                            <FactDisplay fact={fact} />
                        </>
                    )}
                </div>
            </div>
            <SpeedInsights/>
            <Analytics />
        </>
    );
}
