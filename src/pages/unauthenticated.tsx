import AuthButton from '@/components/AuthButton'
import Logo from '@/components/Logo'

const Unauthenticated = () => {
  return (
    <div id="login-page">
      <div className="login-content">
        <div className="logo">
          <Logo />
        </div>
        <div className="login-container">
          <h1 className="lg bold">Sign in</h1>
          <p className="sm regular">Use one of the providers bellow to sign in or create and account in Keelo.</p>

          <div className="login-providers">
            <AuthButton type="google" />
            <AuthButton type="github" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Unauthenticated
