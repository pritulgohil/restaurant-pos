"use client";
import { LoaderCircle } from "lucide-react";
import { TriangleAlert } from "lucide-react";
import { useState } from "react";
import styles from "./Signup.module.css";
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
import { useAuthContext } from "@/context/AuthContext";

const FormSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});

const Signup = ({ setOnboardingVisibility }) => {
  const [signupState, setSignupState] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const { setLoggedInUser } = useAuthContext();

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    setErrorMessage(false);
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        // Saving token in localStorage
        localStorage.setItem("token", result.token);

        //Saving logged in UserId in state for automatic signin on successful signup
        setLoggedInUser(result.userId);
        setSignupState(true);

        // Navigate to POS
        setTimeout(() => {
          setOnboardingVisibility(true);
        }, 3000);
      } else {
        setErrorMessage(true);
      }
    } catch (error) {}
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.topSection}>
        <div className={styles.pageHeader}>
          <h1>Plates Up</h1>
        </div>
        <div className={styles.pageDescription}>
          <p>
            Streamline your orders, track inventory, and manage staff with ease.
            Join us today to simplify your restaurant operations!
          </p>
        </div>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={styles.signupForm}
        >
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
                <FormMessage className="flex items-center gap-1">
                  {errorMessage && (
                    <>
                      <TriangleAlert
                        strokeWidth={3}
                        className={styles.triangleIcon}
                      />
                      An account already exists with this email address.
                    </>
                  )}
                </FormMessage>
              </FormItem>
            )}
          />
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
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className={styles.formBottom}>
            <div className={styles.rememberMe}>
              <Checkbox id="rememberMe" />
              <Label htmlFor="rememberMe">Remember me</Label>
            </div>
            <div className={styles.forgot}>
              <Button variant="link">Forgot password?</Button>
            </div>
          </div>
          <div className={styles.elementContainer}>
            <div className={styles.buttonContainer}>
              {signupState ? (
                <Button className={styles.signupButton} disabled>
                  <LoaderCircle className="animate-spin" />
                  Signing Up...
                </Button>
              ) : (
                <Button type="submit" className={styles.signupButton}>
                  Sign Up
                </Button>
              )}
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Signup;
