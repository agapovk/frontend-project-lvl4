import { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { io } from 'socket.io-client';
import DataContext from '../../context/DataContext.js';
import { deleteChannel, setChannel } from '../../app/features/chatSlice.js';

const socket = io();

const DeleteChannel = () => {
	const { showDeleteModal, setShowDeleteModal, editChannel, setEditChannel } =
		useContext(DataContext);

	const dispatch = useDispatch();

	const { t } = useTranslation();

	const notifyDelete = () => toast.success(t('toast.delete'));

	const handleDeleteChannel = (e) => {
		e.preventDefault();
		// delete channel
		socket.emit('removeChannel', { id: editChannel.id });
		setShowDeleteModal(false);
		notifyDelete();
	};

	useEffect(() => {
		// remove all listeners
		socket.removeListener('removeChannel');
		// subscribe remove channel
		socket.on('removeChannel', (payload) => {
			dispatch(deleteChannel(payload));
			dispatch(setChannel(1));
		});
	}, [dispatch]);

	const closeModal = () => {
		setEditChannel(null);
		setShowDeleteModal(false);
	};

	return (
		<>
			{/* <ToastContainer /> */}
			<Modal show={showDeleteModal} onHide={closeModal} backdrop='static'>
				<Modal.Header closeButton>
					<Modal.Title>{t('modals.delete.deleteChannel')}</Modal.Title>
				</Modal.Header>
				<Form onSubmit={handleDeleteChannel}>
					<Modal.Body>{`# ${editChannel?.name}`}</Modal.Body>
					<Modal.Footer>
						<Button variant='secondary' onClick={closeModal}>
							{t('modals.delete.close')}
						</Button>
						<Button type='submit' variant='danger' autoFocus>
							{t('modals.delete.delete')}
						</Button>
					</Modal.Footer>
				</Form>
			</Modal>
		</>
	);
};

DeleteChannel.whyDidYouRender = true;

export default DeleteChannel;
