import { AutoFillLoader } from '../Icons/AutoFillLoader'
import styles from './AutofillingState.module.scss'

export const AutofillingState = () => {
    return (
        <div className={styles.component}>
            <AutoFillLoader />
            <p>Scanning Form</p>
        </div>
    )
}
