import logo from './logo.svg';
import './App.css';
import {
  Router,
  Link
} from "react-chrome-extension-router";

import AddWebsite from "./components/AddWebsite";
import Setting from "./components/Setting";

function App() {
  return (
    <>
      <Router>
        <Setting/>
        {/* <Link component={AddWebsite}>Report</Link> */}
      </Router>
    </>
  );
}

export default App;
