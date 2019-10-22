import React, {useEffect, useState} from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css'
import './App.css';
import ReactTooltip from 'react-tooltip';
import EarthquakeApi from './api/EarthquakeApi';
import Earthquake from './models/Earthquake';
import MapChart from './components/MapChart';
import {CheckboxAndLabel} from './components/Checkbox';

const REFRESH_INTERVAL = 30000; // 30 seconds

const FILTER_NONE = 'filterNone';
const FILTER_TIME = 'filterTime';
const FILTER_MAGNITUDE = 'filterMagnitude';

const FILTER_NONE_TEXT = 'no filter';
const FILTER_TIME_TEXT = 'filter after most recent';
const FILTER_MAGNITUDE_TEXT = 'filter after strongest';

const DROP_DOWN_OPTIONS = [
    {value: FILTER_NONE, label: FILTER_NONE_TEXT},
    {value: FILTER_TIME, label: FILTER_TIME_TEXT},
    {value: FILTER_MAGNITUDE, label: FILTER_MAGNITUDE_TEXT}
];

const EARTHQUAKES_DATA_REFRESH_TEXT = 'Earthquakes data were refreshed.';
const EARTHQUAKES_DATA_REFRESH_LABEL = 'refresh automatically';

/**
 * Entry point to actual web application.
 *
 * @constructor
 */
const App: React.FC = () => {
    const [earthquakes, setEarthquakes] = useState<Earthquake[]>([]);
    const [refreshAutomatically, setRefreshAutomatically] = useState<boolean>(false);
    const [toolTipContent, setToolTipContent] = useState<string>('');
    const [filterOption, setFilterOption] = useState<string>(FILTER_NONE);
    const [inputFilterNumber, setInputFilterNumber] = useState<number | undefined>(undefined);

    /**
     * OnComponentMount - fetch earthquake data
     * OnComponentUpdate - rerender when refreshAutomatically state changed
     * OnComponentWillUnmount - clear interval if refreshAutomatically state was set to true
     *
     * @function useEffect
     */
    useEffect(() => {
        // declare function to fetch data
        const fetchData = async (): Promise<void> => {
            let fetchEarthquakes = await EarthquakeApi.getEarthquakesToday();

            let sorted: Earthquake[];
            if (filterOption !== FILTER_NONE && inputFilterNumber) {
                switch (filterOption) {
                case FILTER_TIME:
                    sorted = fetchEarthquakes.sort((ea1, ea2) => ea2.properties.time - ea1.properties.time);
                    fetchEarthquakes = sorted.slice(0, inputFilterNumber);
                    break;

                case FILTER_MAGNITUDE:
                    sorted = fetchEarthquakes.sort((ea1, ea2) => ea2.properties.mag - ea1.properties.mag);
                    fetchEarthquakes = sorted.slice(0, inputFilterNumber);
                    break;
                }
            }

            setEarthquakes(fetchEarthquakes);
        };

        fetchData();

        if (refreshAutomatically) {
            const interval = setInterval(async (): Promise<void> => {
                await fetchData();
                alert(EARTHQUAKES_DATA_REFRESH_TEXT)
            }, REFRESH_INTERVAL);

            // function is executed, when component will unmount
            return (): void => clearInterval(interval);
        }
    }, [refreshAutomatically, filterOption, inputFilterNumber]);

    return (
        <div className='App'>
            <MapChart setTooltipContent={setToolTipContent} earthquakes={earthquakes}/>
            <ReactTooltip>{toolTipContent}</ReactTooltip>
            <CheckboxAndLabel
                checked={refreshAutomatically}
                label={EARTHQUAKES_DATA_REFRESH_LABEL}
                onChange={setRefreshAutomatically}
            />
            <div style={{flexDirection: 'row'}}>
                <Dropdown
                    options={DROP_DOWN_OPTIONS}
                    onChange={(event): void => setFilterOption(event.value)}
                    value={filterOption}
                />
                {
                    filterOption !== FILTER_NONE ?
                        <input
                            type='text'
                            pattern='[0-9]*'
                            value={inputFilterNumber}
                            onChange={
                                (event): void =>
                                    event.target.value ?
                                        setInputFilterNumber(parseInt(event.target.value))
                                        : setInputFilterNumber(undefined)}/>
                        : undefined
                }
            </div>
        </div>
    );
};

export default App;
