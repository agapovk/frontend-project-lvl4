/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import signupSchema from '../schemas/signup';
import DataContext from '../context/DataContext';

const Signup = () => {
  const { setUser, signupError, setSignupError } = useContext(DataContext);

  const navigate = useNavigate();

  const { t } = useTranslation();

  const onSubmit = async (values, actions) => {
    try {
      setSignupError(undefined);
      const response = await axios.post('/api/v1/signup', {
        username: values.name,
        password: values.password,
      });
      setUser(response.data);
      navigate('/');
    } catch (error) {
      console.error(error);
      setSignupError(
        error.response.status === 409
          ? t('signup.error')
          : error.response.statusText,
      );
    }

    actions.resetForm();
  };

  useEffect(() => {
    setSignupError(undefined);
  }, []);

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      name: '',
      password: '',
      confirm: '',
    },
    validationSchema: signupSchema,
    onSubmit,
  });

  const errorClassNames = 'small px-2 my-1 text-danger';

  return (
    <div className="container-fluid  bg-light">
      <div
        id="login"
        className="d-flex flex-column justify-content-center align-items-center"
      >
        <form
          className="col-8 col-md-6 col-xl-4 d-flex flex-column m-3 border rounded-3 p-4 bg-white"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <h1 className="text-dark text-center mb-3 fs-4">
            {t('signup.header')}
          </h1>
          <div className="form-floating mb-3">
            <input
              id="name"
              type="text"
              autoComplete="off"
              placeholder={t('signup.enterName')}
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className="form-control"
            />
            <label htmlFor="name">{t('signup.enterName')}</label>
            {errors.name && touched.name && (
              <p className={errorClassNames}>{errors.name}</p>
            )}
          </div>
          <div className="form-floating mb-3">
            <input
              id="password"
              type="password"
              autoComplete="off"
              placeholder={t('signup.enterPwd')}
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className="form-control"
            />
            <label htmlFor="password">{t('signup.enterPwd')}</label>
            {errors.password && touched.password && (
              <p className={errorClassNames}>{errors.password}</p>
            )}
          </div>
          <div className="form-floating mb-3">
            <input
              id="confirm"
              type="password"
              autoComplete="off"
              placeholder={t('signup.confirmPwd')}
              value={values.confirm}
              onChange={handleChange}
              onBlur={handleBlur}
              className="form-control"
            />
            <label htmlFor="confirm">{t('signup.confirmPwd')}</label>
            {errors.confirm && touched.confirm && (
              <p className={errorClassNames}>{errors.confirm}</p>
            )}
          </div>
          <Button
            variant="success"
            size="lg"
            disabled={isSubmitting}
            type="submit"
          >
            {t('signup.signup')}
          </Button>
          {signupError && <p className={errorClassNames}>{signupError}</p>}
        </form>
      </div>
    </div>
  );
};

Signup.whyDidYouRender = true;

export default Signup;
