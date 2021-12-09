import { ModelErrors } from "./Response";
import { FunctionComponent } from "react";

export type StoreValue = any;

export interface ValueStore {
    [name: string]: any;
}

export type FormProviderProps = {
    model: FormModel,
    onSubmit: (values: ValueStore) => Promise<any>
}

export class FormModel {    
    public static Validation: { [model: string]: ModelValidationRules } = {};
    public static Form: FunctionComponent<FormProviderProps>;
    private _type: string = "FormModel";

    public validation: ModelValidation = new ModelValidation(this);

    public get formData() {
        const data: any = {};
            
        Object.keys(this).forEach(key => { 
            if (key == "validation" || key == "_type" || key == "onSubmit")
                return;

            if (typeof this[key as keyof FormModel] == "object" && this[key as keyof FormModel]["_type"] == "FormModel") {
                data[key as keyof FormModel] = this[key as keyof FormModel].formData;
                return;
            }

            data[key as keyof FormModel] = this[key as keyof FormModel]     
        });

        return data;        
    }

    public set formData(formData) {
        this.formData = formData
    }

    public copy(values: ValueStore | undefined) {
        if (!values)
            return this;
            
        Object.keys(values).forEach(key => { 
            this[key as keyof FormModel] = values[key as keyof FormModel]     
        });

        return this;
    }
}

export type ModelValidationRules = { 
    [property: string]: RuleObject[],
};

export class ModelValidation {
    public rules: ModelValidationRules;
    public serverErrors: FormErrors;
    public errors: FormErrors;
    public disabled: boolean = false;

    constructor(private _self: FormModel){
        this.rules = FormModel.Validation[_self.constructor.name];
        this.serverErrors = {};
        this.errors = {};

        if (!this.rules)
            this.rules = {};
    }

    public validateAll(): void {
        this.errors = {};
        const validatedFields = Object.keys(this.rules);

        validatedFields.forEach(field => {
            this.errors[field] = this.validate(field); 
        });
    }

    public get hasErrors() {
        this.validateAll();

        return Object.values(this.errors).find(e => !e.status) != undefined;
    }

    public validate(field: string): FormError {
        if (this.disabled)
            return new FormError([]);

        const errors: string[] = [];
        const rules = this.rules[field] ?? [];
        const serverErrors = this.serverErrors[field];
        const value = this._self[field as keyof FormModel];        

        rules.forEach(rule => {            

            let invalid = (
                (rule.enum && !Object.values(rule.enum).includes(value)) ||
                (rule.len && `${value}`.length != rule.len) ||
                (rule.max && `${value}`.length > rule.max) ||
                (rule.min && `${value}`.length < rule.min) ||
                (rule.pattern && !rule.pattern.test(`${value}`)) ||
                (rule.required && !value ) ||
                (rule.required != undefined && !rule.required && value)
            );

            if (invalid)
                errors.push(rule.message ?? "Invalid");            
        });

        return new FormError(errors).merge(serverErrors);
    }
}

type RuleObject = {
    enum?: object;
    len?: number;
    max?: number;
    message?: string;
    min?: number;
    pattern?: RegExp;
    required?: boolean;
}

export function ValidationRule(rule: RuleObject) {    
    return function (target: FormModel, propertyKey: string) {        
        let model = FormModel.Validation[target.constructor.name];

        if (model == undefined) {
            FormModel.Validation[target.constructor.name] = {};
            model = FormModel.Validation[target.constructor.name];
        }

        if (model[propertyKey] == undefined)
            model[propertyKey] = [];
        
        model[propertyKey].push(rule);
    }
}

export class FormError {
    constructor(private _errors: string[]) { }    

    public get all(): string[] {
        return this._errors.slice();
    }
    
    public get status(): boolean {
        return this._errors.length <= 0;
    }

    public get first(): string | undefined {
        return this._errors[0];
    }

    public get last(): string | undefined {
        return this._errors[this._errors.length -1];
    }

    public merge(error?: FormError) {
        if (!error)
            return this;

        this._errors.push(...error._errors);

        return this;
    }

    public static map(errors: ModelErrors): FormErrors {
        let errorMap: FormErrors = {};

        Object.keys(errors).forEach(field => 
            errorMap[field] = new FormError(errors[field]));

        return errorMap;
    }
}

export type FormErrors = {
    [error: string]: FormError
}
