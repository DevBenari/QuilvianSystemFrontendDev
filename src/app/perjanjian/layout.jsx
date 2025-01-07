import TopNav from "@/components/features/navbars/top-nav";
import styles from "../page.module.css";

const PerjanjianLayout = ({ children }) => {
  return (
    <div>
      <TopNav module={"pendaftaran"} />
      {children}
    </div>
  );
};

export default PerjanjianLayout;
