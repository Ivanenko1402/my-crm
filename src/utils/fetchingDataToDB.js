import { getDatabase, ref, set } from "firebase/database";

export const fetchingDataToDB = async (way, data) => {
  const db = getDatabase();

  await set(ref(db, way), data);
}