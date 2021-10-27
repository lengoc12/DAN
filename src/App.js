import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Header from './components/Header';
import End from  './components/End';
import Categories from './pages/Cateogry';
import Sale from './pages/Sale';
import OrderSearch from './pages/OrderSearch';
import SwipeableTemporaryDrawer from './components/Task';
import New from './pages/NewProducts';
import Product from './pages/Product';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/categories" component={Categories} />
          <Route exact path="/sale" component={Sale} />
          <Route exact path="/ordersearch" component={OrderSearch} />
          <Route exact path="/new" component={New} />
          <Route exact path="/all" component={Product} />
        </Switch>
        <End></End>
      </BrowserRouter>
    </>
  );
}

export default App;
