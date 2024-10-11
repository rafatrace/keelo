import { useAuth } from '@/providers/AuthProvider'
import styles from './styles.module.css'
import { FormEvent, useState } from 'react'
import { addWeight } from '@/queries/weights'

type TFormProps = {
  fetchAllWeights: () => void
}

const Form = ({ fetchAllWeights }: TFormProps) => {
  // Services
  const { currentUser } = useAuth()

  // Local state
  const [weight, setWeight] = useState<string>('')

  /**
   * Add new weight to firebase
   */
  const saveNewWeight = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await addWeight(weight, currentUser.uid)
    fetchAllWeights()
    setWeight('')
  }

  return (
    <form onSubmit={saveNewWeight} className={styles.form}>
      <input type="text" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="Ready to weight?" />
      <button>Save</button>
    </form>
  )
}

export default Form
