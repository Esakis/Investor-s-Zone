import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { ApplicationState } from '../store';
import * as WeatherForecastsStore from '../store/WeatherForecasts';

type WeatherForecastProps =
    WeatherForecastsStore.WeatherForecastsState
    & typeof WeatherForecastsStore.actionCreators;

const FetchData = (props: WeatherForecastProps) => {
    const { startDateIndex: startDateIndexParam } = useParams<{ startDateIndex: string }>();
    const startDateIndex = parseInt(startDateIndexParam || '0', 10) || 0;

    useEffect(() => {
        props.requestWeatherForecasts(startDateIndex);
    }, [startDateIndex]);

    const prevStartDateIndex = (props.startDateIndex || 0) - 5;
    const nextStartDateIndex = (props.startDateIndex || 0) + 5;

    return (
        <>
            <h1 id="tabelLabel">Weather forecast</h1>
            <p>This component demonstrates fetching data from the server and working with URL parameters.</p>
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Temp. (C)</th>
                        <th>Temp. (F)</th>
                        <th>Summary</th>
                    </tr>
                </thead>
                <tbody>
                    {props.forecasts.map((forecast: WeatherForecastsStore.WeatherForecast) =>
                        <tr key={forecast.date}>
                            <td>{forecast.date}</td>
                            <td>{forecast.temperatureC}</td>
                            <td>{forecast.temperatureF}</td>
                            <td>{forecast.summary}</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div className="d-flex justify-content-between">
                <Link className='btn btn-outline-secondary btn-sm' to={`/fetch-data/${prevStartDateIndex}`}>Previous</Link>
                {props.isLoading && <span>Loading...</span>}
                <Link className='btn btn-outline-secondary btn-sm' to={`/fetch-data/${nextStartDateIndex}`}>Next</Link>
            </div>
        </>
    );
};

export default connect(
    (state: ApplicationState) => state.weatherForecasts,
    WeatherForecastsStore.actionCreators
)(FetchData as any);
