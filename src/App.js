import {Switch, Route, BrowserRouter} from 'react-router-dom';
import NavbarComponent from './Components/navbar';
import Footer from './Components/footer';
import Home from './routes/home.js';
import {Provider} from 'react-redux';
import {configureStore} from './redux/configureStore.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Chat from './routes/chat';
import Browse from './routes/browse';
import Request from './routes/requests.js'
import ServiceProfile from './routes/serviceProfile';
import AccountDetail from './routes/accountDetail';


const store = configureStore();
function App() {
  return (
    <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/">
          <NavbarComponent/>
          <Route exact path="/" component={Home} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/browse" component={Browse} />
          <Route exact path="/about" component={Home} />
          <Route exact path="/chat" component={Chat} />
          <Route exact path="/requests" component={Request}/>
          <Route exact path="/account" component={AccountDetail} />
          <Route exact path="/service/:providerID" component={ServiceProfile} />
          <Footer/>
        </Route>
      </Switch>
    </BrowserRouter>    
    </Provider>
  );
}

export default App;
