import Image from "next/image";
import styles from "./page.module.css";
import HomeDashboard from "@/components/view/home";


export default function Home() {
  return (
    <div className={styles.page}>
      <HomeDashboard />
    </div>
  );
}
