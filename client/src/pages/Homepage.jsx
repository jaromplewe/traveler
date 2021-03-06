import React from 'react';
import TravelCalendar from '../components/Calendar/Calendar.jsx';
import TripMenu from '../components/TripMenu/TripMenu.jsx';
import { useGlobalContext } from "../utils/GlobalContext.js";
import Landing from "./Landing.jsx";

const Homepage = () => {
  const [userContext] = useGlobalContext();

  return (
    <main className="grid-x">
      {userContext.isAuth === true ? (
        <>
          <div className="cell medium-3" >
            <TripMenu />
          </div>
          <div className="cell medium-9">
            <TravelCalendar />
          </div>
        </>
      ) : (
          <Landing/>
        )}
    </main>
  );
};

export default Homepage;