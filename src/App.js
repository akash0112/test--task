import React, { useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import NavBar from './components/Navbar';
import Loading from './components/Loading';


const EventsList = lazy(() => import('./components/EventList'));
const EventForm = lazy(() => import('./components/EventForm'));
const NotFound = lazy(() => import('./components/NotFound'));

const App = () => {
  const [currentEventId, setCurrentEventId] = useState(null);

  return (
    <Provider store={store}>
      <Router>
        <NavBar />
        <Suspense fallback={<Loading/>}>
          <Routes>
            <Route path="/add-event" element={<EventForm currentEventId={currentEventId} setCurrentEventId={setCurrentEventId} />} />
            <Route path="/events" element={<EventsList setCurrentEventId={setCurrentEventId} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </Provider>
  );
};

export default App;
