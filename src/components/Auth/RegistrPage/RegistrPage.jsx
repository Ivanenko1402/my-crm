import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../../Hooks/useForm';
import { AuthForm } from '../AuthForm/AuthForm';
import { validateRegistr } from './validateRegistr';
import { Alert } from 'react-bootstrap';
import { registrAuth } from '../../../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const initRegistr = (data = {}) => ({
  email: '',
  password: '',
  displayName: '',
  phoneNumber: '',
});

export const RegistrPage = () => {
  const { auth, isLoading, error } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth) {
      navigate('/')
    }
  }, [auth])

  function submitFunction() {
    dispatch(registrAuth(formValues));
  };

  const [
    formValues,
    onChangeForm,
    errors,
    isPristine,
    submitForm
  ] = useForm({
    data: auth,
    initData: initRegistr,
    validateForm: validateRegistr,
    handleSubmit: submitFunction,
  });

  return (
    <>
      {error && (
        <Alert variant='danger'>
          {error}
        </Alert>
      )}
      <AuthForm
        currentPage={false}
        isLoading={isLoading}
        isPristine={isPristine}
        formValues={formValues}
        errors={errors}
        onChangeForm={onChangeForm}
        submitForm={submitForm}
      />
    </>
  );
};
