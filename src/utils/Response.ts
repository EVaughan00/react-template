import { AxiosRequestConfig } from "axios";

export type ModelErrors = {
    [property: string]: string[];
};

export interface IServerResponse {
    config: AxiosRequestConfig | null;
    request?: XMLHttpRequest;
    data?: any
}

export interface IServerError extends IServerResponse {
    response: {
        data: {            
            errors: ModelErrors,
            feedback: string
        },
        status?: number,
        statusText?: string,
    },
    message?: string 
}

const defaultResponse: IServerResponse = {
    config: null
}

const defaultError: IServerError = {
    config: null,
    response: {
        data: {            
            errors: {},
            feedback: "string"
        }
    }
}

export class ServerResponse {
    public formId?: string;
    public config: AxiosRequestConfig | null;
    public request: XMLHttpRequest | undefined;
    constructor(response: IServerResponse) {
        this.config = response.config;
        this.request = response.request;
    }        
}

export class ErrorResponse extends ServerResponse {
    public errors: ModelErrors;
    public feedback: string | undefined;

    constructor(error: IServerError) {        
        super(error);        
        
        this.errors = {};
        this.feedback = undefined;        

        if (!error.response || !error.response.data) {
            this.feedback = error.request?.["response"];            

            return;
        }

        if (typeof(error.response.data) == 'string') {
            this.feedback = error.response.data;
            return;
        }

        if (!error.response.data.errors)
            return;

        for (let prop in error.response.data.errors) {
            let outProp = prop[0].toLowerCase() + prop.slice(1);

            if (!this.errors[outProp])
                this.errors[outProp] = [];

            const errors =  error.response.data.errors[prop];
            errors.forEach(error => this.errors[outProp].push(error));            
        }
    }

    public hasErrors(field?: string) {
        if (field)
            return this.errors.hasOwnProperty(field);
        else 
            return Object.keys(this.errors).length > 0;
    }

    public addErrors(field: string, errors: string[]) {
        if (!this.errors[field])
            this.errors[field] = errors;
        else
            this.errors[field].push(...errors);
    }

    public static Build(errors: ModelErrors, feedback: string | undefined = undefined) {
        let error = new ErrorResponse(defaultError);
        error.errors = errors;
        if (feedback)
            error.feedback = feedback;

        return error;
    }
}

export class SuccessResponse extends ServerResponse {
    public model: {
        [property: string]: any
    }

    constructor(success: IServerResponse ){
        super(success);
        this.model = success.data;
    }

    public static Build(model?: any) {
        let response = new SuccessResponse(defaultResponse);
        if (model)
            response.model = model;
        return response;
    }
}