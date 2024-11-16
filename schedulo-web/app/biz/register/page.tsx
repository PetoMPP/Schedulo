"use client";

import Input from "@/app/components/input";
import SvgEmail from "@/app/components/svg/email";
import SvgPassword from "@/app/components/svg/password";
import SvgUser from "@/app/components/svg/user";
import { useFormState, useFormStatus } from "react-dom";
import register from "./action";
import { useState } from "react";
import Alert, { AlertType } from "@/app/components/alert";
import Link from "next/link";

export default function OwnerRegister() {
  const [result, formAction] = useFormState(register, false);

  return (
    <div className="lg:max-w-[50%]">
      <h2 className="font-semibold text-2xl pb-4">Register</h2>
      {result === true ? (
        <div className="flex flex-col gap-4 items-end">
          <Alert type={AlertType.Success} messages={["Registration successful.", "Activation link would be sent to your email address if it was implemented."]} />
          <Link href="/login" className="btn btn-primary btn-lg">Go To Login</Link>
        </div>
      ) : (
        <form action={formAction} className="flex flex-col gap-3">
          <RegisterFormInner
            errors={result === false ? undefined : result?.errors}
          />
        </form>
      )}
    </div>
  );
}

function RegisterFormInner({
  errors,
}: {
  errors?: { code: string; description: string }[];
}) {
  const formStatus = useFormStatus();
  const [clearErrors, setClearErrors] = useState(false);

  if (formStatus.pending && clearErrors) {
    setClearErrors(false);
  }

  const emailErrors = [];
  const usernameErrors = [];
  const passwordErrors = [];
  const generalErrors = [];
  if (!clearErrors && !formStatus.pending && errors) {
    console.log("errors", errors);
    for (const error of errors) {
      if (error.code.toLowerCase().includes("email")) {
        emailErrors.push(error.description);
      } else if (error.code.toLowerCase().includes("username")) {
        usernameErrors.push(error.description);
      } else if (error.code.toLowerCase().includes("password")) {
        passwordErrors.push(error.description);
      } else {
        generalErrors.push(error.description);
      }
    }
  }
  const generalErrorsAlert =
    !formStatus.pending && generalErrors.length > 0 ? (
      <Alert type={AlertType.Error} messages={generalErrors} />
    ) : null;

  return (
    <>
      {generalErrorsAlert}
      <Input
        name="email"
        svg={<SvgEmail />}
        errors={emailErrors}
        placeholder="email"
        onKeyDown={() => setClearErrors(true)}
      />
      <Input
        name="username"
        svg={<SvgUser />}
        errors={usernameErrors}
        placeholder="username"
        onKeyDown={() => setClearErrors(true)}
      />
      <Input
        name="password"
        svg={<SvgPassword />}
        errors={passwordErrors}
        type="password"
        placeholder="password"
        onKeyDown={() => setClearErrors(true)}
      />
      <button
        type="submit"
        className={`btn btn-primary${
          formStatus.pending ? " btn-disabled" : ""
        }`}
      >
        {formStatus.pending ? (
          <span className="loading loading-dots loading-md"></span>
        ) : (
          "Register"
        )}
      </button>
    </>
  );
}
