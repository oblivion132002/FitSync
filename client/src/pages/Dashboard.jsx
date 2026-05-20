import { useEffect, useState } from "react"
import axios from "axios"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts"

function Dashboard() {

  const user = JSON.parse(
    localStorage.getItem("user")
  )

  const [workouts, setWorkouts] = useState([])

  const [workoutName, setWorkoutName] = useState("")
  const [duration, setDuration] = useState("")
  const [calories, setCalories] = useState("")

  const fetchWorkouts = async () => {

    try {

      const response = await axios.get(
        `http://localhost:5000/api/workouts/${user.id}`
      )

      setWorkouts(response.data)

    } catch (error) {

      console.log(error)

    }

  }

  useEffect(() => {

    fetchWorkouts()

  }, [])

  const addWorkout = async (e) => {

    e.preventDefault()

    try {

      await axios.post(
        "http://localhost:5000/api/workouts",
        {
          userId: user.id,
          workoutName,
          duration,
          calories
        }
      )

      setWorkoutName("")
      setDuration("")
      setCalories("")

      fetchWorkouts()

    } catch (error) {

      console.log(error)

    }

  }

  const deleteWorkout = async (id) => {

    try {

      await axios.delete(
        `http://localhost:5000/api/workouts/${id}`
      )

      fetchWorkouts()

    } catch (error) {

      console.log(error)

    }

  }

  const totalCalories = workouts.reduce(
    (acc, workout) => acc + Number(workout.calories),
    0
  )

  const totalDuration = workouts.reduce(
    (acc, workout) => acc + Number(workout.duration),
    0
  )

  const chartData = workouts.map((workout) => ({
    name: workout.workoutName,
    calories: Number(workout.calories)
  }))

  return (
    <div className="bg-gray-950 min-h-screen text-white p-10">

      <div className="flex justify-between items-center mb-10">

        <div>
          <h1 className="text-5xl font-bold">
            Dashboard
          </h1>

          <p className="text-gray-400 mt-2">
            Welcome back, {user?.username}
          </p>
        </div>

        <button
          onClick={() => {
            localStorage.clear()
            window.location.href = "/login"
          }}
          className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-xl"
        >
          Logout
        </button>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        <div className="bg-gray-900 p-8 rounded-2xl">
          <h2 className="text-xl mb-2">
            Total Calories
          </h2>

          <p className="text-4xl font-bold text-blue-400">
            {totalCalories}
          </p>
        </div>

        <div className="bg-gray-900 p-8 rounded-2xl">
          <h2 className="text-xl mb-2">
            Total Workout Time
          </h2>

          <p className="text-4xl font-bold text-green-400">
            {totalDuration} mins
          </p>
        </div>

        <div className="bg-gray-900 p-8 rounded-2xl">
          <h2 className="text-xl mb-2">
            Workouts Logged
          </h2>

          <p className="text-4xl font-bold text-purple-400">
            {workouts.length}
          </p>
        </div>

      </div>

      <div className="bg-gray-900 p-8 rounded-2xl mb-10">

        <h2 className="text-2xl font-bold mb-6">
          Calories Burned Analytics
        </h2>

        <ResponsiveContainer width="100%" height={300}>

          <BarChart data={chartData}>

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Bar dataKey="calories" fill="#3B82F6" />

          </BarChart>

        </ResponsiveContainer>

      </div>

      <form
        onSubmit={addWorkout}
        className="bg-gray-900 p-8 rounded-2xl mb-10"
      >

        <h2 className="text-2xl font-bold mb-6">
          Add Workout
        </h2>

        <input
          type="text"
          placeholder="Workout Name"
          value={workoutName}
          onChange={(e) => setWorkoutName(e.target.value)}
          className="w-full p-4 mb-4 rounded-xl bg-gray-800"
        />

        <input
          type="number"
          placeholder="Duration (minutes)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
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

      <div className="grid gap-6">

        {workouts.map((workout) => (

          <div
            key={workout._id}
            className="bg-gray-900 p-6 rounded-2xl flex justify-between items-center"
          >

            <div>
              <h2 className="text-2xl font-bold">
                {workout.workoutName}
              </h2>

              <p className="text-gray-400">
                Duration: {workout.duration} mins
              </p>

              <p className="text-gray-400">
                Calories: {workout.calories}
              </p>
            </div>

            <button
              onClick={() => deleteWorkout(workout._id)}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl"
            >
              Delete
            </button>

          </div>

        ))}

      </div>

    </div>
  )
}

export default Dashboard