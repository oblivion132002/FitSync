import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function Login() {

  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (e) => {

    e.preventDefault()

    try {

      const res = await axios.post(
        "https://fitsync-xnav.onrender.com/api/auth/login",
        {
          email,
          password,
        }
      )

      localStorage.setItem("token", res.data.token)

      alert("Login Successful")

      navigate("/dashboard")

    } catch (err) {

      alert(err.response.data.message)

    }

  }

  return (

    <div className="bg-gray-950 min-h-screen flex items-center justify-center">

      <form
        onSubmit={handleLogin}
        className="bg-gray-900 p-10 rounded-2xl w-96"
      >

        <h1 className="text-white text-4xl font-bold mb-8">
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-4 mb-4 rounded-xl bg-gray-800 text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-6 rounded-xl bg-gray-800 text-white mb-6"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-4 rounded-xl"
        >
          Login
        </button>

      </form>

    </div>

  )

}

export default Login