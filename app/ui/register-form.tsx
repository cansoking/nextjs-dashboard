"use client";

import { roboto } from "@/app/ui/fonts";
import {
  AtSymbolIcon,
  ExclamationCircleIcon,
  KeyIcon,
  UserCircleIcon,
  // ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { Button } from "./button";
import { useActionState, useEffect, useState } from "react";
import { signUp } from "../lib/actions";
import { useSearchParams } from "next/navigation";
import { SnackbarProvider, useSnackbar } from "notistack";
import { useRouter } from "next/navigation";

function Form() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const [errorMessage, formAction] = useActionState(signUp, undefined);
  // 确认密码状态
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  let isPasswordValid = confirmPassword === password;

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.name === "confirm-password") {
      setConfirmPassword(e.target.value);
    }
    if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  }

  useEffect(() => {
    if (errorMessage && errorMessage === "success") {
      enqueueSnackbar("注册成功！将在1秒后跳转！", { variant: "success" });
      // 2秒后跳转
      const timer = setTimeout(() => {
        router.push(`/login?callbackUrl=${callbackUrl}`);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);
  return (
    <form className="space-y-3" action={formAction}>
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className={`${roboto.className} mb-3 text-2xl`}>
          Welcome to Acme.
        </h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="name"
            >
              Name
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="name"
                name="name"
                placeholder="Enter your name."
                required
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                onChange={handleInputChange}
                minLength={6}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          {/* 再次输入密码 */}
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="confirm-password"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                placeholder="Enter password again"
                type="password"
                name="confirm-password"
                required
                minLength={6}
                onChange={handleInputChange}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div
              className="flex h-8 items-end space-x-1"
              aria-live="polite"
              aria-atomic="true"
            >
              {!isPasswordValid && (
                <>
                  <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                  <p className="text-sm text-red-500">
                    {"两次输入的密码不一致"}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
        <input type="hidden" name="redirectTo" value={callbackUrl} />
        <Button className="mt-4 w-full">
          Sign up <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {/* Add form errors here */}
          {errorMessage && errorMessage !== "success" && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
        </div>
      </div>
    </form>
  );
}

export default function RegisterForm() {
  return (
    <SnackbarProvider
      maxSnack={3}
      autoHideDuration={2000}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Form />
    </SnackbarProvider>
  );
}
