import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.css';
import UploadFile from './UploadFile';

const Hello = () => {
  return (
    <div>
      <h1>Hello World Sound Blocks! </h1>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UploadFile />} />
      </Routes>
    </Router>
  );
}
