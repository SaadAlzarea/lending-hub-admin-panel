import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import { useQuery, useQueryClient } from "@tanstack/react-query";
// import { data } from "react-router-dom";
import z from "zod";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router";

function Signup() {
  const api_url = "https://68219a2d259dad2655afc2ba.mockapi.io";
  // input validation using zod
  const navigate = useNavigate();
  const signupSchema = z
    .object({
      firstName: z.string().min(2, { message: "First name is required" }),
      lastName: z.string().min(2, { message: "Last name is required" }),
      email: z
        .string()
        .min(1, { message: "Email is required" })
        .email({ message: "this email is no valid" }),
      password: z
        .string()
        .min(6, { message: "Password must be is least 6 characters" }),
      confirmPassword: z
        .string()
        .min(2, { message: "Confirm password name is required" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Confirm password is not match password",
      path: ["confirmPassword"],
    });

  // to create type to data using zod
  type InputSignup = z.infer<typeof signupSchema>;
  //this is react hook form using register and their is another submitted handler  that name controller
  const {
    handleSubmit,
    register,
    // reset,
    formState: { isSubmitting, errors },
  } = useForm<InputSignup>({
    mode: "onChange",
    resolver: zodResolver(signupSchema),
  });
  const onSubmit: SubmitHandler<InputSignup> = async (i) => {
    const userInfo = {
      firstName: i.firstName,
      lastName: i.lastName,
      email: i.email,
      password: i.password,
    };
    console.log(userInfo);

    const isExists = async (email: string): Promise<boolean> => {
      try {
        const response = await axios.get(`${api_url}/adminUser`);
        const userExists = response.data.some(
          (u: { email: string }) => u.email === email
        );

        return userExists;
      } catch (error) {
        console.error("Error checking if user exists:", error);
        return false; // Fail-safe: assume not found if error
      }
    };

    const postUser = async (): Promise<void> => {
      try {
        const exists = await isExists(userInfo.email);

        if (exists) {
          toast.error("This email is already registered.");
          return; // Stop here if user exists
        }

        const response = await axios.post(`${api_url}/adminUser`, userInfo);
        toast.success("User registered successfully.");
        console.log("User created:", response.data);
        localStorage.setItem("fname" ,i.firstName)
        localStorage.setItem("lname", i.lastName)
        localStorage.setItem("email",i.email)
        navigate("/admin");
      } catch (error) {
        toast.error("Failed to register user.");
        console.error("Error creating user:", error);
      }
    };
    await postUser();
  };
  return (
    <div className="flex flex-col min-h-screen max-w-screen justify-center items-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col shadow-2xl rounded-lg gap-4 w-[320px] sm:w-[400px] border border-gray-600/20 px-4 py-6">
          <p className="text-center font-bold text-2xl mb-2">Admin Signup</p>

          {/* First Name */}
          <div className="flex flex-col gap-1">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              type="text"
              placeholder="Enter your first name"
              {...register("firstName", { required: true })}
            />
            {errors.firstName && (
              <span className="text-red-800 text-sm">
                {errors.firstName.message}
              </span>
            )}
          </div>

          {/* Last Name */}
          <div className="flex flex-col gap-1">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              type="text"
              placeholder="Enter your last name"
              {...register("lastName", { required: true })}
            />
            {errors.lastName && (
              <span className="text-red-800 text-sm">
                {errors.lastName.message}
              </span>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-red-800 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <span className="text-red-800 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-1">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Enter your confirm password"
              {...register("confirmPassword", { required: true })}
            />
            {errors.confirmPassword && (
              <span className="text-red-800 text-sm">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>
          <ToastContainer />
          <Button type="submit" disabled={isSubmitting} className="w-full mt-2">
            Sign Up
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
