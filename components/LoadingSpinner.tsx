import Spinner from 'react-bootstrap/Spinner';
import styles from '../styles/LoadingSpinner.module.css';

function LoadingSpinner() {
  return (
    <div className={styles.loadingSpinnerContainer}>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}

export default LoadingSpinner;
