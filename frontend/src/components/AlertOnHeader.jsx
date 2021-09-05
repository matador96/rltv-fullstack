import { Alert } from "antd";
import { getAlertOnHeader } from "../helpers/other";

const AlertOnHeader = () => {
  const alert = getAlertOnHeader();

  if (!alert || !alert.enabled) {
    return <></>;
  }

  return (
    <div className="alert-header">
      <Alert message={alert.text} type={alert.type} showIcon closable />
    </div>
  );
};

export default AlertOnHeader;
