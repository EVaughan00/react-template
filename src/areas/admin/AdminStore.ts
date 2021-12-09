import { BaseStore } from "../../utils/BaseStore";


export interface AdminState {

}

export interface AdminActions {

}

export class AdminStore 
    extends BaseStore<AdminState, AdminActions> 
    implements AdminActions {

        protected prototype = AdminStore.prototype;
        protected initialState = {
  
        }
    
        constructor() {
            super();                
        }
    
}