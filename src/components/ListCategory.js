import React, { Component } from 'react';
import { Col, ListGroup } from 'react-bootstrap';
import axios from 'axios';
import { API_URL } from '../utils/Constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './ListCategory.css';
import {
	faUtensils,
	faCoffee,
	faCheese,
} from '@fortawesome/free-solid-svg-icons';

const Icon = ({ nama }) => {
	if (nama == 'Makanan') {
		return <FontAwesomeIcon icon={faUtensils} className="mr-2" />;
	}
	if (nama == 'Minuman') {
		return <FontAwesomeIcon icon={faCoffee} className="mr-2" />;
	}
	if (nama == 'Cemilan') {
		return <FontAwesomeIcon icon={faCheese} className="mr-2" />;
	}
};

export default class ListCategory extends Component {
	constructor(props) {
		super(props);

		this.state = {
			categories: [],
		};
	}

	componentDidMount() {
		axios
			.get(API_URL + 'categories')
			.then((res) => {
				const categories = res.data;
				this.setState({ categories });
			})
			.catch((error) => {
				console.log('Error : ', error);
			});
	}

	render() {
		const { categories } = this.state;
		const { changeCategory, chooseCategories } = this.props;
		return (
			<Col md={2}>
				<h4>Daftar Category</h4>
				<ListGroup className="mt-4">
					{categories &&
						categories.map((categories) => (
							<ListGroup.Item
								key={categories.id}
								onClick={() => changeCategory(categories.nama)}
								className={chooseCategories === categories.nama && 'active'}
								style={{ cursor: 'pointer' }}
							>
								<p>
									<Icon nama={categories.nama} /> {categories.nama}
								</p>
							</ListGroup.Item>
						))}
				</ListGroup>
			</Col>
		);
	}
}
