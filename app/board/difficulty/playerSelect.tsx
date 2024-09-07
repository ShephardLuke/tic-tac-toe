import { PlayerTemplate } from "@/app/player/playerTemplate";
import { useId } from "react";

export default function PlayerSelect({label, index, playerTemplates, selectedValue, selectedMode, changedPlayer, changedDifficulty}: {label:string, index:number, playerTemplates: PlayerTemplate[], selectedValue: number, selectedMode: number, changedPlayer: Function, changedDifficulty: Function}) {

    const options = createOptions();
    const selectId = useId();
    
    const optionsId = useId();

    // for (let i = 0; i < playerTemplates.length; i++) { // Create difficulty options
    //     let nextOptions = [];
    //     nextOptions.push(<option key={i} value={i}>{playerTemplates[i].getName()}</option>)

    //     setOptions(nextOptions);
    // }

    function createOptions() {
        return playerTemplates.map(template =>
            <option key={playerTemplates.indexOf(template)} value={playerTemplates.indexOf(template)}>{playerTemplates[playerTemplates.indexOf(template)].getName()}</option>
        ); 
    }

    function createDifficulties() {
        if (!validSelectedValue()) {
            return <></>;
        }

        let selectedTemplate: PlayerTemplate = playerTemplates[selectedValue];
        let modes = selectedTemplate.getClickBehaviours();

        if (modes.length <= 1) {
            return <></>;
        }

        let difficultyOptions = modes.map(mode =>
            <option key={modes.indexOf(mode)} value={modes.indexOf(mode)}>{mode.getName()}</option>
        ) 
    

        return [
        <div key="0">
            <label key="1" htmlFor={optionsId}>Mode: </label>
            <select key="2" onChange={(event) => {changedDifficulty(event, index)}} value={selectedMode} id={optionsId}>
                {difficultyOptions}
            </select>
        </div>
        ]
    
    }

    function validSelectedValue() {
        return (!(selectedValue < 0 || selectedValue >= playerTemplates.length));
    }

    return (
        <>
            <div className="flex flex-col text-center space-y-5 md:flex-row md:space-x-5 md:space-y-0">
                <div>
                    <label htmlFor={selectId}>{label}</label>
                    <select onChange={(event) => {changedPlayer(event, index)}} value={selectedValue} id={selectId}>
                        {options}
                    </select>  
                </div>
                {createDifficulties()}
            </div> 
        </>
    )
}