import { useDispatch, useSelector } from 'react-redux';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { validateLogin } from './validateLogin';
import { useForm } from '../../../Hooks/useForm';
import { AuthForm } from '../AuthForm/AuthForm';
import { loginAuth } from '../../../store/slices/authSlice';
import { Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const initAuth = (data = {}) => ({
  email: '',
  password: '',
});

export const LoginPage = () => {
  const { auth, isLoading, error } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth) {
      console.log(auth);
      navigate('/')
    }
  }, [auth])

  function submitFunction() {
    dispatch(loginAuth(formValues));
  };

  const [
    formValues,
    onChangeForm,
    errors,
    isPristine,
    submitForm
  ] = useForm({
    data: auth,
    initData: initAuth,
    validateForm: validateLogin,
    handleSubmit: submitFunction,
  });

  return (
    <div className='d-flex flex-column justify-content-center align-items-center h-100 w-100'>
      {error && (
        <Alert variant='danger'>
          {error}
        </Alert>
      )}
      <AuthForm
        currentPage={true}
        isLoading={isLoading}
        isPristine={isPristine}
        formValues={formValues}
        errors={errors}
        onChangeForm={onChangeForm}
        submitForm={submitForm}
      />
    </div>
  );
};
