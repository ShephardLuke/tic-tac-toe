export class Name implements Nameable {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    setName(name: string): void {
        this.name = name;
    }

    getName(): string {
        return this.name;
    }
}