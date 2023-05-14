import { Route, Routes } from "react-router-dom";
import { TripList } from "./components/MainContent/TripsList";
import { PersonEntity } from "./components/MainContent/PersonEntity";
import { TripEntity } from "./components/MainContent/TripEntity";
import { PageNotFound } from "./components/PageNotFound";
import { LoginPage } from "./components/LoginPage";
import { AuthPage } from "./components/AuthPage";
import { PersonList } from "./components/MainContent/PersonList/PersonList";

export function MyRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PersonList />} />
      <Route path="/people/:id" element={<PersonEntity />} />

      <Route path="/trips" element={<TripList />} />
      <Route path="/trips/:id" element={<TripEntity />} />
      <Route path="*" element={<PageNotFound />} />

      <Route path="/registr" element={<AuthPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
