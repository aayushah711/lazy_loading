import React from 'react';
import styles from './Photos.module.css';
import Image from './Image';

export default function Photos(props) {
	console.log(props);
	return (
		<div className={styles.cardCont}>
			{props.data.map((item) => {
				return <Image item={item} />;
			})}
		</div>
	);
}
