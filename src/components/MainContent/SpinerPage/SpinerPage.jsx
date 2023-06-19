import { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const SpinerPage = () => {
  const navigate = useNavigate();
  const { auth } = useSelector(state => state.auth);

  useEffect(() => {
    if (auth) {
      setTimeout(() => {
        navigate('/')
      }, 1500)
    } else {
      setTimeout(() => {
        navigate('/login')
      }, 1500)
    }
  }, [navigate, auth])

  return (
  <div className='d-flex justify-content-center align-items-center h-100 w-100'>
    <Spinner animation="border" role="status" />
  </div>
  );
};