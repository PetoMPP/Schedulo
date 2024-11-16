import SvgError from "./svg/error";
import SvgInfo from "./svg/info";
import SvgSuccess from "./svg/success";
import SvgWarning from "./svg/warning";

export enum AlertType {
  Success = "success",
  Error = "error",
  Info = "info",
  Warning = "warning",
}

export default function Alert({
  type,
  messages,
}: {
  type?: AlertType;
  messages: string[];
}) {
  const [icon, style] = getAlertIconStyle(type);

  return (
    <div role="alert" className={`alert ${style}`}>
      {icon}
      <div>
        {messages.map((msg, i) => (
          <p key={i}>{msg}</p>
        ))}
      </div>
    </div>
  );
}

function getAlertIconStyle(type?: AlertType): [React.JSX.Element, string] {
  switch (type) {
    case AlertType.Success:
      return [SvgSuccess(), "alert-success"];
    case AlertType.Error:
      return [SvgError(), "alert-error"];
    case AlertType.Info:
      return [SvgInfo(), "alert-info"];
    case AlertType.Warning:
      return [SvgWarning(), "alert-warning"];
    default:
      return [<></>, ""];
  }
}
