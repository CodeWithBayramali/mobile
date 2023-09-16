import * as yup from 'yup'

export const registerValidation = yup.object().shape({
    firstName: yup.string().required('Ad zorunlu alan'),
    middleName: yup.string(),
    lastName: yup.string().required('Soyad zorunlu alan'),
    phoneNumber: yup.string(),
    email: yup.string().email('Lütfen mail formatında giriniz').required('Email zorunlu alan'),
    password: yup.string().required('Prola zorunlu alan'),
    rePassword: yup.string().oneOf([yup.ref('password'),null],'Parola uyuşmuyor'),
})