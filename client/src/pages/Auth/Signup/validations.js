import * as yup from 'yup';

const validationSchema = yup.object().shape({
    username: yup.string().min(5, "Bitte geben Sie mindestens 5 Zeichen ein.").required("Pflichtfeld!"),
    password: yup.string().min(6, 'Das Passwort muss mindestens 6 Zeichen lang sein!').required('Pflichtfeld!'),
    passwordConfirm: yup.string().oneOf([yup.ref('password')], 'Die Passwörter müssen gleich sein!').required('Pflichtfeld!'),
})

export default validationSchema;