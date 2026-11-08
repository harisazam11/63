// import './App.css';
import '../src/components/styling.scss';
import TodoForm from './components/TodoForm';
function App() {
    

  return (
    <div className='TodoForm'>
    <div >
      <h1>  TODO APP</h1> 
         {/* Calling TodoForm Components */}
         <TodoForm/>    
    </div>
    
    </div>
  );
}

export default App;
