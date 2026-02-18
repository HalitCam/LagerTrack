import * as yup from "yup";

const validationNew = yup.object().shape({
    title : yup.string().required(),
    kartonType : yup.string().required(),
    productquantity : yup.number().required(),
    boxquantity : yup.number().required(),
    createdAt : yup.date(),
    responsible : yup.string(),
    fbaEtiket: yup.mixed()
    .required("Eine PDF-Datei ist erforderlich")
    .test(
      "fileType",
      "Nur PDF-Dateien sind erlaubt",
      (value) => {
        if (!value) return false;
        return value.type === "application/pdf";
      }
    )
    .test(
      "fileSize",
      "Die Datei darf maximal 5MB groß sein",
      (value) => {
        if (!value) return false;
        return value.size <= 5 * 1024 * 1024;
      }
    ),
    dhlEtiket: yup.mixed()
    .required("Eine PDF-Datei (DHL) ist erforderlich")
    .test(
      "fileType",
      "Nur PDF-Dateien sind erlaubt",
      (value) => {
        if (!value) return false;
        return value.type === "application/pdf";
      }
    )
    .test(
      "fileSize",
      "Die Datei darf maximal 5 MB groß sein",
      (value) => {
        if (!value) return false;
        return value.size <= 5 * 1024 * 1024;
      }
    ),
})

export default validationNew ; 