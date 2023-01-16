import {
	useContext,
	useState,
	useEffect,
	useRef
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { io } from 'socket.io-client';
import { renameChannel, setChannel } from '../../app/features/chatSlice.js';
import DataContext from '../../context/DataContext.js';

const socket = io();

const RenameChannel = () => {
  const [nameChannel, setNameChannel] = useState('');
  const [nameError, setNameError] = useState(false);

  const { showRenameModal, setShowRenameModal, editChannel } = useContext(DataContext);

  const chat = useSelector((state) => state.chat);
  const dispatch = useDispatch();

  const chatNames = chat.channels ? chat.channels.map((m) => m.name) : [];

  const { t } = useTranslation();

  const notifyRename = () => toast.success(t('toast.rename'));

  const handleRenameSubmit = (e) => {
    e.preventDefault();
    if (chatNames.includes(nameChannel)) {
      setNameError(true);
    } else {
      // emit rename channel
      socket.emit('renameChannel', { id: editChannel.id, name: nameChannel });
      setNameChannel('');
      setShowRenameModal(false);
      setNameError(false);
      notifyRename();
    }
  };

  useEffect(() => {
    setNameError(false);
    setNameChannel('');
    socket.removeListener('renameChannel');
    // // update channels
    socket.on('renameChannel', (payload) => {
      dispatch(renameChannel(payload));
      dispatch(setChannel(payload.id));
    });
  }, [dispatch]);

  const closeModal = () => {
    setNameChannel('');
    setShowRenameModal(false);
  };

  const inputRef = useRef();
  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    inputRef.current?.focus();
  });

  return (
    <>
      {/* <ToastContainer /> */}
      <Modal show={showRenameModal} onHide={closeModal} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>{t('modals.rename.renameChannel')}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleRenameSubmit}>
          <Modal.Body>
            <Form.Group className="my-3" controlId="renameForm">
              <Form.Label className="visually-hidden">Имя канала</Form.Label>
              <Form.Control
                ref={inputRef}
                type="text"
                placeholder={editChannel?.name}
                value={nameChannel}
                onChange={(e) => setNameChannel(e.target.value)}
              />
              {nameError && (
                <Form.Text className="text-danger">
                  {t('modals.rename.error')}
                </Form.Text>
              )}
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              {t('modals.rename.close')}
            </Button>
            <Button type="submit" variant="primary">
              {t('modals.rename.save')}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

RenameChannel.whyDidYouRender = true;

export default RenameChannel;
