import { BaseStore } from "../../utils/BaseStore";


export interface DrawerState {
    drawerToggled: boolean
    animating: boolean
}

export interface DrawerActions {
    toggleDrawer(toggle: boolean): void
}

export class DrawerStore 
    extends BaseStore<DrawerState, DrawerActions> 
    implements DrawerActions {

    protected prototype = DrawerStore.prototype;
    protected initialState = {
        drawerToggled: true,
        animating: false,
    }

    constructor() {
        super();        
    }

    public toggleDrawer(toggle: boolean) {
        this.setState({
            ...this.state,
            animating: true,
            drawerToggled: toggle
        })
        setTimeout(
            () => this.setState({
            ...this.state,
            animating: false,
        }), 300)
    }
}