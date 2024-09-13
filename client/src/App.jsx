import { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState(null);
  const [sessionViews, setSessionViews] = useState(null);
  const [pageViews, setPageViews] = useState(null);

  // Fetch data from /api/data
  useEffect(() => {
    fetch('/api/data')
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error('Error fetching data:', err));
  }, []);

  // Fetch session views
  const getSessionViews = () => {
    fetch('/session')
      .then((res) => res.text())
      .then((text) => setSessionViews(text))
      .catch((err) => console.error('Error fetching session views:', err));
  };

  // Fetch page views
  const getPageViews = () => {
    fetch('/page-views')
      .then((res) => res.json())
      .then((data) => setPageViews(data.pageViews))
      .catch((err) => console.error('Error fetching page views:', err));
  };

  return (
    <div className="App">
      <h1>Data from Backend</h1>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading...</p>}

      <h2>Session Views</h2>
      <button onClick={getSessionViews}>Check Session Views</button>
      {sessionViews && <p>{sessionViews}</p>}

      <h2>Page Views</h2>
      <button onClick={getPageViews}>Check Page Views</button>
      {pageViews !== null && <p>Page views: {pageViews}</p>}
    </div>
  );
}

export default App;
