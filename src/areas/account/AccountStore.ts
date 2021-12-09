import { UserDetails } from "../../services/account/models/UserDetails";
import { BaseStore } from "../../utils/BaseStore";


export interface AccountState {
    loggedIn?: boolean,
    user?: UserDetails
}

export interface AccountActions {
    logout(): void,
    login(user: UserDetails): void,
}

export class AccountStore 
    extends BaseStore<AccountState, AccountActions> 
    implements AccountActions {

    protected prototype = AccountStore.prototype;
    protected initialState = {
        loggedIn: false,
        user: undefined 
    }

    constructor() {
        super();                
    }

    public login(user: UserDetails) {
        this.setState({
            loggedIn: user != undefined,
            user
        })
    }

    public logout() {
        this.setState({
            loggedIn: false,
            user: undefined
        });
    }
}