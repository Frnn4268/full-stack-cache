import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';  

function Home() {
  return <h1>Welcome to the Dashboard</h1>;
}

function DataSection({ data }) {
  return (
    <div>
      <h1>Data from Backend</h1>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading...</p>}
    </div>
  );
}

function SessionViews({ getSessionViews, sessionViews }) {
  return (
    <div>
      <h2>Session Views</h2>
      <button onClick={getSessionViews}>Check Session Views</button>
      {sessionViews && <p>{sessionViews}</p>}
    </div>
  );
}

function PageViews({ getPageViews, pageViews }) {
  return (
    <div>
      <h2>Page Views</h2>
      <button onClick={getPageViews}>Check Page Views</button>
      {pageViews !== null && <p>Page views: {pageViews}</p>}
    </div>
  );
}

function App() {
  const [data, setData] = useState(null);
  const [sessionViews, setSessionViews] = useState(null);
  const [pageViews, setPageViews] = useState(null);

  useEffect(() => {
    fetch('/api/data')
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error('Error fetching data:', err));
  }, []);

  const getSessionViews = () => {
    fetch('/session')
      .then((res) => res.text())
      .then((text) => setSessionViews(text))
      .catch((err) => console.error('Error fetching session views:', err));
  };

  const getPageViews = () => {
    fetch('/api/page-views')
      .then((res) => res.json())
      .then((data) => setPageViews(data.pageViews))
      .catch((err) => console.error('Error fetching page views:', err));
  };

  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/data">Data</Link></li>
            <li><Link to="/session-views">Session Views</Link></li>
            <li><Link to="/page-views">Page Views</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/data" element={<DataSection data={data} />} />
          <Route path="/session-views" element={<SessionViews getSessionViews={getSessionViews} sessionViews={sessionViews} />} />
          <Route path="/page-views" element={<PageViews getPageViews={getPageViews} pageViews={pageViews} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
