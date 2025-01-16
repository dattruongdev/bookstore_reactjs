import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Fragment } from "react/jsx-runtime";
import { z } from "zod";
import { Button } from "../components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "../components/ui/form";
import { Input } from "../components/ui/input";
import { Link } from "react-router-dom";
import { login } from "../redux/slices/userSlice";
import { useAuth } from "../hooks/use-auth";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});
export default function Login() {
  const { dispatch } = useAuth();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await fetch("http://localhost:8080/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: values.username,
        password: values.password,
      }),
    });

    const { token } = await res.json();
    console.log("TOKEN GOT FROM BACKEND", token);
    localStorage.setItem("token", token);

    dispatch(login(token));
  }
  return (
    <Fragment>
      <div className="text-neutral-700 font-bold text-3xl mb-1">
        Welcome back!
      </div>
      <div className="text-zinc-500 font-medium text-xl mb-3">
        Sign up to use the app
      </div>
      <div className="flex items-center gap-2 text-sm mb-5 mx-auto">
        <span className="text-zinc-500">Already have account?</span>
        <Link to="/auth/register" className="text-blue-500">
          Click here to sign up
        </Link>
      </div>
      <div className="flex flex-col justify-center grow w-full px-5 mb-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start">
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your username or email"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Please don't show your password publicly
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </Fragment>
  );
}
