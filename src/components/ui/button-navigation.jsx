import { Button } from "react-bootstrap";
import { useRouter } from "next/navigation";

const ButtonNav = ({
  path = "/",
  label = "Add New",
  icon = "ri-add-fill",
  size = "sm",
  variant = "",
  className = "btn btn-sm iq-bg-success",
}) => {
  const router = useRouter();

  const handleAddNewClick = () => {
    router.push(path);
  };

  return (
    <Button
      size={size}
      variant={variant}
      className={className}
      onClick={handleAddNewClick}
    >
      {icon && <i className={icon} />}
      <span className="ps-1">{label}</span>
    </Button>
  );
};

export default ButtonNav;
