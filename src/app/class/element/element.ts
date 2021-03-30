export class Element {
    private _elementId: number;
    private _label: string;
    
    constructor(){}

    public get elementId(): number {
        return this._elementId;
    }
    public set elementId(value: number) {
        this._elementId = value;
    }
    public get label(): string {
        return this._label;
    }
    public set label(value: string) {
        this._label = value;
    }
}
