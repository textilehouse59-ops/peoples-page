import { useState } from 'react'

const CITIES = [
  'All Pakistan',
  'Karachi',
  'Lahore',
  'Islamabad',
  'Rawalpindi',
  'Faisalabad',
  'Multan',
  'Peshawar',
  'Quetta',
  'Sialkot',
]

const CATEGORIES = [
  'Restaurants',
  'Cafes',
  'Salons',
  'Clinics',
  'Pharmacies',
  'Groceries',
  'Electronics',
  'Fashion',
  'Auto Services',
  'Home Services',
  'Education',
  'Fitness',
]

export default function App() {
  const [query, setQuery] = useState('')
  const [city, setCity] = useState(CITIES[0])
  const [category, setCategory] = useState(null)

  function handleSubmit(event) {
    event.preventDefault()
    // Real searching will be added once Supabase is connected.
  }

  return (
    <div className="app">
      <div className="glow glow-one" aria-hidden="true" />
      <div className="glow glow-two" aria-hidden="true" />

      <header className="topbar">
        <a className="brand" href="/">
          <span className="brand-mark">P</span>
          <span className="brand-name">Peoples Page</span>
        </a>
        <nav className="nav" aria-label="Main">
          <a href="/">Discover</a>
          <a href="/">Categories</a>
          <a href="/">Cities</a>
        </nav>
      </header>

      <main className="container">
        <section className="hero">
          <p className="eyebrow">Business discovery for Pakistan</p>
          <h1>
            Find the <span className="accent">right place</span>, right near you.
          </h1>
          <p className="lead">
            Search businesses by name, category or city.
          </p>

          <form className="search glass" onSubmit={handleSubmit}>
            <input
              type="search"
              placeholder="Search businesses or services"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search businesses or services"
            />
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              aria-label="Choose city"
            >
              {CITIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <button type="submit">Search</button>
          </form>
        </section>

        <section className="section" aria-labelledby="cat-title">
          <h2 id="cat-title">Browse by category</h2>
          <div className="chips">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                className={'chip glass' + (category === c ? ' active' : '')}
                onClick={() => setCategory(category === c ? null : c)}
              >
                {c}
              </button>
            ))}
          </div>
        </section>

        <section className="section" aria-labelledby="results-title">
          <h2 id="results-title">Businesses</h2>
          <div className="empty glass">
            <p className="empty-title">No listings yet</p>
            <p className="empty-text">
              Business listings will appear here once real data is connected.
              {category ? ` Selected category: ${category}.` : ''}
              {city !== CITIES[0] ? ` City: ${city}.` : ''}
            </p>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>© Peoples Page</p>
      </footer>
    </div>
  )
}
