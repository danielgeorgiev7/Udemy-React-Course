import CityItem from './CityItem'
import styles from './CityList.module.css'
import Spinner from './Spinner'
import Message from './Message'
import { useCities } from '../contexts/CitiesContext'

function CityList() {
    const {cities, isLoading, currentCity, getCity} = useCities();
    if(isLoading) return <Spinner/>
    if(!cities?.length) return (<Message message="Add your first city by clicking on a city on the map" />);

    return (
        <ul className={styles.cityList}>
            {cities.map((city) =>  (
            <CityItem cityName={city.cityName} date={city.date} emoji={city.emoji} id={city.id} position={city.position} key={city.id} />
            ))}
        </ul>
    )
}

export default CityList
