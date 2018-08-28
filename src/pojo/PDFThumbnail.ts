export default class PDFThumbnail {
     _height: number;
     _width: number;
     _pdf_url: string;
     _jump_to_url_after_click: String;
     _name: string;
     private _show_name: boolean = true;
     private _canvasId: string;

    get canvasId(): string {
        this._canvasId = this.name + "-canvas";
        return this._canvasId;
    }

    constructor () {}

    get jump_to_url_after_click(): String {
        return this._jump_to_url_after_click;
    }

    set jump_to_url_after_click(value: String) {
        this._jump_to_url_after_click = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }


    get show_name(): boolean {
        return this._show_name;
    }

    set show_name(value: boolean) {
        this._show_name = value;
    }

    get height(): number {
        return this._height;
    }

    set height(value: number) {
        this._height = value;
    }

    get width(): number {
        return this._width;
    }

    set width(value: number) {
        this._width = value;
    }

    get pdf_url(): string {
        return this._pdf_url;
    }

    set pdf_url(value: string) {
        this._pdf_url = value;
    }
}