import { 
	useState,
	useEffect,
	useContext,
	useRef
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import filter from 'leo-profanity';
import { useTranslation } from 'react-i18next';
import { addMessages } from '../app/features/chatSlice';
import DataContext from '../context/DataContext';

const socket = io();

filter.add(filter.getDictionary('en'));
filter.add(filter.getDictionary('fr'));
filter.add(filter.getDictionary('ru'));

const Messages = () => {
  const [message, setMessage] = useState('');

  const { user } = useContext(DataContext);

  const chat = useSelector((state) => state.chat);
  const dispatch = useDispatch();

  const { t } = useTranslation();

  useEffect(() => {
    socket.removeListener('newMessage');
    socket.on('newMessage', (payload) => {
      dispatch(addMessages(payload));
    });
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // emit new message
    socket.emit(
      'newMessage',
      {
        body: message,
        channelId: chat.currentChannelId,
        username: user.username,
      },
      (response) => {
        console.log(response.status); // ok
      },
    );
    setMessage('');
  };

  const currentChannel = chat.channels
    ? chat.channels.filter((c) => c.id === chat.currentChannelId)[0]?.name
    : 'none';

  const { messages } = chat;

  const scroll = useRef(null);

  // eslint-disable-next-line no-confusing-arrow
  const filteredMessages = (id) =>
    // eslint-disable-next-line implicit-arrow-linebreak
    chat.messages ? chat.messages.filter((mes) => mes.channelId === id) : [];

  useEffect(() => {
    scroll.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages, currentChannel]);

  return (
    <>
      <div className="mb-1 small fw-bold">{`# ${currentChannel}`}</div>
      <div className="mb-3 small text-muted">
        {`${filteredMessages(chat.currentChannelId).length} `}
        {t('home.mesCount', {
          count: filteredMessages(chat.currentChannelId).length,
        })}
      </div>
      <div
        id="messages"
        className="flex-grow-1 rounded bg-light bg-gradient p-3 border overflow-auto"
      >
        <ul className="list-unstyled m-0 p-0">
          {filteredMessages(chat.currentChannelId).map((m) => (
            <li key={m.id} className="mt-2 text-break">
              <span className="fw-bold">
								{m.username}
								:
							</span>
              &nbsp;
              <span className="">{filter.clean(m.body)}</span>
            </li>
          ))}
          <div ref={scroll} />
        </ul>
      </div>
      <form onSubmit={handleSubmit} className="pt-3">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder={t('home.enterMessage')}
            value={message}
            aria-label="Новое сообщение"
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="btn btn-primary" type="submit" id="button-addon2">
            {t('home.send')}
          </button>
        </div>
      </form>
    </>
  );
};

Messages.whyDidYouRender = true;

export default Messages;
