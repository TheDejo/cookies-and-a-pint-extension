import ErrorIcon from "../Icons/ErrorIcon"
import styles from './ErrorState.module.scss'

interface IErrorState {
    error: Error | null;
}

export const ErrorState = ({ error }: IErrorState) => {
    return (
        <div className={styles.component}>
            <ErrorIcon />
            <p className={styles.details}>{error?.message}</p>
            <p className={styles.emailUs}>If problem persists, send us an email at</p>
            <a target="_blank" href="mailto:info@sundaymorning.com" className={styles.email} >info@sundaymorning.com</a>
        </div>
    )
}
