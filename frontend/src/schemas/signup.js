import * as yup from 'yup';

const signupSchema = yup.object().shape({
	name: yup.string().min(3, 'От 3').max(20, 'до 20 символов').required('Обязательное поле'),
	password: yup.string().min(6, 'Не менее 6 символов').required('Обязательное поле'),
	confirm: yup
		.string()
		.oneOf([yup.ref('password'), null], 'Пароли должны совпадать')
		.required('Обязательное поле')
});

export default signupSchema;
