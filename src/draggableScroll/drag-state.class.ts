export class DraggableScrollState {
    constructor () {}
    public isPressed = false;

    private _startDragX: number | null;
    set startDragX(posX: number) {
        this._startDragX = posX;
    }

    private _startDragY: number | null;
    set startDragY(posY: number) {
        this._startDragY = posY;
    }

    public calcMoveX(currX: number) {
        return this._startDragX ? this._startDragX - currX : 0;
    }

    public calcMoveY(currY: number) {
        return this._startDragY ? this._startDragY - currY : 0;
    }
}