import React, {ReactElement, memo} from 'react';
import {
    ComposableMap,
    Geographies,
    Geography,
    Marker,
    ZoomableGroup,
} from 'react-simple-maps';
import Earthquake from '../models/Earthquake';

/**
 * Data to generate map.
 */
const geoUrl = 'https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json';

const MAGNITUDE_COLOR_RED = '#FF0000';
const MAGNITUDE_COLOR_ORANGE = '#FFA500';
const MAGNITUDE_COLOR_YELLOW = '#FFD300';
const MAGNITUDE_COLOR_GREEN = '#008000';

const MAGNITUDE_SCALE_VERY_HIGH = 8;
const MAGNITUDE_SCALE_HIGH = 5;
const MAGNITUDE_SCALE_MEDIUM = 2;

const STROKE_DEFAULT = '#D3D3D3';
const STROKE_HOVER = '#000000';

const CIRCLE_RADIUS = 7;

const MAP_COLOR = '#9998A3';
const MAP_BORDER = '#EAEAEC';

/**
 * Get magnitude color depending on magnitude value.
 *
 * @function generateMagnitudeColor
 * @param {number} magnitude
 * @return {string}
 */
const generateMagnitudeColor = (magnitude: number): string => {
    if (magnitude >= MAGNITUDE_SCALE_VERY_HIGH) {
        return MAGNITUDE_COLOR_RED;
    }
    if (magnitude >= MAGNITUDE_SCALE_HIGH) {
        return MAGNITUDE_COLOR_ORANGE;
    }
    if (magnitude >= MAGNITUDE_SCALE_MEDIUM) {
        return MAGNITUDE_COLOR_YELLOW;
    }
    return MAGNITUDE_COLOR_GREEN;
};

interface Props {
    earthquakes: Earthquake[];
    setTooltipContent: (toolTipContent: string) => void;
}

/**
 * Component to show map with earthquakes.
 *
 * @param {Props} props
 * @constructor
 */
const MapChart: React.FC<Props> = (props: Props) => {
    return (
        <ComposableMap data-tip='' projectionConfig={{scale: 200}}>
            <ZoomableGroup>
                <Geographies geography={geoUrl}>
                    {({geographies}: any): ReactElement[] =>
                        geographies.map((geo: any) => (
                            <Geography
                                key={geo.rsmKey}
                                geography={geo}
                                fill={MAP_COLOR}
                                stroke={MAP_BORDER}
                            />
                        ))
                    }
                </Geographies>

                {
                    props.earthquakes.map((earthquake) =>(
                        <Marker
                            key={earthquake.id}
                            coordinates={[earthquake.geometry.coordinates[0], earthquake.geometry.coordinates[1]]}
                            onMouseEnter={(): void => {
                                props.setTooltipContent(
                                    `${earthquake.properties.place} (${earthquake.properties.mag})`
                                );
                            }}
                            onMouseLeave={(): void => {
                                props.setTooltipContent('');
                            }}
                            style={{
                                default: {
                                    fill: generateMagnitudeColor(earthquake.properties.mag),
                                    stroke: STROKE_DEFAULT
                                },
                                hover: {
                                    fill: generateMagnitudeColor(earthquake.properties.mag),
                                    stroke: STROKE_HOVER
                                },
                            }}>
                            <circle r={CIRCLE_RADIUS}/>
                        </Marker>
                    ))
                }
            </ZoomableGroup>
        </ComposableMap>
    );
};

export default memo(MapChart);
