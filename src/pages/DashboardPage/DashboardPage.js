import axios from 'axios';
import React, { useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import './DashboardPage.scss';

function DashboardPage(){

    const API_KEY = 'd7740a55001340a7b39145833220706';
    const [currUser, setCurrUser] = useState('null');
    const [userInput, setUserInput] = useState('');
    const [location, setLocation] = useState(null);
    const [locationData, setlocationData] = useState(null);
    const [maxSortedLowToHi, setMaxLowToHi] = useState(false);
    const [minSortedLowToHi, setMinLowToHi] = useState(false);
    const [rainfallLowToHi, setRainfallLowToHi] = useState(false);
    const [todaysDateFirst, setTodaysDateFirst] = useState(true)
    const [failedAuth, setFailedAuth] = useState(false);

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (!token) {
            setFailedAuth(true);
            return;
        }
        // Get the data from the API
        axios
            .get('http://localhost:8080/current', {
                headers: {
                    authorization: 'Bearer ' + token
                }
            })
            .then((response) => {
                console.log(response);
                setCurrUser(response.user.name);
            })
            .catch(() => {
                setFailedAuth(true);
            });
    }, []);
    

    function getlocationData(event){
        event.preventDefault();
        let locationData = userInput;
        console.log(locationData);
        axios
            .get(`http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${locationData}&days=3&aqi=no&alerts=no`)
                .then((res) => {
                    setLocation(res.data.location.name);
                    setlocationData(res.data.forecast.forecastday);
                })
        setUserInput('');
    }

    let rows = null;
    let curMaxTmpSum = 0
    let maxTmpAvg = 0;
    let curMinTmpSum = 0;
    let minTmpAvg = 0;
    let curRainFallSumInches = 0;
    let rainFallAvgInches = 0;
    let curRainFallSumMM = 0;
    let rainFallAvgMM = 0;
    let averages = null;

    function renderRows(){
        rows= locationData.map((day, index) => {
            let date = day.date.replace(/-/g,"/");
            return (
            <section className='dashboard__row' key={index}>
                <p className='dashboard__row--data dashboard__row--data-mobile'>{date}</p>
                <p className='dashboard__row--data'>{day.day.maxtemp_f}</p>
                <p className='dashboard__row--data'>{day.day.mintemp_f}</p>
                <p className='dashboard__row--data'>{day.day.totalprecip_in}</p>
                <p className='dashboard__row--data'>{day.day.totalprecip_mm}</p>
            </section>);
        })
    }

    if(locationData){
        renderRows();
    }

    if(rows){
        locationData.forEach((day, index)=> {
            curMaxTmpSum += day.day.maxtemp_f;
            maxTmpAvg = (curMaxTmpSum)/(index+1)
            curMinTmpSum += day.day.mintemp_f;
            minTmpAvg = (curMinTmpSum)/(index+1)
            curRainFallSumInches += day.day.totalprecip_in;
            rainFallAvgInches = (curRainFallSumInches)/(index+1);
            curRainFallSumMM += day.day.totalprecip_mm;
            rainFallAvgMM = (curRainFallSumMM)/(index+1);
        });
        averages = {maxTmpAvg, minTmpAvg, rainFallAvgInches, rainFallAvgMM};
    }

    function onMaxTmpTogglerClick(){
        const sortedData = [...locationData].sort((a, b)=>{
            if(!maxSortedLowToHi){
                return a.day.maxtemp_f - b.day.maxtemp_f;
            }else{
                return b.day.maxtemp_f - a.day.maxtemp_f;
            }
        })
        setlocationData(sortedData)
        setMaxLowToHi(!maxSortedLowToHi)
    }

    function onMinTmpTogglerClick(){
        const sortedData = [...locationData].sort((a, b)=>{
            if(!minSortedLowToHi){
                return a.day.maxtemp_f - b.day.maxtemp_f;
            }else{
                return b.day.maxtemp_f - a.day.maxtemp_f;
            }
        })
        setlocationData(sortedData)
        setMinLowToHi(!minSortedLowToHi)
    }
    
    function onRainfallTogglerClick(){
        const sortedData = [...locationData].sort((a, b)=>{
            if(!rainfallLowToHi){
                return a.day.totalprecip_in - b.day.totalprecip_in;
            }else{
                return b.day.totalprecip_in - a.day.totalprecip_in;
            }
        })
        setlocationData(sortedData)
        setRainfallLowToHi(!rainfallLowToHi)
    }

    function dateTogglerClick(){
        const sortedData = [...locationData].sort((a, b)=>{
            if(!todaysDateFirst){
                return a.date_epoch - b.date_epoch;
            }else{
                return b.date_epoch - a.date_epoch;
            }
        })
        setlocationData(sortedData);
        setTodaysDateFirst(!todaysDateFirst);
    }

        if(failedAuth){
           return(
            <main className="dashboard">
                <p>You must be logged in to see this page. <Link to="/login">Log in</Link></p>
            </main>
            )
        }

        if(!currUser){
            return(
                <p>loading..</p>
            )
        }
        return(
        <>
        <nav>
            <h1>welcome, {currUser}</h1>
            <Link to='#'>logout</Link>
        </nav>
        <form className='mainPageSearch' onSubmit={getlocationData}>
            <input className='mainPageSearch__input' required type='text' name='locationData' placeholder='Enter city or zip code'
             value={userInput} onChange={event => setUserInput(event.target.value)}/>
            <button className='mainPageSearch__button'>Search</button>
        </form>
        {locationData &&
        <section className='dashboard'>
            <p>Displaying Data for: {location}</p>
            <section className='dashboard__cols'>
                <p className='dashboard__cols--label'>Date (y/m/d)</p>
                <p className='dashboard__cols--label'>Hi (F)</p>
                <p className='dashboard__cols--label'>Low (F)</p>
                <p className='dashboard__cols--label'>Rain (in.)</p>
                <p className='dashboard__cols--label'>Rain (mm)</p>
            </section>
            <section className='dashboard__rows'>
                {rows}
            </section>
            <section className='dashboard__averages'>
                <p className='dashboard__averages--data'>3-day Avg:</p>
                <p className='dashboard__averages--data'>{averages.maxTmpAvg.toFixed(2)}</p>
                <p className='dashboard__averages--data'>{averages.minTmpAvg.toFixed(2)}</p>
                <p className='dashboard__averages--data'>{averages.rainFallAvgInches.toFixed(2)}</p>
                <p className='dashboard__averages--data'>{averages.rainFallAvgMM.toFixed(2)}</p>
            </section>
            <section className='dashboard__totals'>
                <p className='dashboard__averages--data'>3-day total:</p>
                <p className='dashboard__averages--data'>N/A</p>
                <p className='dashboard__averages--data'>N/A</p>
                <p className='dashboard__averages--data'>{curRainFallSumInches.toFixed(2)}</p>
                <p className='dashboard__averages--data'>{curRainFallSumMM.toFixed(2)}</p>

            </section>
            <button className='btn-hover' onClick={onMaxTmpTogglerClick}>max-temp toggler</button>
            <button className='btn-hover' onClick={onMinTmpTogglerClick}>min-temp toggler</button>
            <button className='btn-hover' onClick={onRainfallTogglerClick}>rainfall toggler</button>
            <button className='btn-hover' onClick={dateTogglerClick}>date toggler</button>
        </section>
        }
        </>
    )
}

export default DashboardPage;