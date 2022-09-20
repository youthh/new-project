import './App.css';
import MatrixBuilder from "./Components/Matrix/MatrixBuilder";
import {useSelector} from "react-redux";
import Matrix from "./Components/Matrix/Matrix";

function App() {
    const isCreated = useSelector(state => state.matrixSlice.isCreated)

  return (
    <div className="App">
      <div className="container">
            <div className="inner__app">
                {
                    isCreated ? <Matrix/> : <MatrixBuilder/>
                }
            </div>
      </div>
    </div>
  );
}

export default App;
