import * as yup from 'yup'

export const loginValidate = yup.object().shape({
    emailOrPhoneNumber:yup.string().required('Email veya Telefon Zorunlu alan'),
    password:yup.string().required('Parola zorunlu alan').min(6,'Parola en az 6 karakter olmalı')
})