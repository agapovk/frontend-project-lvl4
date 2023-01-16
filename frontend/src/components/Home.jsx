import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import { useTranslation } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import { setChannel, getChannels } from '../app/features/chatSlice';
import DataContext from '../context/DataContext';
import Messages from './Messages';
import AddChannel from './modal/AddChannel';
import DeleteChannel from './modal/DeleteChannel';
import RenameChannel from './modal/RenameChannel';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const {
    user,
    setShowAddModal,
    setShowDeleteModal,
    setShowRenameModal,
    setEditChannel,
  } = useContext(DataContext);

  const chat = useSelector((state) => state.chat);
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const navigate = useNavigate();

  // const notifyError = () => {
  // 	console.log('toast');
  // 	return toast.error('Все  пропало');
  // };

  useEffect(() => {
    const getChatData = async () => {
      try {
        const response = await axios.get('/api/v1/data', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        dispatch(getChannels(response.data));
      } catch (error) {
        console.log(error);
      }
    };

    if (!Object.keys(user).length) {
      navigate('/login');
    } else {
      getChatData();
      // eslint-disable-next-line no-unused-expressions
      // !chat.channels && notifyError();
    }
  }, [dispatch, navigate, user]);

  const setChannelHandler = (id) => {
    dispatch(setChannel(id));
  };

  return (
    <>
      <div className="container-fluid bg-light">
        <div id="main" className="d-flex">
          <aside className="col-4 col-lg-3 ms-4 my-4 bg-white p-3 border rounded-start d-flex flex-column">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <p className="m-0 p-0">{t('home.channels')}</p>
              <Button
                className="px-2 py-0"
                onClick={() => setShowAddModal(true)}
              >
                +
              </Button>
            </div>
            <ul className="list-unstyled flex-grow-1 overflow-auto">
              {chat.channels &&
                chat.channels.map((c) => (
                  <li
                    key={c.id}
                    className="d-flex justify-content-center align-items-center"
                  >
                    <Button
                      id="btnHover"
                      variant="secondary"
                      className="w-100 text-start py-2 rounded-0 border-0 text-decoration-none text-secondary bg-transparent text-truncate"
                      onClick={() => setChannelHandler(c.id)}
                    >
                      <span
                        className={
                          c.id === chat.currentChannelId
                            ? 'fw-bold text-black'
                            : ''
                        }
                      >
                        {`# ${c.name}`}
                      </span>
                    </Button>
                    {c.removable && (
                      <Dropdown>
                        <Dropdown.Toggle id="bg-nested-dropdown" variant="link">
                          <span className="visually-hidden">
                            Управление каналом
                          </span>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          <Dropdown.Item
                            eventKey="1"
                            className="small"
                            onClick={() => {
                              setShowDeleteModal(true);
                              setEditChannel(c);
                            }}
                          >
                            Удалить
                          </Dropdown.Item>
                          <Dropdown.Item
                            eventKey="2"
                            className="small"
                            onClick={() => {
                              setShowRenameModal(true);
                              setEditChannel(c);
                            }}
                          >
                            Переименовать
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    )}
                  </li>
                ))}
            </ul>
          </aside>
          <div className="col d-flex flex-column flex-grow-1 justify-content-between me-4 my-4 bg-white p-3 rounded-end border border-start-0">
            <Messages />
          </div>
        </div>
      </div>
      <ToastContainer />
      <AddChannel />
      <DeleteChannel />
      <RenameChannel />
    </>
  );
};

Home.whyDidYouRender = true;

export default Home;
