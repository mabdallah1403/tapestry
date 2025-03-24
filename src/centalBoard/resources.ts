import { ResourceLabel } from "./enums";

export class Resource {
    private value = 1;
    private readonly max = 8;
    private readonly label: ResourceLabel;

    constructor(label: ResourceLabel) {
        this.label = label;
    }
    
    public increaseValue(amountAdded: number): void {
        const tempvalue = this.value + amountAdded;
        if (tempvalue <= this.max) {
            this.value = tempvalue;
        }
        else {
            this.value = this.max  
        }
    }

    public decreaseValue(amountLost: number): void {
        const tempValue = this.value - amountLost;
        if (tempValue >= 0) {
            this.value = tempValue;
        }
        else {
            this.value = 0;
        }
    }

    public getLabel(): ResourceLabel  {
        return this.label;
    }

    public getValue(): number {
        return this.value;
    }

    public isAtMax(): boolean {
        return this.value === this.max;
    }

    public toString(): string {
        return this.label + ": " + this.value + "/" + this.max;
    }
}