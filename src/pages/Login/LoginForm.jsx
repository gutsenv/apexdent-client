import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Link, useNavigate } from "react-router-dom";
import { login } from "@/services/authService";
import getHomePath from "@/utils/getHomePath";
import { Terminal } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useState } from "react";

const loginFormSchema = z.object({
  email: z
    .string({ required_error: "Email is required." })
    .email({ message: "Must be a valid email." }),
  password: z.string({ required_error: "Password is required." }),
  isDentist: z.boolean().optional().default(false),
});

function LoginForm() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);

  const form = useForm({
    resolver: zodResolver(loginFormSchema),
  });

  const onSubmit = async (values) => {
    const res = await login(values);

    if (res.token) {
      localStorage.setItem("accessToken", res.token);
      localStorage.setItem("role", res.role);
      localStorage.setItem("id", res.id);
      navigate(getHomePath(res.role), { replace: true });
    } else {
      setErrorMessage(res.message);
    }
  };

  return (
    <>
      <p className="text-3xl font-semibold mb-8">Login</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="mb-2">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} type="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="mb-5">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Password" {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isDentist"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Login as a dentist</FormLabel>
                  <FormDescription>
                    If you have a dentist account, you can login as a dentist by
                    checking this option.
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          {errorMessage && (
            <Alert className="mt-4" variant="destructive">
              <Terminal className="h-4 w-4" />
              <AlertTitle>Error:</AlertTitle>
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}
          <div className="flex gap-2 justify-end mt-4">
            <Button type="submit">Submit</Button>
            <Link to="/register">
              <Button type="button" variant="outline">
                Register
              </Button>
            </Link>
          </div>
        </form>
      </Form>
    </>
  );
}

export default LoginForm;
