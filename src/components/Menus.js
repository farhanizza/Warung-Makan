import React from 'react';
import { Col, Card } from 'react-bootstrap';
import { numberWithCommas } from '../utils/NumberFormat';

const Menus = ({ products, checkOut }) => {
	return (
		<Col md={4} xs={{ span: 7, offset: 3 }} sm={{ span: 4, offset: 0 }}>
			<Card className="shadow" onClick={() => checkOut(products)}>
				<Card.Img
					variant="top"
					src={
						'images/' +
						products.category.nama.toLowerCase() +
						'/' +
						products.gambar
					}
				/>
				<Card.Body>
					<Card.Title>{products.nama}</Card.Title>
					<Card.Text>Rp. {numberWithCommas(products.harga)}</Card.Text>
				</Card.Body>
			</Card>
		</Col>
	);
};

export default Menus;
