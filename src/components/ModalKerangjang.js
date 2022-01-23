import { faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { numberWithCommas } from '../utils/NumberFormat';

const ModalKerangjang = ({
	showModal,
	handleClose,
	keranjangDetail,
	jumlah,
	keterangan,
	tambah,
	kurang,
	changeHandler,
	handleSubmit,
	totalHarga2,
	handleRemove,
}) => {
	if (keranjangDetail) {
		return (
			<Modal show={showModal} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>{keranjangDetail.product.nama} </Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={handleSubmit}>
						<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
							<Form.Label>Total Harga :</Form.Label>
							<p>Rp. {numberWithCommas(totalHarga2)}</p>
						</Form.Group>

						<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
							<Form.Label>Jumlah :</Form.Label>
							<br />
							<Button
								variant="primary"
								size="sm"
								className="mr-4"
								onClick={() => kurang()}
							>
								<FontAwesomeIcon icon={faMinus} />
							</Button>

							<Form.Label>{jumlah}</Form.Label>

							<Button
								variant="primary"
								size="sm"
								className="ml-4"
								onClick={() => tambah()}
							>
								<FontAwesomeIcon icon={faPlus} />
							</Button>
						</Form.Group>

						<Form.Group
							className="mb-3"
							controlId="exampleForm.ControlTextarea1"
						>
							<Form.Label>Keterangan :</Form.Label>
							<Form.Control
								as="textarea"
								rows={3}
								name="keterangan"
								placeholder="Pedas, Nasi setengah"
								value={keterangan}
								onChange={(event) => changeHandler(event)}
							/>
						</Form.Group>
						<Button variant="primary" type="submit">
							Simpan
						</Button>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant="danger"
						onClick={() => handleRemove(keranjangDetail.id)}
					>
						<FontAwesomeIcon icon={faTrash} />
						Hapus pesanan
					</Button>
				</Modal.Footer>
			</Modal>
		);
	} else {
		return (
			<Modal show={showModal} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Kosong</Modal.Title>
				</Modal.Header>
				<Modal.Body>Kosong</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" onClick={handleClose}>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>
		);
	}
};

export default ModalKerangjang;
