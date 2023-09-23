import TopBar from './components/TopBar';
import LeftNavBar from './components/LeftNavBar';
import RouterPage from './components/Router';

function App() {
  return (
    <div >
      <TopBar/>
      <div className='flex mt-20'>
        <LeftNavBar/>
        <RouterPage/>
      </div>
    </div>
  );
}

export default App;
