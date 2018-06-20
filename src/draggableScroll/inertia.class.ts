import {DraggableScrollComponent} from "./draggable-scroll.component";

const INERTIAL_MOVE_DIVIDER = 20;

export interface Coords {
    x: number;
    y: number;
}

export class DraggableScrollInertia {
    private _impulseX = 0;
    private _impulseY = 0;
    private _totalImpulseEnergy = 0;
    private _INERTIAL_MOVE_DIVIDER = INERTIAL_MOVE_DIVIDER;
    private _mouseWayPoints: Coords[] = [];
    private _MAX_POINTS_TO_CHECK_SPEED = 4;

    constructor (private _aggregator: DraggableScrollComponent, private _isEnabled: boolean) {}

    public addMouseWayPoints(x: number, y: number) {
        if (this._isEnabled) {
            if (this._mouseWayPoints.push({x, y}) > this._MAX_POINTS_TO_CHECK_SPEED) {
                this._mouseWayPoints.shift();
            }
        }

        return this;
    }


    public stopInertion() {
        this._totalImpulseEnergy = 0;
        return this;
    }

    public startInertialMove(x: number, y: number) {
        if (this._isEnabled) {
            const totalDist = this._mouseWayPoints.reduce(function (prev, curr) {
                prev.x += curr.x;
                prev.y += curr.y;
                return prev;
            }, {x: 0, y: 0});

            this._impulseX = totalDist.x / this._mouseWayPoints.length - x;
            this._impulseY = totalDist.y / this._mouseWayPoints.length - y;


            this._totalImpulseEnergy = Math.abs(this._impulseX) + Math.abs(this._impulseY);

            this._clearWayPoints();
            if (this._totalImpulseEnergy > 20)
                this._inertialDisplacement();
        }
    }

    private _clearWayPoints () {
        this._mouseWayPoints.length = 0;
        return this;
    }

    private _inertialDisplacement() {

        if ( this._totalImpulseEnergy <= 0 ) {
            this._INERTIAL_MOVE_DIVIDER = INERTIAL_MOVE_DIVIDER;
            return;
        }

        const stepX = this._impulseX;
        const stepY = this._impulseY;

        this._aggregator.scroll(stepX, stepY);

        setTimeout(() => {
            console.log(this._totalImpulseEnergy);
            this._totalImpulseEnergy -= Math.abs(stepX / this._INERTIAL_MOVE_DIVIDER ) + Math.abs(stepY / this._INERTIAL_MOVE_DIVIDER);
            this._inertialDisplacement();
            console.log(++i, this._totalImpulseEnergy);
        }, 1000 / 60 );
    }
}

let i = 0;