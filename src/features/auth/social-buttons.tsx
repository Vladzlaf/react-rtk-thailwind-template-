import { useFirebaseAuth } from '@/entities/auth/api/auth.hooks'
import { auth } from '@/shared/api/firebase/firebase'
import { AppleIcon, FacebookIcon, GoogleIcon } from '@/shared/assets/icons'
import { Button } from '@/shared/ui/button'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

export const SocialButtons = () => {
  const { mutate: firebaseAuth, isPending } = useFirebaseAuth()
  const googleProvider = new GoogleAuthProvider()

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider)
      console.log(result)
      const idToken = await result.user.getIdToken()
      firebaseAuth(idToken)
    } catch (error) {
      console.error('Google login failed:', error)
    }
  }
  return (
    <div className="flex items-center justify-center gap-4 w-full max-w-md">
      <Button
        onClick={handleGoogleLogin}
        disabled={isPending}
        size="icon"
        className=" bg-white p-0"
      >
        <GoogleIcon height={24} width={24} />
      </Button>

      <Button size="icon" className=" bg-white p-0 pl-[3px]">
        <AppleIcon height={24} width={24} />
      </Button>

      <Button size="icon" className=" bg-white p-0">
        <FacebookIcon height={24} width={24} />
      </Button>
    </div>
  )
}
