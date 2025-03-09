"use client";

import styles from "./LoginComponent.module.css";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Define validation schema
const FormSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});

const LoginComponent = () => {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data) {
    console.log("Form submitted with data:", data);
  }

  return (
    <div className={styles.mainContainer}>
      {/* Left Side - Image Section */}
      <div className={styles.leftSide}>
        <div className={styles.imageContainer}>
          <img
            className="shadow-2xl"
            src="loginpage/login-background.jpg"
            alt="Login Background"
          />
        </div>
      </div>

      {/* Right Side - Form Section */}
      <div className={styles.rightSide}>
        <div className={styles.topSection}>
          <div className={styles.pageHeader}>
            <h1>Plates Up</h1>
          </div>
          <div className={styles.pageDescription}>
            <p>
              Streamline your orders, track inventory, and manage staff with
              ease. Join us today to simplify your restaurant operations!
            </p>
          </div>
        </div>

        {/* Form Component */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={styles.signupForm}
          >
            {/* Email Input */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className={styles.elementContainer}>
                  <div className={styles.labelContainer}>
                    <FormLabel className={styles.formLabel} htmlFor="email">
                      Email
                    </FormLabel>
                  </div>
                  <div className={styles.inputContainer}>
                    <FormControl>
                      <Input type="email" placeholder="Email" {...field} />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password Input */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className={styles.elementContainer}>
                  <div className={styles.labelContainer}>
                    <FormLabel className={styles.formLabel} htmlFor="password">
                      Password
                    </FormLabel>
                  </div>
                  <div className={styles.inputContainer}>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Remember Me & Forgot Password */}
            <div className={styles.formBottom}>
              <div className={styles.rememberMe}>
                <Checkbox id="rememberMe" />
                <Label htmlFor="rememberMe">Remember me</Label>
              </div>
              <div className={styles.forgot}>
                <Button variant="link">Forgot password?</Button>
              </div>
            </div>

            {/* Submit Button */}
            <div className={styles.elementContainer}>
              <div className={styles.buttonContainer}>
                <Button type="submit" className={styles.signupButton}>
                  Sign Up
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default LoginComponent;
