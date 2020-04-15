import React from 'react';

//imports
import { Card, Chart, CountryPicker } from './components'

//styles

import styles from './App.module.css';

// api
import { fetchData } from './api';
class App extends React.Component {
    
    state = {
        data: {},
    }

    async componentDidMount(){
        const fetchedData = await fetchData();
        this.setState({ data: fetchedData });        
    }

    render(){
        const { data } = this.state;
        return (
            <div className={styles.container}>
                <Card data={data}/>
                <CountryPicker />
                <Chart />
            </div>
        )
    }
}

export default App;