import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Dashboard } from './pages/dashboard';
import { Auth } from './pages/auth';
import { Button, Flex, useColorMode } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';

function App() {
  const { colorMode, toggleColorMode } = useColorMode();
  
  return (<>
  <header>
      <Flex justify={'space-between'} pt={4}>
        <h2>Personal Anime Watchlist</h2>
      <Button onClick={toggleColorMode}>
        {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
      </Button>
      </Flex>
    </header>
    <Router>
        <div className='app-container'>
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/auth' element={<Auth />} />
          </Routes>
        </div>
    </Router>
  </>
   )
}

export default App
