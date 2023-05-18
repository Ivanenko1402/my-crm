import { getDatabase, ref, set } from "firebase/database";

export const workingWithDB = async (way, data) => {
  const db = getDatabase();

  await set(ref(db, way), data);
}