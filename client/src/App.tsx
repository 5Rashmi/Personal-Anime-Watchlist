import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Dashboard } from './pages/dashboard';
import { Auth } from './pages/auth';
import logo from '../img/logo.png'
import { Button, Flex, useColorMode, Image } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import { AnimeRecordsProvider } from './contexts/anime-record-context';

function App() {
  const { colorMode, toggleColorMode } = useColorMode();
  
  return (<>
  <header>
      <Flex justify={'space-between'} align={'center'} px={4}>
        <Image src={logo} alt="Logo" boxSize="120px" />
        <Button onClick={toggleColorMode} variant={'outline'}>
          {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        </Button>
      </Flex>
    </header>
    <Router>
        <div className='app-container'>
          <Routes>
            <Route path='/' element={<AnimeRecordsProvider>
              <Dashboard />
            </AnimeRecordsProvider>} />
            <Route path='/auth' element={<Auth />} />
          </Routes>
        </div>
    </Router>
  </>
   )
}

export default App
