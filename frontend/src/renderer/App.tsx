import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import UploadFile from './Components/UploadFile';
import PlayButton from './Components/PlayButton';
import Slider from './Components/Slider';
import Knob from './Components/Knob';

const Hello = () => {
  return (
    <div>
      <UploadFile />
      <PlayButton />
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
