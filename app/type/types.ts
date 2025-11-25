export interface Country {
    country?: Country[];
    country_id: string;
    probability: number;
    country_full: string;
}

export interface AgeData {
    age: number;
}

export interface FactData {
    fact: string;
}

export interface GenderData{
    gender: string;
}

export interface Weather{
    weather?: Weather[];
    main_temp: number;
    wind_speed: number;
    weather_0_description: string;
    sys_name:  string;

}