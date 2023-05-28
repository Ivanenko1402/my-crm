import { getDatabase, ref, set } from "firebase/database";

export const workingWithDB = async (way, data) => {
  const db = getDatabase();

  const response = await set(ref(db, way), data);
  return response;
}