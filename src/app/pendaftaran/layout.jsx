import styles from '../page.module.css'
const PendaftaranLayout = ({children}) => {
    return (
        <div className={styles.page}>
            {children}
        </div>
    )
}

export default PendaftaranLayout