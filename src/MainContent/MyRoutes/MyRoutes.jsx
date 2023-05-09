import { Route, Routes } from "react-router-dom";

export function MyRoutes() {
  return (
    <Routes>
      <Route path="/" element={<div>PeoplePage</div>} />
      <Route path="/people/:id" element={<div>EditOrCreatePage</div>} />

      <Route path="/trips" element={<div>TripsPage</div>} />
      <Route path="/trips/:id" element={<div>EditOrCreatePage</div>} />

      <Route path="/registr" element={<div>AuthPage</div>} />
      <Route path="/login" element={<div>LoginPage</div>} />
      <Route path="*" element={<div>PageNotFound</div>} />
    </Routes>
  )
}