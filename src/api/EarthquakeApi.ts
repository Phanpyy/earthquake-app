import axios from 'axios';
import Earthquake from '../models/Earthquake';

const URL = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson';

/**
 * @class EarthquakeApi
 */
export default class EarthquakeApi {
    /**
     * Get today's earthquake data.
     *
     * @function getEarthquakesToday
     * @return {Promise<Earthquake[]>}
     */
    static getEarthquakesToday = (): Promise<Earthquake[]> =>
        axios.get(URL).then((response): Earthquake[] => response.data.features);
}

/**
 * Add a response interceptor, all errors go through this interceptor
 */
axios.interceptors.response.use(
    (response): any => {
        return response;
    },
    (error): any => {
        return Promise.reject(error);
    },
);
