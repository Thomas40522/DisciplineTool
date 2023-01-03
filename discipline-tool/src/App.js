import logo from './logo.svg';
import './App.css';
import {
  Router,
  Link
} from "react-chrome-extension-router";

import AddWebsite from "./components/AddWebsite";

function App() {
  return (
    <>
      <Router>
        <Link component={AddWebsite}>Add Website</Link>
      </Router>
    </>
  );
}

export default App;
