import { useEffect, useState } from "react"
import axios from "axios"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

function Dashboard() {

  const [workouts, setWorkouts] = useState([])
  const [exercise, setExercise] = useState("")
  const [calories, setCalories] = useState("")

  const fetchWorkouts = async () => {

    try {

      const res = await axios.get(
        "https://fitsync-xnav.onrender.com/api/workouts"
      )

      setWorkouts(res.data)

    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchWorkouts()
  }, [])

  const addWorkout = async (e) => {

    e.preventDefault()

    try {

      await axios.post(
        "https://fitsync-xnav.onrender.com/api/workouts",
        {
          exercise,
          calories,
        }
      )

      setExercise("")
      setCalories("")

      fetchWorkouts()

    } catch (err) {
      console.log(err)
    }
  }

  const deleteWorkout = async (id) => {

    try {

      await axios.delete(
        `https://fitsync-xnav.onrender.com/api/workouts/${id}`
      )

      fetchWorkouts()

    } catch (err) {
      console.log(err)
    }
  }

  const logout = () => {

    localStorage.removeItem("token")

    window.location.href = "/login"
  }

  return (
    <div className="bg-gray-950 min-h-screen text-white p-8">

      <div className="flex justify-between items-center mb-10">

        <h1 className="text-4xl font-bold">
          Fitness Dashboard
        </h1>

        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-xl"
        >
          Logout
        </button>

      </div>

      <form
        onSubmit={addWorkout}
        className="bg-gray-900 p-6 rounded-2xl mb-10"
      >

        <h2 className="text-2xl font-bold mb-6">
          Add Workout
        </h2>

        <input
          type="text"
          placeholder="Exercise"
          value={exercise}
          onChange={(e) => setExercise(e.target.value)}
          className="w-full p-4 mb-4 rounded-xl bg-gray-800"
        />

        <input
          type="number"
          placeholder="Calories Burned"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
          className="w-full p-4 mb-6 rounded-xl bg-gray-800"
        />

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-xl"
        >
          Add Workout
        </button>

      </form>

      <div className="bg-gray-900 p-6 rounded-2xl mb-10">

        <h2 className="text-2xl font-bold mb-6">
          Workout Analytics
        </h2>

        <div className="h-72">

          <ResponsiveContainer width="100%" height="100%">

            <BarChart data={workouts}>

              <XAxis dataKey="exercise" />

              <YAxis />

              <Tooltip />

              <Bar dataKey="calories" />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

      <div className="bg-gray-900 p-6 rounded-2xl">

        <h2 className="text-2xl font-bold mb-6">
          Workout History
        </h2>

        <div className="space-y-4">

          {workouts.map((workout) => (

            <div
              key={workout._id}
              className="bg-gray-800 p-4 rounded-xl flex justify-between items-center"
            >

              <div>
                <h3 className="text-xl font-bold">
                  {workout.exercise}
                </h3>

                <p className="text-gray-400">
                  {workout.calories} Calories
                </p>
              </div>

              <button
                onClick={() => deleteWorkout(workout._id)}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
              >
                Delete
              </button>

            </div>

          ))}

        </div>

      </div>

    </div>
  )
}

export default Dashboard