import { useContext, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { io } from 'socket.io-client';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import DataContext from '../../context/DataContext.js';
import { addChannel, setChannel } from '../../app/features/chatSlice.js';

const socket = io();

const AddChannel = () => {
	const [newChannel, setNewChannel] = useState('');
	const [nameError, setNameError] = useState(false);

	const { showAddModal, setShowAddModal } = useContext(DataContext);

	const chat = useSelector((state) => state.chat);
	const dispatch = useDispatch();

	const chatNames = chat.channels ? chat.channels.map((m) => m.name) : [];

	const { t } = useTranslation();

	const notifyAdd = () => toast.success(t('toast.add'));

	const handleNewChannelSubmit = (e) => {
		e.preventDefault();
		// check name
		if (chatNames.includes(newChannel)) {
			setNameError(true);
		} else {
			// emit new channel
			socket.emit('newChannel', { name: newChannel });
			notifyAdd();
			setNewChannel('');
			setShowAddModal(false);
			setNameError(false);
		}
	};

	useEffect(() => {
		setNameError(false);
		setNewChannel('');
		socket.removeListener('newChannel');
		// update channels
		socket.on('newChannel', (payload) => {
			dispatch(addChannel(payload));
			dispatch(setChannel(payload.id));
		});
	}, [dispatch]);

	const closeModal = () => {
		setNewChannel('');
		setShowAddModal(false);
	};

	return (
		<>
			{/* <ToastContainer /> */}
			<Modal show={showAddModal} onHide={closeModal} backdrop='static'>
				<Modal.Header closeButton>
					<Modal.Title>{t('modals.add.newChannel')}</Modal.Title>
				</Modal.Header>
				<Form onSubmit={handleNewChannelSubmit}>
					<Modal.Body>
						<Form.Group className='my-3' controlId='addForm'>
							<Form.Control
								autoFocus
								type='text'
								placeholder={t('modals.add.enterChannelName')}
								value={newChannel}
								onChange={(e) => setNewChannel(e.target.value)}
							/>
							{nameError && <Form.Text className='text-danger'>{t('modals.add.error')}</Form.Text>}
						</Form.Group>
					</Modal.Body>
					<Modal.Footer>
						<Button variant='secondary' onClick={closeModal}>
							{t('modals.add.close')}
						</Button>
						<Button type='submit' variant='primary'>
							{t('modals.add.save')}
						</Button>
					</Modal.Footer>
				</Form>
			</Modal>
		</>
	);
};

export default AddChannel;
