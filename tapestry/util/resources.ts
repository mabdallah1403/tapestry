export enum ResourceLabel {
    COINS = "Coins",
    WORKERS = "Workers",
    FOOD = "Food",
    CULTURE = "Culture",
}
export class Resource {
    value = 0;
    max = 8;
    label: ResourceLabel;
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
    public toString(): string {
        return this.label + ": " + this.value + "/" + this.max;
    }
}