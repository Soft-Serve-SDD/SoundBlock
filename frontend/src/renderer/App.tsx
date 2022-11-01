import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './styles/App.css';
import UploadFile from './UploadFile/UploadFile';
import Canvas from './Canvas/Canvas'
const Hello = () => {
  return (
    <div>
      <h1>Hello World Sound Blocks! </h1>
      <UploadFile />
      <Canvas/>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello/>} />
      </Routes>
    </Router>
  );
}
