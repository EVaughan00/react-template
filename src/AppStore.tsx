import { AccountStore } from "./areas/account/AccountStore"
import { AdminStore } from "./areas/admin/AdminStore"
import { DashboardStore } from "./areas/dashboard/DashboardStore"
import { DrawerStore } from "./components/drawer/DrawerStore"

const AppStore = {
    account: new AccountStore(),
    dashboard: new DashboardStore(),
    admin: new AdminStore(),
    drawer: new DrawerStore()
}

export { AppStore }
