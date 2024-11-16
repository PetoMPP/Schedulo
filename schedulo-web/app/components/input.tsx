"use client";

import Alert, { AlertType } from "./alert";

type InputProps = {
  name?: string;
  label?: string;
  svg?: React.JSX.Element;
  type?: string;
  value?: string;
  placeholder?: string;
  errors?: string[];
  joinElements?: React.JSX.Element;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

export default function Input(props: InputProps) {
  const hasErrors = props.errors && props.errors.length > 0;
  const errors = hasErrors ? (
    <Alert type={AlertType.Error} messages={props.errors!} />
  ) : null;
  const input = (
    <>
      {errors}
      <label
        className={`input input-bordered${
          hasErrors ? " input-error" : ""
        } flex items-center grow gap-2${
          props.joinElements ? " join-item" : ""
        }`}
      >
        {props.label}
        <div className={hasErrors ? "text-error" : ""}>{props.svg}</div>
        <input
          name={props.name ? props.name : ""}
          type={props.type ? props.type : "text"}
          className={`grow${hasErrors ? " placeholder-error" : ""}`}
          placeholder={props.placeholder}
          value={props.value}
          onChange={(e) => props.onChange?.(e)}
          onKeyDown={(e) => props.onKeyDown?.(e)}
        />
      </label>
    </>
  );
  if (props.joinElements) {
    return (
      <div className="join w-full">
        {input}
        {props.joinElements}
      </div>
    );
  }

  return input;
}
