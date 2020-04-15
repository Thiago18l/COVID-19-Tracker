import React from 'react';

//imports
import { Card, Chart, CountryPicker } from './components'

//styles

import styles from './App.module.css';

// api
import { fetchData } from './api';

//image
import Image from './assets/image.png';
class App extends React.Component {
    
    state = {
        data: {},
        country: '',
    }

    async componentDidMount(){
        const fetchedData = await fetchData();
        this.setState({ data: fetchedData });        
    }

    handleCountryChange = async (country) => {
        
        if (country === 'global'){
            await fetchData();
        }
        const fetchedData = await fetchData(country);

        this.setState({ data: fetchedData, country: country })
        
    }

    render(){
        const { data, country } = this.state;
        return (
            <div className={styles.container}>
                <img className={styles.image} src={Image} alt="COVID-19"/>
                <Card data={data}/>
                <CountryPicker handleCountryChange={this.handleCountryChange}/>
                <Chart data={data} country={country}/>
            </div>
        )
    }
}

export default App;