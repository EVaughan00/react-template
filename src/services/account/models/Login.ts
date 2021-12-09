import { FormModel } from "../../../utils/FormModel";
import Validation from "../../../utils/Validation";

export class Login extends FormModel {
    @Validation.Rule({ required: true, message: "Please provide an email"})
    @Validation.Rule({ pattern: Validation.Email, message: "This email is invalid"})
    public email: string = "";

    @Validation.Rule({ required: true, message: "Please provide a password"})
    public password: string = "";
    
    public remember: boolean = false;
}