export class DifficultyTemplate {
    name: string;
    clone: Function;

    constructor(name : string, clone : Function) {
        this.name = name;
        this.clone = clone;
    }
}