import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { numberWithCommas } from '../utils/NumberFormat';
import swal from 'sweetalert';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';

class TotalBayar extends Component {
	submitTotalBayar = (totalBayar) => {
		const pesanan = {
			total_bayar: totalBayar,
			menus: this.props.checkOutItem,
		};
		console.log(pesanan.menus);
		if (pesanan.total_bayar === 0) {
			swal('Kamu Belum Memilih Menu!', 'Clicked the button!', 'error');
		} else {
			this.props.history.push('/checkout');
		}
	};
	render() {
		const totalBayar = this.props.checkOutItem.reduce((result, item) => {
			return result + item.totalHarga;
		}, 0);

		return (
			<>
				{/* Web */}
				<div className="d-none d-md-block fixed-bottom">
					<Row>
						<Col md={{ span: 3, offset: 9 }} className="px-4">
							<h5>
								Total Bayar{' '}
								<strong className="float-right mr-2">
									Rp. {numberWithCommas(totalBayar)}
								</strong>
							</h5>
							<div className="d-grid gap-2">
								<Button
									variant="primary"
									block
									className="mb-2 mt-4 mr-2"
									active
									onClick={() => this.submitTotalBayar(totalBayar)}
								>
									<FontAwesomeIcon icon={faShoppingCart} />{' '}
									<strong>Check Out</strong>
								</Button>
							</div>
						</Col>
					</Row>
				</div>

				{/* Mobile */}
				<div className="d-dm-block d-md-none mt-3">
					<Row>
						<Col md={{ span: 3, offset: 9 }} className="px-4">
							<h5>
								Total Bayar{' '}
								<strong className="float-right mr-2">
									Rp. {numberWithCommas(totalBayar)}
								</strong>
							</h5>
							<div className="d-grid gap-2">
								<Button
									variant="primary"
									block
									className="mb-2 mt-4 mr-2"
									active
									onClick={() => this.submitTotalBayar(totalBayar)}
								>
									<FontAwesomeIcon icon={faShoppingCart} />{' '}
									<strong>Check Out</strong>
								</Button>
							</div>
						</Col>
					</Row>
				</div>
			</>
		);
	}
}

export default withRouter(TotalBayar);
