import { useEffect } from "react";

export const PageNotFound = () => {
  useEffect (() => {
    setTimeout(() => {
      window.location.href = '/my-crm';
    }, 1000)
  })

  return (
    <div>
      PageNotFound
    </div>
  )
}