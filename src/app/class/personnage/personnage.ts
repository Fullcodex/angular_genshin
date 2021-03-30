import { ArmeType } from "../arme_type/arme-type";
import { Element } from "../element/element";

export class Personnage {
    private _personnageId: number;
    private _nom: string;
    private _rarete: number;
    private _image: string;
    private _armeType: ArmeType;
    private _element: Element;

    constructor(){}
    
    public get personnageId(): number {
        return this._personnageId;
    }
    public set personnageId(value: number) {
        this._personnageId = value;
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
    public get armeType(): ArmeType {
        return this._armeType;
    }
    public set armeType(value: ArmeType) {
        this._armeType = value;
    }
    public get element(): Element {
        return this._element;
    }
    public set element(value: Element) {
        this._element = value;
    }
}
