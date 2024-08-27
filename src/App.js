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
import MovieType from './views/MovieType';
import MovieSearch from './views/MovieSeach'
import MovieCategory from './views/MovieCategory'
import DetailMovie from './views/DetailMovie'

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
            <Route path='/movieType' element={<MovieType/>} />
            <Route path='/movies/edit/:id' element={<MovieEdit/>} />
            <Route path='/movies/detail/:id' element={<Detail/>} />
            <Route path='/detail/movie/:id' element={<DetailMovie/>} />
            <Route path='/user/manage' element={<ManageUser/>} />
            <Route path='/user/edit/:id' element={<EditUser/>} />
            <Route path='/user/bank' element={<UserBank/>} />
            <Route path='/movies' element={<MovieSearch/>} />
            <Route path='/category' element={<MovieCategory/>} />
          </Routes>
        </Router>
      </PostContextProvider>
    </AuthContextProvider>
  );
}

export default App;