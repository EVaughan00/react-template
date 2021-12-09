import { Routes } from "../App"
import { AuthenticationLevel } from "../providers/AuthenticationProvider"


export class RenderCondition {

    public static notAuthenticated = (authLevel: AuthenticationLevel, route: Routes) =>
    authLevel == AuthenticationLevel.None

    public static basicAuthentication = (authLevel: AuthenticationLevel, route: Routes) =>
    authLevel == AuthenticationLevel.Basic ||
    authLevel == AuthenticationLevel.Administrative

    public static adminOnAdminRoute = (authLevel: AuthenticationLevel, route: Routes) =>
    authLevel == AuthenticationLevel.Administrative && route == Routes.Admin

    public static adminOnNonAdminRoute = (authLevel: AuthenticationLevel, route: Routes) =>
    authLevel == AuthenticationLevel.Administrative && route != Routes.Admin
}
