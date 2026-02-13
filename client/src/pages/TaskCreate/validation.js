import * as yup from "yup";

const validationNew = yup.object().shape({
    title : yup.string().required(),
    kartonType : yup.string().required(),
    productquantity : yup.number().required(),
    boxquantity : yup.number().required(),
    createdAt : yup.date(),
})

export default validationNew ; 