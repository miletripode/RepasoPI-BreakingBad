import './App.css';
import {BrowserRouter, Route} from 'react-router-dom'
import LandingPage from './components/LandingPage';
import Home from './components/Home';

function App() {
  return (
    <BrowserRouter>
      <Route exact path='/' component={LandingPage}/>
      <Route exact path='/home' component={Home}/>
    </BrowserRouter>
  );
}

export default App;
