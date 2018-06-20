export interface DraggableScrollInterfaceConfig {
    hideScrollbars?: boolean;
    inertia?: boolean;
}

export class DraggableScrollConfig implements DraggableScrollInterfaceConfig {
    hideScrollbars = true;
    inertia = true;
    stopScrollOnMouseleave = true;

    constructor() {}


    extend(conf: DraggableScrollInterfaceConfig) {
        Object.assign(this, conf);
    }
}