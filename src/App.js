import './view/style.scss';
import Navbar from './components/Navbar';
import NavbarSecond from './components/NavbarSecond';


const App = (props) => (
  <div className="app night">
  <Navbar/>
  <NavbarSecond/>
  {props.children}
</div>
);



export default App;
