export class ArmeType {
    private _armeTypeId: number;
    private _labelType: string;

    constructor(){}

    public get armeTypeId(): number {
        return this._armeTypeId;
    }
    public set armeTypeId(value: number) {
        this._armeTypeId = value;
    }
    public get labelType(): string {
        return this._labelType;
    }
    public set labelType(value: string) {
        this._labelType = value;
    }
}
