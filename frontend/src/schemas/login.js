import * as yup from 'yup';

// const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

const loginSchema = yup.object().shape({
	name: yup.string().min(3, 'Минимум 3 символа').required('Обязательное поле'),
	password: yup.string().min(5, 'Минимум 5 символов').required('Обязательное поле'),
});

export default loginSchema;
