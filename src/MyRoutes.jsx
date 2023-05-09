import { Route, Routes } from "react-router-dom";
import { PeopleCollection } from "./components/MainContent/PeopleColection/PeopleColection";
import { EditOrCreatePerson } from "./components/MainContent/EditOrCreatePerson/EditOrCreatePerson";
import { TripColection } from "./components/MainContent/TripsColection/TripColection";
import { EditOrCreateTrip } from "./components/MainContent/EditOrCreateTrip/EditOrCreateTrip";

export function MyRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PeopleCollection />} />
      <Route path="/people/:id" element={<EditOrCreatePerson />} />

      <Route path="/trips" element={<TripColection />} />
      <Route path="/trips/:id" element={<EditOrCreateTrip />} />

      <Route path="/registr" element={<div>AuthPage</div>} />
      <Route path="/login" element={<div>LoginPage</div>} />
      <Route path="*" element={<div>PageNotFound</div>} />
    </Routes>
  )
}