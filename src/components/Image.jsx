import React, { Component } from 'react';
import styles from './Photos.module.css';

export default class Image extends Component {
	constructor(props) {
		super(props);
		this.state = {
			show: props.show,
			item: props.item
		};
	}

	componentDidMount(a, b) {
		this.setState({
			show: false
		});
	}

	handleIntersection = (entries, observer, target) => {
		console.log('inside handleIntersection');
		if (entries[0].isIntersecting) {
			this.setState({
				show: true
			});
			observer.disconnect();
		}
	};

	loadImg = (e) => {
		let target = e.target;
		let options = {
			root: null,
			rootMargin: '10px',
			threshold: 1.0
		};

		let observer = new IntersectionObserver((entries, observer) => {
			this.handleIntersection(entries, observer, target);
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
				className={styles.card}
			/>
		);
	}
}
