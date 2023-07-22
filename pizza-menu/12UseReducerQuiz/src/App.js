import './App.css';
import { Header, Main } from './component/index'
import { QuizProvider } from './hook/QuizContext';


function App() {




  return (
    <div className="app">
      <Header />
      <QuizProvider>
        <Main />
      </QuizProvider>

    </div>
  );
}

export default App;


// import DateCounter from './DateCounter';
{/* <DateCounter /> */ }
