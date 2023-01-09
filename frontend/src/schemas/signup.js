import * as yup from 'yup';

const signupSchema = yup.object().shape({
	name: yup
		.string()
		.min(3, 'Минимум 3 символа')
		.max(20, 'Максимум 20 символов')
		.required('Обязательное поле'),
	password: yup.string().min(6, 'Минимум 6 символов').required('Обязательное поле'),
	confirm: yup
		.string()
		.oneOf([yup.ref('password'), null], 'Пароли не совпадают')
		.required('Обязательное поле'),
});

export default signupSchema;
