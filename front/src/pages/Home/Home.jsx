import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/UserComponentContext'

export const Home = () => {
  const { user } = useContext(UserContext)

  console.log(user)
  const navigate = useNavigate()
  return (
    <>
      <h1>Welcome {user.name}!</h1>
      <button
        onClick={() => {
          navigate('/logout')
        }}>
        Disconnect
      </button>
    </>
  )
}
