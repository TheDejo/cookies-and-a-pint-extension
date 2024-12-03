import { Loader } from '../Icons/Loader';
import styles from './LoadingState.module.scss'

export const LoadingState = () => {
    return (
        <div className={styles.component}>
            <Loader />
            <p>Scaning job description</p>
        </div>
    )
}
