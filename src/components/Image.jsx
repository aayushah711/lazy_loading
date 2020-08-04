import React, { Component } from 'react';

export default class Image extends Component {
	constructor(props) {
		super(props);
		this.state = {
			show: false,
			item: props.item
		};
	}

	callback = (entries, observer, target) => {
		console.log('anything');
		console.log(target.id);
		console.log(entries[0].isIntersecting);
		if (entries[0].isIntersecting) {
			this.setState({
				show: true
			});
			observer.disconnect();
		}
	};

	loadImg = (e) => {
		console.log('loading image');
		let target = e.target;
		let options = {
			root: null,
			rootMargin: '10px',
			threshold: 1.0
		};

		let observer = new IntersectionObserver((entries, observer) => {
			this.callback(entries, observer, target);
		}, options);
		observer.observe(target);
	};

	render() {
		const { show, item: { farm, server, id, secret } } = this.state;
		return (
			<img
				src={
					show ? (
						`https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`
					) : (
						'https://via.placeholder.com/300'
					)
				}
				onLoad={(e) => this.loadImg(e)}
			/>
		);
	}
}
