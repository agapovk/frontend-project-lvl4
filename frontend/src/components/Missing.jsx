import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Missing = () => {
  const { t } = useTranslation();

  return (
    <div className="d-flex flex-column justify-content-center align-items-center h-100">
      <h1>{t('missing.notFound')}</h1>
      <span>
        {t('missing.but')} 
				<Link to="/">{t('missing.toHome')}</Link>
      </span>
    </div>
  );
};

Missing.whyDidYouRender = true;

export default Missing;
