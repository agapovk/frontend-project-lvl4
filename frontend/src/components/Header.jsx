import { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import DataContext from '../context/DataContext';

const Header = () => {
  const { setUser } = useContext(DataContext);

  const navigate = useNavigate();

  const { t } = useTranslation();

  const logoutHandler = () => {
    setUser({});
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="border-bottom container-fluids">
      <nav className="d-flex justify-content-between align-items-center py-3 px-3 mx-4">
        <Link to="/" className="m-0 fs-3 text-decoration-none text-black">
          Hexlet 
					<span className="text-primary">Chat</span>
        </Link>
        <ul className="d-flex align-items-center list-unstyled m-0">
          <li>
            <Button variant="secondary" onClick={logoutHandler}>
              {t('header.logout')}
            </Button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

Header.whyDidYouRender = true;

export default Header;
