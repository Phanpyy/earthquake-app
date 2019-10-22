import React, {useEffect, useState} from 'react';
import ReactTooltip from 'react-tooltip';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css'
import './App.css';
import EarthquakeApi from './api/EarthquakeApi';
import Earthquake from './models/Earthquake';
import MapChart from './components/MapChart';
import {CheckboxAndLabel} from './components/Checkbox';

const REFRESH_INTERVAL = 30000; // 30 seconds

const FILTER_NONE = 'filterNone';
const FILTER_TIME = 'filterTime';
const FILTER_MAGNITUDE = 'filterMagnitude';

const DROP_DOWN_OPTIONS = [FILTER_NONE, FILTER_TIME, FILTER_MAGNITUDE];

const EARTHQUAKES_DATA_REFRESH_TEXT = 'Earthquakes data were refreshed.';
const EARTHQUAKES_DATA_REFRESH_LABEL = 'refresh automatically';
const OPTION_SELECT_PLACEHOLDER = 'Select an option';

/**
 * Entry point to actual web application.
 *
 * @constructor
 */
const App: React.FC = () => {
    const [earthquakes, setEarthquakes] = useState<Earthquake[]>([]);
    const [refreshAutomatically, setRefreshAutomatically] = useState<boolean>(true);
    const [toolTipContent, setToolTipContent] = useState<string>('');
    const [filterOption, setFilerOption] = useState<string>(FILTER_NONE);

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
            const earthquakes = await EarthquakeApi.getEarthquakesToday();
            setEarthquakes(earthquakes);
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
    }, [refreshAutomatically]);

    return (
        <div className='App'>
            <MapChart setTooltipContent={setToolTipContent} earthquakes={earthquakes} />
            <ReactTooltip>{toolTipContent}</ReactTooltip>
            <CheckboxAndLabel
                checked={refreshAutomatically}
                label={EARTHQUAKES_DATA_REFRESH_LABEL}
                onChange={setRefreshAutomatically}
            />
            <Dropdown
                options={DROP_DOWN_OPTIONS}
                onChange={(event): void => setFilerOption(event.value)}
                value={filterOption}
            />
        </div>
    );
};

export default App;
