import { useNavigate } from 'react-router-dom';
import './App.css';
import { Button } from './components';
import DevtoolsStatus from './components/devtool/devtoolDetector';
import useDevtoolsStatus from './hooks/useDevtoolsStatus';

function App() {
  // // const navigate = useNavigate()
  // const handleDevtoolsOpen = () => {
  //   // console.log('DevTools are open!');
  //   navigate("https://www.youtube.com/");
  //   // You can perform any action here, such as logging, setting state, etc.
  // };

  // Use the custom hook
  // useDevtoolsStatus(handleDevtoolsOpen);

  return (
    <div className="bg-red-300">
      {/* <DevtoolsStatus /> */}
      <Button>Text3</Button>
    </div>
  );
}

export default App;
