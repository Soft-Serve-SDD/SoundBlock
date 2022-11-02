import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/App.css';
import UploadFile from './Menu/UploadFile';
import Canvas from './Canvas/Canvas';
const Hello = () => {
  return (
    <div>
      <UploadFile />
      <Canvas />
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
