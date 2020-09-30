import React, { Component } from 'react';
import './App.css';
import Form from './components/Form';
import Photos from './components/Photos';
import Axios from 'axios';

class App extends Component {
	constructor() {
		super();
		this.state = {
			api_key: process.env.REACT_APP_KEY,
			tags: '',
			data: [],
			loadedPhotos: [],
			per_page: 5,
			page: 1,
			wait: 2000
		};
		this.timer = undefined;
		this.lastCall = Date.now();
	}

	componentDidMount() {
		window.addEventListener('scroll', this.throttle);
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.throttle);
		clearTimeout(this.timer);
	}

	handleChange = (e) => {
		this.setState({
			tags: e.target.value
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();
		this.setState(
			{
				data: []
			},
			this.fetchingPhotos
		);
	};

	fetchingPhotos = () => {
		const { api_key, tags, per_page, page } = this.state;
		Axios.get('https://www.flickr.com/services/rest/', {
			params: {
				method: 'flickr.photos.search',
				api_key: api_key,
				tags: tags,
				format: 'json',
				nojsoncallback: 1,
				per_page: per_page,
				page: page
			}
		})
			.then((response) => {
				this.setState({
					data: [ ...this.state.data, ...response.data.photos.photo ]
				});
			})
			.catch((error) => {
				console.log(error);
			});
	};

	throttle = () => {
		const { wait } = this.state;
		// throttle the number of calls to get co-ordinates of last picture
		this.timer = setTimeout(() => {
			if (Date.now() - this.lastCall >= wait) {
				this.getCordinates();
				this.lastCall = Date.now();
			}
		}, wait - (Date.now() - this.lastCall));
	};

	getCordinates = () => {
		const photos = document.getElementById('photos');
		const lastChild = photos.lastChild.getClientRects()[0];
		if (lastChild['y'] < lastChild['height'] + 100) {
			this.setState(
				{
					page: this.state.page + 2
				},
				this.fetchingPhotos
			);
		}
	};

	render() {
		const { data, tags } = this.state;
		return (
			<div className="App">
				<Form>
					<input name="tags" value={tags} onChange={this.handleChange} placeholder="Tag" />
					<button onClick={this.handleSubmit}>Submit</button>
				</Form>

				<Photos data={data} />

				{data.length ? <h1>Loading...</h1> : null}
			</div>
		);
	}
}

export default App;
