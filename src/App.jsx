import { useState } from "react"

const API_KEY = import.meta.env.VITE_API_KEY

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSearch() {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`)
      const data = await response.json()
      if (data.Response === "False") {
        throw new Error("No movies found")
      }
      setMovies(data.Search)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-gray-950 min-h-screen text-white flex flex-col items-center pt-20 px-4">
      <h1 className="text-3xl font-bold mb-8">Movie Search</h1>
      <div className="flex gap-2 mb-8">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="Search for a movie..."
          className="bg-gray-800 text-white px-4 py-2 rounded-lg outline-none w-64 focus:ring-2 focus:ring-yellow-500"
        />
        <button
          onClick={handleSearch}
          className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-2 rounded-lg font-semibold transition"
        >
          Search
        </button>
      </div>

      {loading && <p className="text-gray-400">Loading...</p>}
      {error && <p className="text-red-400">{error}</p>}

      {movies.length > 0 && !loading && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl">
          {movies.map((movie) => (
            <div key={movie.imdbID} className="bg-gray-800 rounded-xl overflow-hidden">
              <img
                src={movie.Poster !== "N/A" ? movie.Poster : "https://placehold.co/300x450?text=No+Poster"}
                className="w-full h-60 object-cover"
              />              <div className="p-3">
                <h3 className="font-semibold text-sm">{movie.Title}</h3>
                <p className="text-gray-400 text-xs">{movie.Year}</p>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  )
}