import { FormModel } from "../../../utils/FormModel"

export class HealthCheck extends FormModel {
    public healthy: boolean = false;
    public reason: string = "";
}