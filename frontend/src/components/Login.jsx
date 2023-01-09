import { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import loginSchema from '../schemas/login';
import DataContext from '../context/DataContext';

const Login = () => {
	const { setUser, authError, setAuthError } = useContext(DataContext);

	const navigate = useNavigate();

	const { t } = useTranslation();

	const onSubmit = async (values, actions) => {
		try {
			setAuthError(undefined);
			const response = await axios.post('/api/v1/login', {
				username: values.name,
				password: values.password
			});
			setUser(response.data);
			navigate('/');
		} catch (error) {
			console.error(error);
			setAuthError(error.response.status === 401 ? t('login.error') : error.response.statusText);
		}

		actions.resetForm();
	};

	const { values, errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit } =
		useFormik({
			initialValues: {
				name: '',
				password: ''
			},
			validationSchema: loginSchema,
			onSubmit
		});

	const errorClassNames = 'small px-2 my-1 text-danger';

	return (
		<div className='container-fluid  bg-light'>
			<div id='login' className='d-flex flex-column justify-content-center align-items-center'>
				<form
					className='col-8 col-md-6 col-xl-4 d-flex flex-column m-3 border rounded-3 p-4 bg-white'
					onSubmit={handleSubmit}
					autoComplete='off'>
					<h1 className='text-dark text-center mb-3 fs-4'>{t('login.header')}</h1>
					<div className='form-floating mb-3'>
						<input
							id='name'
							type='text'
							autoComplete='off'
							placeholder={t('login.enterName')}
							value={values.name}
							onChange={handleChange}
							onBlur={handleBlur}
							className='form-control'
						/>
						<label htmlFor='name'>{t('login.enterName')}</label>
						{errors.name && touched.name && <span className={errorClassNames}>{errors.name}</span>}
					</div>
					<div className='form-floating mb-3'>
						<input
							id='password'
							type='password'
							autoComplete='off'
							placeholder={t('login.enterPwd')}
							value={values.password}
							onChange={handleChange}
							onBlur={handleBlur}
							className='form-control'
						/>
						<label htmlFor='password'>{t('login.enterPwd')}</label>
						{errors.password && touched.password && (
							<p className={errorClassNames}>{errors.password}</p>
						)}
					</div>
					<Button variant='primary' size='lg' disabled={isSubmitting} type='submit'>
						{t('login.enter')}
					</Button>
					{authError && <p className={errorClassNames}>{authError}</p>}
				</form>
				<div className='col-8 col-md-6 col-xl-4 text-center'>
					{t('login.notHaveAcc')} <Link to='/signup'>{t('login.reg')}</Link>
				</div>
			</div>
		</div>
	);
};

export default Login;
