import { Route, Routes } from "react-router-dom";
import { TripList } from "./components/MainContent/TripsList";
import { PersonEntity } from "./components/MainContent/PersonEntity";
import { TripEntity } from "./components/MainContent/TripEntity";
import { PageNotFound } from "./components/PageNotFound";
import { PersonList } from "./components/MainContent/PersonList/PersonList";
import { LoginPage } from "./components/Auth/LoginPage/LoginPage";
import { RegistrPage } from "./components/Auth/RegistrPage/RegistrPage";
import { SpinerPage } from "./components/MainContent/SpinerPage/SpinerPage";

export function MyRoutes({ isLoggedIn }) {
  return (
    <>
      {isLoggedIn ? (
        <Routes>
          <Route path="/" element={<PersonList />} />
          <Route path="/people/:id" element={<PersonEntity />} />

          <Route path="/trips" element={<TripList />} />
          <Route path="/trips/:id" element={<TripEntity />} />

          <Route path="/registr" element={<SpinerPage />} />
          <Route path="/login" element={<SpinerPage />} />

          <Route path="*" element={<PageNotFound isLoggedIn={isLoggedIn} />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="*" element={<SpinerPage />} />

          <Route path="/registr" element={<RegistrPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      )}
    </>

  );
}