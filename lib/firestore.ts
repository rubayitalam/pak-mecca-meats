import { db } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export async function getPageContent(page: string) {
  try {
    const snap = await getDoc(doc(db, "content", page));
    return snap.exists() ? snap.data() : null;
  } catch { return null; }
}

export async function savePageContent(page: string, data: object) {
  try {
    await setDoc(doc(db, "content", page), data, { merge: true });
    return true;
  } catch { return false; }
}
