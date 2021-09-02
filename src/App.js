
import './App.css';
import Header from './components/Header';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SearchPage from './pages/SearchPage';
import FlightsPage from './pages/FlightsPage';
import AboutUsPage from './pages/AboutUsPage';

function App() {
  return (
    <Router>
    <div className="App">
    <Header title="Safe Travels" />
      <Switch>
    
    <div id="content">
        <h1>We’ll Find You The <br /><span>Cheapest Flights</span></h1>

        <Route exact path="/">
          <SearchPage />
        </Route>

        <Route path="/flights">
          <FlightsPage />
        </Route>

        <Route path="/about-us" component={AboutUsPage} />        
       
    </div>
        </Switch>
    </div>
  
    </Router>
  );
}

export default App;