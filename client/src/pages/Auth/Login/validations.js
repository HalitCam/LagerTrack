import * as yup from "yup";

const SigninValidation = yup.object().shape({
    username: yup.string().min(5, "Bitte geben Sie mindestens 5 Zeichen ein.").required("Pflichtfeld!"),
    password: yup.string().min(6, "Geben Sie mindestens 6 Zeichen ein!").required("Pflichtfeld!")
})

export default SigninValidation;
