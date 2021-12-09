import { FormModel } from "../../../utils/FormModel";

export class UserDetails extends FormModel {
    
    public id: string = "";
    public email: string = "";
    public name: string = "";
    public signupAt: string = "";
    public isAdmin: boolean = false;
}