import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Detection from './pages/Detection';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/plantas" element={<Catalog />} />
          <Route path="/plantas/:id" element={<Catalog />} />
          <Route path="/detectar" element={<Detection />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
