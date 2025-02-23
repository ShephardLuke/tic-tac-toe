import { ChangeEvent, useId } from "react";
import { DifficultyGroup } from "./difficultyGroup";
import { DifficultyReference } from "./difficultyReference";

export default function DifficultySelect({groupLabel, index, difficulties, selectedGroup, changedGroup, changedIndex, typeLabel="Type"}: {groupLabel:string, index:number, difficulties: DifficultyGroup[], selectedGroup: DifficultyReference, changedGroup: (event: ChangeEvent<HTMLSelectElement>, index: number) => void, changedIndex: (event: ChangeEvent<HTMLSelectElement>, index: number) => void, typeLabel?: string}) {

    const groups = [];

    for (let i = 0; i < difficulties.length; i++) { // Create difficulty groups
        groups.push(<option key={difficulties[i].name + index} value={i}>{difficulties[i].name}</option>)
    }

    const choices = []

    const templates = difficulties[selectedGroup.group].templates
    for (let j = 0; j < templates.length; j++) {
        choices.push(<option key={templates[j].name + index} value={j}>{templates[j].name}</option>)
    }

    const id = useId()

    return (
        <>
            <div className="flex text-center">
                <div>
                    <label htmlFor={id + "-group"}>{groupLabel}</label>
                    <select onChange={(event) => {changedGroup(event, index)}} value={selectedGroup.group} className="bg-light-blue"  id={id + "-group"}>
                        {groups}
                    </select>   
                </div>
                {
                    choices.length > 1 ? 
                    <div className="pl-5">
                        <label htmlFor={id + "-choice"}>{typeLabel}</label>
                        <select onChange={(event) => {changedIndex(event, index)}} value={selectedGroup.index} className="bg-light-blue" id={id + "-choice"}>
                            {choices}
                        </select>   
                    </div>
                    :
                    null
                }
            </div> 
        </>
    )
}