import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/App.css';
import UploadFile from './Menu/UploadFile';
import PlayButton from './Menu/PlayButton';
import Canvas from './Canvas/Canvas';

const Hello = () => {
  return (
    <div>
      <UploadFile />
      <PlayButton />
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
