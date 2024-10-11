import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from './firebase'

/**
 * Sign in user with GitHub
 */
export const signInWithGithub = async () => {
  const provider = new GithubAuthProvider()
  const result = await signInWithPopup(auth, provider)

  return result
}

/**
 * Sign in user with Google
 */
export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider()
  const result = await signInWithPopup(auth, provider)

  return result
}

/**
 * Sign out user
 */
export const signOut = () => {
  return auth.signOut()
}
