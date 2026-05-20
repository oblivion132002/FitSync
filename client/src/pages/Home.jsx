import { Link } from "react-router-dom"

function Home() {
  return (
    <div className="bg-gray-950 min-h-screen text-white">

      <nav className="flex justify-between items-center px-10 py-6 border-b border-gray-800">
        <h1 className="text-3xl font-bold text-blue-500">
          FitSync
        </h1>

        <div className="space-x-6">

        <Link
            to="/"
            className="hover:text-blue-400"
        >
        Home
        </Link>

        <Link
            to="/login"
            className="hover:text-blue-400"
        >
        Login
  </Link>

</div>
      </nav>

      <section className="flex flex-col items-center justify-center text-center px-6 py-32">

        <h2 className="text-6xl font-bold max-w-4xl leading-tight mb-6">
          Track Your Fitness Journey Smarter
        </h2>

        <p className="text-gray-400 text-xl max-w-2xl mb-10">
          Monitor workouts, calories, goals, and progress all in one place.
        </p>

        <Link
        to="/login"
        className="bg-blue-500 hover:bg-blue-600 px-8 py-4 rounded-xl text-lg font-semibold"
        >
        Get Started
        </Link>

      </section>

    </div>
  )
}

export default Home