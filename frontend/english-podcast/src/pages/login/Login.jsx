import React from "react";
import { useForm } from "react-hook-form";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";

import * as authenticationService from "../../services/auth/AuthenticationService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/AuthProvider";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const auth = useAuth();
  
  const onSubmit = async (data) => {
    try {
      const userData = await authenticationService.login(data);
      if (userData) {
        auth.handleLogin(userData.token);
        toast.success("Login successfully!");
        const previousUrl = localStorage.getItem("previousUrl");
        url = previousUrl.length == 0 ? "" : previousUrl;
        navigate("/");
      } else {
        toast.error("Invalid credentials, please try again.");
      }
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="flex items-center justify-center mt-10">
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Sign In
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Nice to meet you! Enter your details to log in.
        </Typography>
        <form
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Email
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              {...register("email", {
                required: "This input is required.",
                pattern: {
                  value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                  message: "Not a valid email",
                },
              })}
            />
            {errors.email && (
              <span className="text-green-500">{errors.email.message}</span>
            )}
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Password
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              {...register("password", {
                required: "This input is required",
                maxLength: {
                  value: 50,
                  message: "This input exceeded 50 characters",
                },
              })}
            />
            {errors.password && (
              <span className="text-green-500">{errors.password.message}</span>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <Checkbox
              label={
                <Typography
                  variant="small"
                  color="gray"
                  className="flex items-center font-normal"
                >
                  I agree to the
                  <a
                    href="#"
                    className="font-medium transition-colors hover:text-gray-900"
                  >
                    &nbsp;Terms and Conditions
                  </a>
                </Typography>
              }
              containerProps={{ className: "custom-checkbox -ml-2.5" }}
              {...register("agreeToTerms", {
                required: "You must agree to the terms and conditions",
              })}
            />
            {errors.agreeToTerms && (
              <span className="text-green-500">
                {errors.agreeToTerms.message}
              </span>
            )}
          </div>
          <Button
            type="submit"
            className="mt-6 bg-green-700 hover:bg-green-900"
            fullWidth
          >
            Sign In
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Don't have an account?{" "}
            <a href="#" className="font-medium text-gray-900">
              Sign Up
            </a>
          </Typography>
        </form>
      </Card>
    </div>
  );
};

export default Login;
