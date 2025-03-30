"use client";

import styles from "./SignupOnboarding.module.css";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Check } from "lucide-react";
import { LoaderCircle } from "lucide-react";
import {
  Form,
  FormControl,
  FormItem,
  FormField,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAuthContext } from "@/context/AuthContext";
import { useRestaurantContext } from "@/context/RestaurantContext";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  firstName: z.string().min(1, { message: "First Name is required" }),
  lastName: z.string().min(1, { message: "Last Name is required" }),
  restaurantName: z.string().min(1, { message: "Restaurant Name is required" }),
  cuisineType: z.string().min(1, { message: "Cuisine Type is required" }),
});

const SignupOnboarding = () => {
  const router = useRouter();
  const [signupButtonState, setSignupButtonState] = useState(false);
  const { loggedInUser, setLoggedInUser } = useAuthContext();
  const { restaurant, setRestaurant } = useRestaurantContext();
  console.log("Currently logged in user", loggedInUser);
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      restaurantName: "",
      cuisineType: "",
    },
  });

  const onSubmit = async (data) => {
    console.log("Submitting data:", { ...data, userId: loggedInUser });

    try {
      // First API Call: Update the user's firstname and lastname
      const userUpdateResponse = await fetch(`/api/signup/${loggedInUser}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname: data.firstName,
          lastname: data.lastName,
        }),
      });

      const userUpdateResult = await userUpdateResponse.json();

      if (!userUpdateResponse.ok) {
        console.error("User update error:", userUpdateResult.error);
        return; // If updating the user fails, exit the function
      }
      console.log("User updated successfully:", userUpdateResult);

      // Second API Call: Create the restaurant
      const restaurantResponse = await fetch("/api/createrestaurant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          restaurantName: data.restaurantName,
          cuisineType: data.cuisineType,
          userId: loggedInUser,
        }),
      });

      const restaurantResult = await restaurantResponse.json();

      if (restaurantResponse.ok) {
        console.log("Restaurant created successfully:", restaurantResult);
        setRestaurant(restaurantResult.restaurant._id);
        setSignupButtonState(true);
        setTimeout(() => {
          router.push("/pos");
        }, 2000);
      } else {
        console.error("Restaurant creation error:", restaurantResult.error);
      }
    } catch (error) {
      console.error("Request failed:", error);
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.topSection}>
        <div className={styles.pageHeader}>
          <h1>Almost there!</h1>
        </div>
        <div className={styles.pageDescription}>
          <p>
            Help us get to know you better by filling out a few details to
            create your account.
          </p>
        </div>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={styles.signupForm}
        >
          <div className={styles.formFirstRow}>
            <div className={styles.inputContainer}>
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className={styles.elementContainer}>
                    <div className={styles.labelContainer}>
                      <FormLabel
                        className={styles.formLabel}
                        htmlFor="firstName"
                      >
                        First Name
                      </FormLabel>
                    </div>
                    <div className={styles.inputContainer}>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="First Name"
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              />
            </div>
            <div className={styles.inputContainer}>
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className={styles.elementContainer}>
                    <div className={styles.labelContainer}>
                      <FormLabel
                        className={styles.formLabel}
                        htmlFor="lastName"
                      >
                        Last Name
                      </FormLabel>
                    </div>
                    <div className={styles.inputContainer}>
                      <FormControl>
                        <Input type="text" placeholder="Last Name" {...field} />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.inputContainer}>
              <FormField
                control={form.control}
                name="restaurantName"
                render={({ field }) => (
                  <FormItem className={styles.elementContainer}>
                    <div className={styles.labelContainer}>
                      <FormLabel
                        className={styles.formLabel}
                        htmlFor="restaurantName"
                      >
                        Restaurant Name
                      </FormLabel>
                    </div>
                    <div className={styles.inputContainer}>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Restaurant Name"
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              />
            </div>
            <div className={styles.inputContainer}>
              <FormField
                control={form.control}
                name="cuisineType"
                render={({ field }) => (
                  <FormItem className={styles.elementContainer}>
                    <div className={styles.labelContainer}>
                      <FormLabel
                        className={styles.formLabel}
                        htmlFor="cuisineType"
                      >
                        Cuisine Type
                      </FormLabel>
                    </div>
                    <div className={styles.inputContainer}>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Cuisine Type"
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className={styles.elementContainer}>
            <div className={styles.buttonContainer}>
              {signupButtonState ? (
                <Button type="submit" className={styles.signupButton} disabled>
                  <LoaderCircle className="animate-spin" />
                  Creating your account...
                </Button>
              ) : (
                <Button type="submit" className={styles.signupButton}>
                  <Check />
                  Complete Signup
                </Button>
              )}
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SignupOnboarding;
