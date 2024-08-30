import { useId } from "react";
import { DifficultyTemplate } from "./difficultyTemplate";

export default function DifficultySelect({label, index, difficulties, selectedValue, changed}: {label:string, index:number, difficulties: DifficultyTemplate[], selectedValue: number, changed: Function}) {

    const selectId = useId();

    const options = [];

    for (let i = 0; i < difficulties.length; i++) { // Create difficulty options
        options.push(<option key={crypto.randomUUID()} value={i}>{difficulties[i].name}</option>)
    }

    return (
        <>
            <div>
                <label htmlFor={selectId}>{label}</label>
                <select onChange={(event) => {changed(event, index)}} value={selectedValue} className="bg-light-blue" name="difficulty" id={selectId}>
                    {options}
                </select>   
            </div> 
        </>
    )
}