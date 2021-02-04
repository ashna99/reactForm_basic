
import './App.css';
import Button from './components/button/Button';
import Dropdown from './components/dropdown/Dropdown';
import Form from './components/forms/Form';


function App() {
  const helloHandler=(e)=>{
     console.log(e.target);
  }
  const values=['val1','val2','val3']
  return (
    
       <Form name='Lab Report'/>
    
    
  );
}

export default App;
