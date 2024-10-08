import { GithubAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from './firebase'

/**
 * Sign in user
 */
export const signInWithGithub = async () => {
  const provider = new GithubAuthProvider()
  const result = await signInWithPopup(auth, provider)

  return result
}

/**
 * Sign out user
 */
export const signOut = () => {
  return auth.signOut()
}
