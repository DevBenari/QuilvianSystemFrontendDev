import styles from "../page.module.css";
import TopNav from "@/components/features/navbars/top-nav";
const PendaftaranLayout = ({ children }) => {
  return (
    <div>
      <TopNav module={"pendaftaran"} />
      {children}
    </div>
  );
};

export default PendaftaranLayout;
