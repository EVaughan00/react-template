import { FormModel } from "../../../utils/FormModel";
import Validation from "../../../utils/Validation";

export class Registration extends FormModel {
    @Validation.Rule({ required: true, message: "Please provide an email"})
    @Validation.Rule({ pattern: Validation.Email, message: "This email is invalid"})
    public email: string = "";

    @Validation.Rule({ required: true, message: "Please provide a password"})
    public password: string = "";

    @Validation.Rule({ required: true, message: "Please confirm your password"})
    public passwordConfirm: string = "";
    
    @Validation.Rule({ required: true, message: "First name is required"})
    public firstName: string = "";
    
    @Validation.Rule({ required: true, message: "Last name is required"})
    public lastName: string = "";
}