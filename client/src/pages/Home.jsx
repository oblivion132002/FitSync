import { Link } from "react-router-dom"

function Home() {

  return (
    <div className="bg-gray-950 text-white min-h-screen flex flex-col justify-center items-center px-6">

      <h1 className="text-6xl font-bold mb-6 text-center">
        FitSync
      </h1>

      <p className="text-gray-400 text-xl mb-10 text-center max-w-2xl">
        Smart fitness tracking platform that helps users monitor workouts,
        calories, and progress analytics in real time.
      </p>

      <div className="flex gap-6">

        <Link to="/register">
          <button className="bg-blue-500 hover:bg-blue-600 px-8 py-4 rounded-2xl text-lg">
            Get Started
          </button>
        </Link>

        <Link to="/login">
          <button className="bg-gray-800 hover:bg-gray-700 px-8 py-4 rounded-2xl text-lg">
            Login
          </button>
        </Link>

      </div>

    </div>
  )
}

export default Home