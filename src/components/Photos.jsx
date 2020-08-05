import React from 'react';
import styles from './Photos.module.css';
import Image from './Image';

export default function Photos(props) {
	return (
		<div className={styles.cardCont}>
			{props.data.map((item, index) => {
				return <Image key={item.id} item={item} show={false} />;
			})}
		</div>
	);
}
