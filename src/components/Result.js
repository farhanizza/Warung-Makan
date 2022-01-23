import React, { Component } from 'react';
import { Badge, Card, Col, ListGroup, Row } from 'react-bootstrap';
import { numberWithCommas } from '../utils/NumberFormat';
import ModalKerangjang from './ModalKerangjang';
import './Result.css';
import TotalBayar from './TotalBayar';
import axios from 'axios';
import swal from 'sweetalert';
import { API_URL } from '../utils/Constants';

export default class Result extends Component {
	constructor(props) {
		super(props);

		this.state = {
			showModal: false,
			keranjangDetail: false,
			jumlah: 0,
			keterangan: '',
			totalHarga2: 0,
		};
	}

	handleShow = (isiKeranjangs) => {
		this.setState({
			showModal: true,
			keranjangDetail: isiKeranjangs,
			jumlah: isiKeranjangs.jumlah,
			keterangan: isiKeranjangs.keterangan,
			totalHarga2: isiKeranjangs.totalHarga,
		});
	};

	handleClose = () => {
		this.setState({
			showModal: false,
		});
	};

	tambah = () => {
		this.props.getListKeranjang();
		this.setState({
			jumlah: this.state.jumlah + 1,
			totalHarga2:
				this.state.keranjangDetail.product.harga * (this.state.jumlah + 1),
		});
	};

	kurang = () => {
		if (this.state.jumlah !== 1) {
			this.setState({
				jumlah: this.state.jumlah - 1,
				totalHarga2:
					this.state.keranjangDetail.product.harga * (this.state.jumlah - 1),
			});
		}
	};

	changeHandler = (event) => {
		this.setState({
			keterangan: event.target.value,
		});
	};

	handleSubmit = (event) => {
		event.preventDefault();
		this.handleClose();
		const data = {
			jumlah: this.state.jumlah,
			totalHarga: this.state.totalHarga2,
			product: this.state.keranjangDetail.product,
			keterangan: this.state.keterangan,
		};
		axios
			.put(API_URL + 'keranjangs/' + this.state.keranjangDetail.id, data)
			.then((res) => {
				this.props.getListKeranjang();
				swal({
					title: 'Update Pesanan!',
					text: 'Success Update Pesanan ' + data.product.nama,
					icon: 'success',
					button: false,
					timer: 1300,
				});
			})
			.catch((error) => {
				console.log('Error : ', error);
			});
	};

	handleRemove = (id) => {
		this.handleClose();
		axios
			.delete(API_URL + 'keranjangs/' + id)
			.then((res) => {
				this.props.getListKeranjang();
				swal({
					title: 'Hapus Pesanan',
					text:
						'Success Hapus Pesanan ' + this.state.keranjangDetail.product.nama,
					icon: 'success',
					button: false,
					timer: 1300,
				});
			})
			.catch((error) => {
				console.log('Error : ', error);
			});
	};

	render() {
		const { checkOutItem } = this.props;
		return (
			<Col md={3}>
				<h4>Pesanan</h4>
				{checkOutItem.length !== 0 && (
					<Card className="overflow-auto hasil mt-4">
						<ListGroup variant="flush">
							{checkOutItem &&
								checkOutItem.map((isiKeranjangs) => (
									<ListGroup.Item
										key={isiKeranjangs.id}
										onClick={() => this.handleShow(isiKeranjangs)}
									>
										<Row>
											<Col xs={1}>
												<Badge pill bg="success">
													{isiKeranjangs.jumlah}
												</Badge>
											</Col>
											<Col className="ml-3">
												<h5 className="product-nama">
													{isiKeranjangs.product.nama}
												</h5>
												<p className="product-nama">
													Rp. {numberWithCommas(isiKeranjangs.product.harga)}
												</p>
											</Col>
											<Col>
												<strong className="float-right">
													{numberWithCommas(isiKeranjangs.totalHarga)}
												</strong>
											</Col>
										</Row>
									</ListGroup.Item>
								))}
							<ModalKerangjang
								handleClose={this.handleClose}
								{...this.state}
								tambah={this.tambah}
								kurang={this.kurang}
								changeHandler={this.changeHandler}
								handleSubmit={this.handleSubmit}
								handleRemove={this.handleRemove}
							/>
						</ListGroup>
					</Card>
				)}
				<TotalBayar checkOutItem={checkOutItem} {...this.props} />
			</Col>
		);
	}
}
