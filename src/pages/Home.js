import '../App.css';
import { Col, Container, Row } from 'react-bootstrap';
import { Result, NavbarComponent, ListCategory, Menus } from '../components';
import React, { Component } from 'react';
import { API_URL } from '../utils/Constants';
import axios from 'axios';
import swal from 'sweetalert';

export default class Home extends Component {
	constructor(props) {
		super(props);

		this.state = {
			menus: [],
			chooseCategories: 'Makanan',
			checkOutItem: [],
		};
	}
	getListKeranjang = () => {
		axios
			.get(API_URL + 'keranjangs')
			.then((res) => {
				const checkOutItem = res.data;
				// console.log(checkOutItem);
				this.setState({ checkOutItem });
			})
			.catch((error) => {
				console.log('Error : ', error);
			});
	};

	componentDidMount() {
		axios
			.get(API_URL + 'products?category.nama=' + this.state.chooseCategories)
			.then((res) => {
				const menus = res.data;
				// console.log(menus);
				this.setState({ menus });
			})
			.catch((error) => {
				console.log('Error : ', error);
			});

		this.getListKeranjang();
	}

	// componentDidUpdate(prevState) {
	// 	if (this.state.checkOutItem !== prevState.checkOutItem) {
	// 		axios
	// 			.get(API_URL + 'keranjangs')
	// 			.then((res) => {
	// 				const checkOutItem = res.data;
	// 				this.setState({ checkOutItem });
	// 			})
	// 			.catch((error) => {
	// 				console.log('Error : ', error);
	// 			});
	// 	}
	// }

	changeCategory = (value) => {
		this.setState({
			chooseCategories: value,
			menus: [],
		});

		axios
			.get(API_URL + 'products?category.nama=' + value)
			.then((res) => {
				const menus = res.data;
				this.setState({ menus });
			})
			.catch((error) => {
				console.log('Error : ', error);
			});
	};

	checkOut = (value) => {
		//pilih menu
		axios
			.get(API_URL + 'keranjangs?product.id=' + value.id)
			.then((res) => {
				if (res.data.length === 0) {
					const items = {
						jumlah: 1,
						totalHarga: value.harga,
						product: value,
					};
					axios
						.post(API_URL + 'keranjangs', items)
						.then((res) => {
							this.getListKeranjang();
							swal({
								title: 'Success Check Out',
								text: 'Success Check Out ' + items.product.nama,
								icon: 'success',
								button: false,
								timer: 1300,
							});
						})
						.catch((error) => {
							console.log('Error : ', error);
						});
				} else {
					const items = {
						jumlah: res.data[0].jumlah + 1,
						totalHarga: res.data[0].totalHarga + value.harga,
						product: value,
					};

					axios
						.put(API_URL + 'keranjangs/' + res.data[0].id, items)
						.then((res) => {
							this.getListKeranjang();
							swal({
								title: 'Success Check Out',
								text: 'Success Check Out ' + items.product.nama,
								icon: 'success',
								button: false,
								timer: 1300,
							});
						})
						.catch((error) => {
							console.log('Error : ', error);
						});
				}
			})
			.catch((error) => {
				console.log('Error : ', error);
			});
	};

	render() {
		const { menus, chooseCategories, checkOutItem } = this.state;
		return (
			<div className="mt-3">
				<Container fluid>
					<Row>
						<ListCategory
							changeCategory={this.changeCategory}
							chooseCategories={chooseCategories}
						/>
						<Col>
							<h4>Daftar Produk</h4>
							<Row className="mt-4 overflow-auto menu">
								{menus &&
									menus.map((products) => (
										<Menus
											key={products.id}
											products={products}
											checkOut={this.checkOut}
										/>
									))}
							</Row>
							{/* && jika ada */}
						</Col>
						<Result
							checkOutItem={checkOutItem}
							{...this.props}
							getListKeranjang={this.getListKeranjang}
						/>
					</Row>
				</Container>
			</div>
		);
	}
}
