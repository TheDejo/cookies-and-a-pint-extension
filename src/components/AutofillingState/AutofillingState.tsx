import { LoadingBlob } from '../LoadingBlob/LoadingBlob'
import styles from './AutofillingState.module.scss'

export const AutofillingState = () => {
    return (
        <div className={styles.component}>
            <LoadingBlob />
            <p>Scanning Form</p>
        </div>
    )
}
