import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './components/layout/Landing';
import Auth from './views/Auth';
import './App.css';
import AuthContextProvider from './contexts/AuthContext';
import Dashboard from './views/Dashboard';
import PostContextProvider from './contexts/PostContext';
import MoviesLists from './views/MoviesLists';
import MovieAdd from './views/MovieAdd';
import MovieEdit from './views/MovieEdit';
import Detail from './views/MovieDetail';
import ManageUser from './views/ManageUser';
import EditUser from './views/EditUser';
import UserBank from './views/UserBank';
import OddMovies from './views/OddMovies';
import NewMovies from './views/NewMovies';
import SeriesMovies from './views/SeriesMovies';

function App() {
  return (
    <AuthContextProvider>
      <PostContextProvider>
        <Router>
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/login' element={<Auth authRoute='login' />} />
            <Route path='/register' element={<Auth authRoute='register' />} />
            <Route path='/dashboard' element={<Dashboard/>} />
            <Route path='/movies/list' element={<MoviesLists/>} />
            <Route path='/movies/add' element={<MovieAdd/>} />
            <Route path='/movies/newmovies' element={<NewMovies/>} />
            <Route path='/movies/oddmovies' element={<OddMovies/>} />
            <Route path='/movies/seriesmovies' element={<SeriesMovies/>} />
            <Route path='/movies/edit/:id' element={<MovieEdit/>} />
            <Route path='/movies/detail/:id' element={<Detail/>} />
            <Route path='/user/manage' element={<ManageUser/>} />
            <Route path='/user/edit/:id' element={<EditUser/>} />
            <Route path='/user/bank' element={<UserBank/>} />
          </Routes>
        </Router>
      </PostContextProvider>
    </AuthContextProvider>
  );
}

export default App;
