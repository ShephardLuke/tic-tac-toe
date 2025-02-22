import { DifficultyTemplate } from "./difficultyTemplate";

export class DifficultyGroup {
    name: string;
    templates: DifficultyTemplate[]

    constructor(name : string, templates : DifficultyTemplate[]) {
        this.name = name;
        this.templates = templates;
    }
}