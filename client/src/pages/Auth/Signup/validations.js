import * as yup from 'yup';

const validationSchema = yup.object().shape({
    email : yup.string().email('Geben Sie eine gültige E-Mail-Adresse ein!').required('Pflichtfeld!'),
    password : yup.string().min(6,'Das Passwort muss mindestens 6 Zeichen lang sein!').required('Pflichtfeld!'),
    passwordConfirm : yup.string().oneOf([yup.ref('password')], 'Die Passwörter müssen gleich sein!').required('Pflichtfeld!'),
})

export default validationSchema;