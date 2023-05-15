import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const PageNotFound = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  useEffect (() => {
    setTimeout(() => {
      navigate(isLoggedIn ? '/' : '/login');
    }, 1000)
  })

  return (
    <div>
      PageNotFound
    </div>
  )
}