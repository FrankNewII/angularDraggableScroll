import {ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {DraggableScrollConfig, DraggableScrollInterfaceConfig} from "./default-config.class";
import {DraggableScrollInertia} from "./inertia.class";
import {DraggableScrollState} from "./drag-state.class";


@Component({
    selector: 'draggable-scroll',
    template: `
        <div class="wrapper"
             #wrapper
             [class.hide-scrollbars]="_isVisibleScrollbars"
             (mousedown)="startDrag($event)"
             (mousemove)="drag($event)"
             (mouseleave)="leave($event)"
             (mouseup)="stopDrag($event)">
            <ng-content [class.draging]="_state.isPressed"></ng-content>
        </div>
    `,
    styles: [`
        :host {
            display: block;
            overflow: hidden;
            height: 100%;
        }
        
        .draging {
            user-select: none;
            pointer-events: none;
        }

        .wrapper {
            overflow: scroll;
            height: 100%;
        }

        .hide-scrollbars {
            height: calc(100% + 17px);
            width: calc(100% + 17px);
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class DraggableScrollComponent
    implements OnInit {

    @Input() _userConfig: DraggableScrollInterfaceConfig;
    @ViewChild('wrapper') private _wrapperEml: ElementRef;

    _isVisibleScrollbars: boolean;

    _state = new DraggableScrollState;
    private _config: DraggableScrollConfig;
    private _inertia: DraggableScrollInertia;

    startDrag(ev: MouseEvent) {
        this._state.startDragX = ev.clientX + this._wrapperEml.nativeElement.scrollLeft;
        this._state.startDragY = ev.clientY + this._wrapperEml.nativeElement.scrollTop;
        this._state.isPressed = true;
        this._inertia.stopInertion();
    }

    drag(ev: MouseEvent) {

        if (this._state.isPressed) {
            let draggedElm = this._wrapperEml.nativeElement;

            draggedElm.scrollLeft = this._state.calcMoveX(ev.clientX);
            draggedElm.scrollTop = this._state.calcMoveY(ev.clientY);

            this._inertia
                .addMouseWayPoints(ev.clientX, ev.clientY);
        }
    }

    stopDrag(ev: MouseEvent) {
        if (this._state.isPressed) {
            this._state.isPressed = false;
            this._inertia.startInertialMove(ev.clientX, ev.clientY);
        }
    }

    stopInertia() {
        this._inertia.stopInertion();
    }

    leave(ev: MouseEvent) {
        if (this._state.isPressed) {
            if (this._config.stopScrollOnMouseleave) {
                this._state.isPressed = false;
                this._inertia.startInertialMove(ev.clientX, ev.clientY);
            }
        }
    }

    public ngOnInit() {
        this._config = new DraggableScrollConfig;
        this._inertia = new DraggableScrollInertia(this, this._config.inertia);

        if (this._userConfig) {
            this._config.extend(this._userConfig);
        }

        this._isVisibleScrollbars = this._config.hideScrollbars;
    }

    public scroll(x: number, y: number) {
        const draggedElm = this._wrapperEml.nativeElement;

        draggedElm.scrollLeft = draggedElm.scrollLeft + x;
        draggedElm.scrollTop = draggedElm.scrollTop + y;

        return this;
    }
}
