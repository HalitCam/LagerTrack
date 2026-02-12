import  * as yup  from "yup";

const SigninValidation = yup.object().shape({
    email: yup.string().email("Geben Sie eine gültige E-Mail-Adresse ein!").required("Pflichtfeld!"),
    password : yup.string().min(6,"Geben Sie mindestens 6 Zeichen ein!").required("Pflichtfeld!")
})

export default SigninValidation;
