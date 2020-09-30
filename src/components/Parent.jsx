import React, { Component } from 'react';
import Axios from 'axios';
import styles from './Parent.module.css';

export default class Parent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			baseUrl: 'https://www.flickr.com/services/rest/',
			method: 'flickr.photos.search',
			api_key: '19c761b4f716b2769fb07202e8120435', //hide later
			tag: '',
			format: 'json',
			nojsoncallback: 1,
			per_page: 5,
			page: 1
		};
	}

	handleSubmit = () => {
		// this.setState({
		// 	isloading: true,
		// 	showData: true
		// });
		const { baseUrl, method, api_key, tag, format, nojsoncallback, per_page, page } = this.state;
		Axios.get(baseUrl, {
			params: {
				method: method,
				api_key: api_key,
				tags: tag,
				format: format,
				nojsoncallback: nojsoncallback,
				per_page: per_page,
				page: page
			}
		})
			.then((res) => {
				console.log(res.data.photos);
				this.setState({
					isLoading: false,
					data: res.data.photos
				});
			})
			.catch((err) => console.log(err));
	};

	getCordinates = (e) => {
		console.log('inside getcord');
		let children = e.target.children;
		let lastChild = children[children.length - 1];
		if (lastChild.getClientRects()[0]['bottom'] < e.target.clientHeight + 100) {
			console.log('end of div');
		}
	};

	// fetchQuote = () => {
	// 	this.setState({
	// 		isLoading: true
	// 	});
	// 	Axios.get('https://programming-quotes-api.herokuapp.com/quotes/random').then((res) => {
	// 		this.setState({
	// 			data: res.data,
	// 			isLoading: false
	// 		});
	// 	});
	// };

	render() {
		console.log('inside render');
		console.log(this.state);

		const { data, isLoading, tag } = this.state;
		return (
			<div onLoad={this.getCordinates}>
				{/* <button onClick={this.fetchQuote}>Random Quote</button> */}
				<div>
					<input
						type="text"
						name="tag"
						value={tag}
						placeholder="Search for a photo"
						onChange={(e) => {
							this.setState({
								[e.target.name]: e.target.value
							});
						}}
					/>
					<input
						style={{ marginTop: '20px' }}
						type="submit"
						name="submit"
						value="Submit"
						onClick={this.handleSubmit}
					/>
				</div>

				{isLoading ? (
					<div>Loading...</div>
				) : (
					<div>
						{data.photo.map((photo) => {
							return (
								<div className={styles.imgCont}>
									<img
										className={styles.img}
										src={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`}
										alt=""
									/>
								</div>
							);
						})}
					</div>
				)}
			</div>
		);
	}
}
