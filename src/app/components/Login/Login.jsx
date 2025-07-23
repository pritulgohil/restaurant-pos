"use client";
import { useEffect } from "react";
import { LoaderCircle } from "lucide-react";
import { TriangleAlert } from "lucide-react";
import styles from "./Login.module.css";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";
import { useRestaurantContext } from "@/context/RestaurantContext";

const FormSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});

const Login = () => {
  const router = useRouter();
  const [signupState, setSignupState] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const { loggedInUser, setLoggedInUser } = useAuthContext();
  const { setRestaurantName, setRestaurant } = useRestaurantContext();

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    setErrorMessage(false);

    // Login API
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setSignupState(true);

        // Saving the JWT token in localStorage
        localStorage.setItem("token", result.token);

        // Saving logged in UserID in localStorage and state
        localStorage.setItem("loggedInUser", result.user.userId);
        setLoggedInUser(result.user.userId);

        fetchRestaurant();

        // Navigate to /pos on successful login
        setTimeout(() => {
          router.push("/pos");
        }, 2000);
      } else {
        setErrorMessage(true);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  // Fetch restaurant only when loggedInUser is updated
  useEffect(() => {
    if (loggedInUser) {
      fetchRestaurant();
    }
  }, [loggedInUser]);

  const fetchRestaurant = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`/api/pos/fetch-restaurant/${loggedInUser}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch restaurant");
      }

      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        // Save restaurantId in state on login
        setRestaurant(data[0]._id);
        setRestaurantName(data[0].restaurantName);
      } else {
        console.warn("No restaurant found or data is not an array");
      }
    } catch (err) {
      console.error("Error fetching restaurant:", err);
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.pageHeader}>
        <h1>Plates Up</h1>
      </div>
      <div className={styles.pageDescription}>
        <p>Welcome back!</p>
      </div>
      <div className={styles.formContainer}>
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
                  <FormMessage />
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
                      <Input
                        type="password"
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage className="flex items-center gap-1">
                    {errorMessage && (
                      <>
                        <TriangleAlert
                          strokeWidth={3}
                          className={styles.triangleIcon}
                        />
                        Incorrect email or password.
                      </>
                    )}
                  </FormMessage>{" "}
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
                    Logging In...
                  </Button>
                ) : (
                  <Button type="submit" className={styles.signupButton}>
                    Log In
                  </Button>
                )}
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Login;
