import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: __API_KEY__,
  authDomain: __AUTH_DOMAIN__,
  projectId: __PROJECT_ID__,
  storageBucket: __STORAGE_BUCKET__,
  messagingSenderId: __MESSAGING_SENDER_ID__,
  appId: __APP_ID__,
  measurementId: __MEASUREMENT_ID__
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export { app, auth }
