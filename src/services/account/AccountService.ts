import { AxiosRequestConfig } from "axios";
import { API } from "../../api";
import { ApiClient } from "../../utils/ApiClient";
import { UserDetails } from "./models/UserDetails";

export class AccountService {
    public static getUserDetails(email: string) {

        const requestConfig: AxiosRequestConfig = {
            method: "GET",
            url: API.server.account.details.replace("%email%", email)
        };

        return ApiClient.request(requestConfig)
            .then(response => new UserDetails().copy(response.model))
    }
}