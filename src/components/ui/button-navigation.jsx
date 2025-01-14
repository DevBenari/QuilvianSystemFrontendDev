import { Button } from "react-bootstrap";
import { useRouter } from "next/navigation"; // useRouter from next/navigation
import PropTypes from "prop-types"; // Optional: For prop validation

const ButtonNav = ({ path, label, icon, size, variant, className }) => {
  const router = useRouter();

  const handleAddNewClick = () => {
    router.push(path); // Pindah ke halaman sesuai path yang diberikan
  };

  return (
    <Button
      size={size || "sm"}
      variant={variant || ""}
      className={className || "btn btn-sm iq-bg-success"}
      onClick={handleAddNewClick}
    >
      {icon && <i className={icon} />}
      <span className="ps-1">{label}</span>
    </Button>
  );
};

// Optional: Define default props
ButtonNav.defaultProps = {
  path: "/",
  label: "Add New",
  icon: "ri-add-fill",
  size: "sm",
  variant: "",
  className: "btn btn-sm iq-bg-success",
};

// Optional: Define prop types
ButtonNav.propTypes = {
  path: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  icon: PropTypes.string,
  size: PropTypes.string,
  variant: PropTypes.string,
  className: PropTypes.string,
};

export default ButtonNav;
