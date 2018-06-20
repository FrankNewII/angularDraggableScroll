export interface DraggableScrollInterfaceConfig {
    hideScrollbars?: boolean;
    inertia?: boolean;
}

export class DraggableScrollConfig implements DraggableScrollInterfaceConfig {
    hideScrollbars = false;
    inertia = true;
    stopScrollOnMouseleave = true;

    constructor() {}


    extend(conf: DraggableScrollInterfaceConfig) {
        Object.assign(this, conf);
    }
}