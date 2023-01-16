import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import Missing from './components/Missing';
import Signup from './components/Signup';

const App = () => {
	return (
		<>
			<Header />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/login' element={<Login />} />
				<Route path='/signup' element={<Signup />} />
				<Route path='*' element={<Missing />} />
			</Routes>
		</>
	);
};

App.whyDidYouRender = true;

export default App;
