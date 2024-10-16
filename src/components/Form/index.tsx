import { useAuth } from '@/providers/AuthProvider'
import styles from './styles.module.css'
import { ChangeEvent, FormEvent, useState } from 'react'
import { toast } from 'sonner'
import { useWeights } from '@/providers/WeightsProvider'

const Form = () => {
  // Services
  const { currentUser } = useAuth()
  const { addWeightOptimistically } = useWeights()

  // Local state
  const [weight, setWeight] = useState<string>('')

  /**
   * Add new weight to firebase
   */
  const saveNewWeight = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!weight.length || isNaN(parseInt(weight))) {
      toast.error('Please enter a valid weight before proceeding')
    } else {
      toast.promise(addWeightOptimistically(weight, currentUser.uid), {
        loading: 'Saving data...',
        success: () => {
          setWeight('')
          return `Weight has been added`
        },
        error: 'Error'
      })
    }
  }

  /**
   * Handle change
   */
  const setValue = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    const regex = /^[\d,]*\.?\d*$/

    if (regex.test(val)) {
      setWeight(val)
    }
  }

  return (
    <div className={styles.formContainer}>
      <form onSubmit={saveNewWeight} className={styles.form}>
        <input type="text" value={weight} onChange={setValue} placeholder="Ready to weight?" />
        <button>Save</button>
      </form>
    </div>
  )
}

export default Form
