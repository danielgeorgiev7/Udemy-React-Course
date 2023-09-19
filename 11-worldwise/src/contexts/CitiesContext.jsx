import { createContext, useState, useEffect, useContext } from "react";

const CitiesContext = createContext();

const BASE_URL = "http://localhost:9000";

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});


  useEffect(function () {
    try {
      async function fetchCities() {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      }
      fetchCities();
    } catch (err) {
      alert("There is an error:" + err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  function getCity(id) {
      try {
        setIsLoading(true);
        async function fetchCities() {
          const res = await fetch(`${BASE_URL}/cities/${id}`);
          const data = await res.json();
          setCurrentCity(data);
        }
        fetchCities();
      } catch (err) {
        alert("There is an error:" + err);
      } finally {
        setIsLoading(false);
      }
  }

  return <CitiesContext.Provider value={{
    cities, isLoading, currentCity, getCity
  }}>{children}</CitiesContext.Provider>
}

function useCities(){
const context = useContext(CitiesContext);
if(context === undefined){
throw new Error("CitiesContext was used outside of CitiesProvider");
}
return context
}
export {CitiesProvider, useCities}