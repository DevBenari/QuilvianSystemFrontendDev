import styles from "../page.module.css";
import TopNav from "@/components/features/navbars/hamburger-menu";
import DokterPage from "@/components/view/dokter/dokter-pasien";

const PageDokter = () => {
  return (
    <div className={styles.page}>
      <DokterPage />
    </div>
  );
};

export default PageDokter;
