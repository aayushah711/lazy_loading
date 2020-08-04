import React from 'react';

export default function Form(props) {
	return <form onClick={props.handleSubmit}>{props.children}</form>;
}
