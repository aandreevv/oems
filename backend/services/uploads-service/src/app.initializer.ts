import admin, { ServiceAccount } from 'firebase-admin';
import * as serviceAccount from '../firebase.json';

export function initFirebase() {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as ServiceAccount),
    storageBucket: `${serviceAccount.project_id}.appspot.com`,
  });
}
