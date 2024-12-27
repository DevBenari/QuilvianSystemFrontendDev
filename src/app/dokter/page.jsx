import styles from "../page.module.css"
import TopNav from "@/components/features/navbars/top-nav"
import DokterPage from "@/components/view/dokter/dokter-pasien"

const PageDokter = () => {
    return (
        <div className={styles.page}>
            <TopNav module={"dokter"} />
            <DokterPage />  
        </div>
    )
}

export default PageDokter