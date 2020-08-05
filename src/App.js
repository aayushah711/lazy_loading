import React, { Component } from 'react';
import './App.css';
import Form from './components/Form';
import Photos from './components/Photos';
import Axios from 'axios';

class App extends Component {
	constructor() {
		super();
		this.state = {
			api_key: '19c761b4f716b2769fb07202e8120435',
			tags: '',
			data: [],
			loadedPhotos: []
		};
	}

	handleChange = (e) => {
		this.setState({
			tags: e.target.value
		});
	};

	componentDidMount() {
		this.fetchingPhotos();
	}

	fetchingPhotos = () => {
		Axios.get(
			`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${this.state.api_key}&tags=${this
				.state.tags}&format=json&nojsoncallback=1&per_page=10`
		)
			.then((response) => {
				this.setState({
					data: response.data.photos.photo
				});
			})
			.catch((error) => {
				console.log(error);
			});
	};

	handleSubmit = (e) => {
		e.preventDefault();
		this.fetchingPhotos();
	};

	render() {
		return (
			<div className="App">
				<Form>
					<input name="tags" value={this.state.tags} onChange={this.handleChange} placeholder="tags" />
					<input onClick={this.handleSubmit} type="submit" value="Submit" />
				</Form>

				<Photos data={this.state.data} />
			</div>
		);
	}
}

export default App;
