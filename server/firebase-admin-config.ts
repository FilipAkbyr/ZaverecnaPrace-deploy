import * as admin from "firebase-admin";
import path from "path";


if (admin.apps.length === 0) {
  // Initialize Firebase
  admin.initializeApp({
    credential: admin.credential.cert(path.resolve(process.cwd(), "firebase-adminsdk.json")),
  });
}

export const { firestore, auth: adminAuth } = admin;