export class Personnage {
    private _personnage_id: number;
    private _nom: string;
    private _rarete: number;
    private _image: string;
    private _arme_type_id: number;
    private _element_id: number;

    constructor(){}
    
    public get personnage_id(): number {
        return this._personnage_id;
    }
    public set personnage_id(value: number) {
        this._personnage_id = value;
    }

    public get nom(): string {
        return this._nom;
    }
    public set nom(value: string) {
        this._nom = value;
    }
    public get rarete(): number {
        return this._rarete;
    }
    public set rarete(value: number) {
        this._rarete = value;
    }
    public get image(): string {
        return this._image;
    }
    public set image(value: string) {
        this._image = value;
    }
    public get arme_type_id(): number {
        return this._arme_type_id;
    }
    public set arme_type_id(value: number) {
        this._arme_type_id = value;
    }
    public get element_id(): number {
        return this._element_id;
    }
    public set element_id(value: number) {
        this._element_id = value;
    }
}
