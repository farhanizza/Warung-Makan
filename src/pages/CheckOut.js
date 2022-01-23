import React, { Component } from 'react';
import { Col, Row, Table, Card, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import axios from 'axios';
import { API_URL } from '../utils/Constants';
import { numberWithCommas } from '../utils/NumberFormat';
import swal from 'sweetalert';

class CheckOut extends Component {
	constructor(props) {
		super(props);

		this.state = {
			menus: [],
		};
	}

	componentDidMount() {
		axios
			.get(API_URL + 'keranjangs')
			.then((res) => {
				const menus = res.data;
				this.setState({ menus });
			})
			.catch((error) => {
				console.log('Error : ', error);
			});
	}

	handleBayar = (harga) => {
		const pesanan = {
			total_bayar: harga,
			menus: this.state.menus,
		};

		if (pesanan.total_bayar === 0) {
			swal({
				title: 'Kamu Belum Memilih Menu!',
				text: 'Silahkan Kembali Ke Menu',
				icon: 'error',
			}).then((respone) => {
				if (respone) {
					this.props.history.push('/');
				}
			});
		} else {
			axios.post(API_URL + 'pesanans', pesanan).then((res) => {
				this.props.history.push('/sukses');
			});
		}
	};

	render() {
		const harga = this.state.menus.reduce((prevVal, currVal) => {
			return prevVal + currVal.totalHarga;
		}, 0);
		return (
			<>
				<Row>
					<Col md={{ span: 3, offset: 1 }} className="mt-5">
						<div>
							<h4>Makanana yang dibeli</h4>
						</div>
					</Col>
				</Row>
				<Row>
					<Col md={{ span: 5, offset: 1 }} className="mt-3">
						<Table striped bordered hover>
							<thead>
								<tr>
									<th>ID</th>
									<th>Nama Makanan</th>
									<th>Harga</th>
									<th>Banyak Pesanan</th>
								</tr>
							</thead>
							{this.state.menus &&
								this.state.menus.map((products) => (
									<tbody>
										<tr>
											<td>{products.id}</td>
											<td>{products.product.nama}</td>
											<td>{numberWithCommas(products.totalHarga)}</td>
											<td colSpan={1}>{products.jumlah}</td>
										</tr>
									</tbody>
								))}
						</Table>
					</Col>

					<Col md={{ span: 1, offset: 2 }}>
						<Card style={{ width: '20rem' }} className="mt-3">
							<Card.Body>
								<Card.Title>Ringkasan Pesanan</Card.Title>
								<Card.Text className="mt-3">
									{this.state.menus &&
										this.state.menus.map((products) => (
											<ul>
												<li>
													<p>{products.product.nama}</p>
												</li>
											</ul>
										))}
								</Card.Text>
								<div className="mb-3">
									<h5 className="float-right mr-2">
										Rp. {numberWithCommas(harga)}
									</h5>
									<Card.Title>Total Tagihan</Card.Title>
								</div>
								<div className="d-grid gap-2">
									<Button
										variant="success"
										block
										active
										onClick={() => this.handleBayar(harga)}
									>
										<strong>Bayar Sekarang</strong>
									</Button>
								</div>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</>
		);
	}
}

export default withRouter(CheckOut);
