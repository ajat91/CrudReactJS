import Table from './components/Table';
import{BrowserRouter,Switch,Route} from  "react-router-dom"
import CreateData from "./components/CreateData"
import EditData from "./components/EditData"
import DetailData from "./components/BeratDetail"



const App=()=> {
  return (
    <BrowserRouter>
    
    <div style={{textAlign:"center"}}>
    <h3>Weight Tracker</h3>
    <h3>Ajat</h3>
    </div>
    <Switch>
      <Route exact path="/" component={Table}/>
      <Route exact path="/create" component={CreateData}/>
      <Route exact path="/edit/:id" component={EditData}/>
      <Route exact path="/detail/:id" component={DetailData}/>
    </Switch>
    
    </BrowserRouter>
  
  
  );
}

export default App;
