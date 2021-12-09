import { AxiosRequestConfig } from 'axios';
import { ApiClient } from '../../utils/ApiClient';
import { ErrorResponse, SuccessResponse } from '../../utils/Response';
import { API } from '../../api';
import { HealthCheck } from './models/HealthCheck';

export class HealthCheckService {
    public static checkServer(): Promise<HealthCheck> {
        const requestConfig: AxiosRequestConfig = {
            method: "get",
            url: API.server.healthCheck
        };

        return ApiClient.request(requestConfig)
            .then(this.handleResponse)
            .catch(this.handleError);
    }    

    public static handleResponse(response: SuccessResponse) {
        const hc = new HealthCheck();

        hc.reason = `${response.model}`;
        hc.healthy = hc.reason === "Healthy";

        return hc;
    }

    public static handleError(response: ErrorResponse) {
        const hc = new HealthCheck();

        hc.reason = response.feedback ?? "Unavailable";

        return hc;
    }
}