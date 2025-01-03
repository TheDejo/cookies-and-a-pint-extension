import { LoadingBlob } from '../LoadingBlob/LoadingBlob';
import styles from './LoadingState.module.scss'

export const LoadingState = () => {
    return (
        <div className={styles.component}>
            <LoadingBlob />
            <p>Scaning job description</p>
        </div>
    )
}
