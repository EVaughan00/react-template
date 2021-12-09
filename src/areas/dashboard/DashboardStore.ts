import { BaseStore } from "../../utils/BaseStore";


export interface DashboardState {

}

export interface DashboardActions {

}

export class DashboardStore 
    extends BaseStore<DashboardState, DashboardActions> 
    implements DashboardActions {

        protected prototype = DashboardStore.prototype;
        protected initialState = {
  
        }
    
        constructor() {
            super();                
        }
    
}