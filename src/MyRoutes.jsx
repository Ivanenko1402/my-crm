import { Route, Routes } from "react-router-dom";
import { PeopleCollection } from "./components/MainContent/PeopleColection";
import { TripColection } from "./components/MainContent/TripsColection";
import { PersonEntity } from "./components/MainContent/PersonEntity";
import { TripEntity } from "./components/MainContent/TripEntity";
import { PageNotFound } from "./components/MainContent/PageNotFound";
import { LoginPage } from "./components/MainContent/LoginPage/LoginPage";
import { AuthPage } from "./components/MainContent/AuthPage/AuthPage";

export function MyRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PeopleCollection />} />
      <Route path="/people/:id" element={<PersonEntity />} />

      <Route path="/trips" element={<TripColection />} />
      <Route path="/trips/:id" element={<TripEntity />} />

      <Route path="/registr" element={<AuthPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
