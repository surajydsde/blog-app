import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import PageNotFound from './pages/PageNotFound';
import ErrorBoundary from './components/ErrorBoundary';
import { ToastContainer } from 'react-toastify';
import Footer from './components/Footer';


function App() {
  return (
    <Router>
      <Header />
       <ErrorBoundary>
      <ToastContainer position="top-right"/>
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route element={<PrivateRoute />}>
            <Route path="/create" element={<CreatePost />} />
            <Route path="/edit/:id" element={<EditPost />} />
          </Route>
          <Route path='*' element={<PageNotFound/>} />
        </Routes>
      </div>
      </ErrorBoundary>
      <Footer />
    </Router>
  );
}

export default App;
