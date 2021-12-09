import { IdToken, useAuth0 } from "@auth0/auth0-react";
import React, { FunctionComponent } from "react";
import { AppStore } from "../AppStore";
import { AccountService } from "../services/account/AccountService";
import { UserDetails } from "../services/account/models/UserDetails";
import { SessionService } from "../services/account/SessionService";
import { ApiClient } from "../utils/ApiClient";

interface Props {
  bypass?: UserDetails;
}

export enum AuthenticationLevel {
  None = "None",
  Basic = "Basic",
  Administrative = "Administrative",
}

const initialContext = {
  authenticated: false,
  authLevel: AuthenticationLevel.None,
  loggingOut: false,
  logout: () => {},
  updateSession: (token: IdToken) => {},
};

const AuthenticationContext = React.createContext(initialContext);

const AuthenticationProvider: FunctionComponent<Props> = (props) => {
  const { isLoading, getIdTokenClaims, logout } = useAuth0();
  const [, accountActions] = AppStore.account.use();

  const handleToken = (token: IdToken) => {
    if (!token) {
      if (!authContext.authenticated) return;

      return handleLogout();
    }

    ApiClient.addAuthentication(token.__raw);
    handleLogin(token.email ?? "");
  };

  const handleLogin = (email: string) => {
    AccountService.getUserDetails(email)
      .then((user) => {
        accountActions.login;
        return user;
      })
      .then((user) => {
        setAuthContext({
          ...authContext,
          authenticated: true,
          authLevel: user.isAdmin
            ? AuthenticationLevel.Administrative
            : AuthenticationLevel.Basic,
        });
        console.log(`Authenticated user: ${email}`);
      })
      .catch((error) => console.log("Failed to retreive user information"));
  };

  const handleLogout = () => {
    console.log("Logging out");
    SessionService.deleteSessionToken();
    accountActions.logout();
    logout();
    setAuthContext({
      ...authContext,
      authenticated: false,
      authLevel: AuthenticationLevel.None,
      loggingOut: true,
    });
  };

  const [authContext, setAuthContext] = React.useState({
    authenticated: false,
    loggingOut: false,
    authLevel: AuthenticationLevel.None,
    logout: handleLogout,
    updateSession: handleToken,
  });

  React.useEffect(() => {
    if (props.bypass) {
      accountActions.login(props.bypass);
      setAuthContext({
        ...authContext,
        authenticated: true,
        authLevel: AuthenticationLevel.Administrative,
      });
      return;
    }
  }, []);

  React.useEffect(() => {
    if (!isLoading) {
      getIdTokenClaims()
        .then(handleToken)
        .catch((error) => console.log(error));
      setAuthContext({ ...authContext, loggingOut: false });
    }
  }, [isLoading]);


  return (
    <AuthenticationContext.Provider value={authContext}>
      {props.children}
    </AuthenticationContext.Provider>
  );
};

export { AuthenticationProvider, AuthenticationContext };
