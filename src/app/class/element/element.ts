export class Element {
    private _element_id: number;
    private _label: string;
    
    constructor(){}

    public get element_id(): number {
        return this._element_id;
    }
    public set element_id(value: number) {
        this._element_id = value;
    }
    public get label(): string {
        return this._label;
    }
    public set label(value: string) {
        this._label = value;
    }
}
