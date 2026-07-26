import { db } from "./firebase";
import { doc, getDocFromServer, setDoc } from "firebase/firestore";

export async function getPageContent(page: string) {
  try {
    const snap = await getDocFromServer(doc(db, "content", page));
    return snap.exists() ? snap.data() : null;
  } catch { return null; }
}

function cleanUndefined(obj: any): any {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj.map(cleanUndefined);
  }
  const newObj: any = {};
  for (const key of Object.keys(obj)) {
    const val = obj[key];
    if (val !== undefined) {
      newObj[key] = cleanUndefined(val);
    }
  }
  return newObj;
}

export async function savePageContent(page: string, data: object) {
  try {
    const sanitizedData = cleanUndefined(data);
    await setDoc(doc(db, "content", page), sanitizedData, { merge: true });
    return true;
  } catch (error) {
    console.error("Firestore Save Error: ", error);
    return false;
  }
}
