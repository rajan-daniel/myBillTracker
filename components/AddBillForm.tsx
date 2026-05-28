'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'

export default function AddBillForm() {
  const supabase = createClient()

  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [dueDay, setDueDay] = useState('')
  const [frequency, setFrequency] = useState('monthly')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      alert('You must be logged in')
      return
    }

    const { error } = await supabase.from('bills').insert({
      user_id: user.id,
      name,
      amount: Number(amount),
      due_day: Number(dueDay),
      frequency,
    })

    if (error) {
      console.error(error)
      alert(error.message)
      return
    }

    // clear form
    setName('')
    setAmount('')
    setDueDay('')
    setFrequency('monthly')

    alert('Bill added!')
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          placeholder="Bill name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <div>
        <input
          type="number"
          placeholder="Due day"
          min="1"
          max="31"
          value={dueDay}
          onChange={(e) => setDueDay(e.target.value)}
        />
      </div>

      <div>
        <select
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
        >
          <option value="monthly">Monthly</option>
          <option value="weekly">Weekly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

      <button type="submit">
        Add Bill
      </button>
    </form>
  )
}