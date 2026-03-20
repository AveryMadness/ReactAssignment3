import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GenreProvider } from './context/GenreContext';
import HomePage from './pages/HomePage/HomePage';
import MovieDetailsPage from './pages/MovieDetailsPage/MovieDetailsPage';
import './App.module.css';

// Root application component with routing and context providers
function App() {
  return (
    <GenreProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movie/:id" element={<MovieDetailsPage />} />
        </Routes>
      </BrowserRouter>
    </GenreProvider>
  );
}

export default App;
