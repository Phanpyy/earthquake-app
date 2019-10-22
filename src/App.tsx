import React, {useEffect, useState} from 'react';
import logo from './assets/logo.svg';
import './App.css';
import EarthquakeApi from './api/EarthquakeApi';
import Earthquake from './models/Earthquake';

const REFRESH_INTERVAL = 30000; // 30 seconds

const App: React.FC = () => {
    const [earthquakes, setEarthquakes] = useState<Earthquake[]>([]);
    const [refreshAutomatically, setRefreshAutomatically] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            const earthquakes = await EarthquakeApi.getEarthquakesToday();
            setEarthquakes(earthquakes);
        };

        fetchData();

        if (refreshAutomatically) {
            const interval = setInterval((): void => {
                fetchData();
            }, REFRESH_INTERVAL);

            return (): void => clearInterval(interval);
        }
    }, [refreshAutomatically]);

    return (
        <div className='App'>
            <header className='App-header'>
                <img src={logo} className='App-logo' alt='logo'/>
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a
                    className='App-link'
                    href='https://reactjs.org'
                    target='_blank'
                    rel='noopener noreferrer'
                >
                    Learn React
                </a>
                <div>
                    {
                        earthquakes.map(earthquake =>
                            <p key={earthquake.id}>
                                {earthquake.properties.place} - {earthquake.properties.mag}
                            </p>
                        )
                    }
                </div>
            </header>
        </div>
    );
};

export default App;
