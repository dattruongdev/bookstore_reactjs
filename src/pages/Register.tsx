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
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { ChangeEvent, useState } from "react";
import { ScrollArea } from "../components/ui/scroll-area";
import { Link } from "react-router-dom";

function getImageData(event: ChangeEvent<HTMLInputElement>) {
  // FileList is immutable, so we need to create a new one
  const dataTransfer = new DataTransfer();

  // Add newly uploaded images
  Array.from(event.target.files!).forEach((image) =>
    dataTransfer.items.add(image)
  );

  const files = dataTransfer.files;
  const displayUrl = URL.createObjectURL(event.target.files![0]);

  return { files, displayUrl };
}

const formSchema = z
  .object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    confirm_password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    email: z.string().email({
      message: "Invalid email address",
    }),
    firstName: z.string().min(2, {
      message: "First name must be at least 2 characters.",
    }),
    lastName: z.string().min(2, {
      message: "Last name must be at least 2 characters.",
    }),
    circle_image: z
      .any()
      .refine((file) => file?.length == 1, "Photo is required.")
      .refine((file) => file[0]?.size <= 3000000, "Max file size is 3MB."),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords don't match",
    path: ["confirm_password"],
  });
//   .superRefine(({ confirm_password, password }, ctx) => {
//     if (confirm_password !== password) {
//       ctx.addIssue({
//         code: "custom",
//         message: "The passwords did not match",
//         path: ["confirmPassword"],
//       });
//     }
//   });

export default function Register() {
  const [preview, setPreview] = useState("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      email: "",
      firstName: "",
      lastName: "",
      circle_image: [],
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    formData.append("username", values.username);
    formData.append("password", values.password);
    formData.append("confirm_password", values.confirm_password);
    formData.append("email", values.email);
    formData.append("firstName", values.firstName);
    formData.append("lastName", values.lastName);
    formData.append("circle_image", values.circle_image[0]);

    const res = await fetch("http://localhost:8080/api/v1/auth/register", {
      method: "POST",
      body: formData,
    });
    console.log(res);
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
        <Link to="/auth/login" className="text-blue-500">
          Click here to login
        </Link>
      </div>
      <div className="flex flex-col justify-center grow overflow-hidden">
        <ScrollArea className="w-full px-5 mb-auto">
          <Form {...form}>
            <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
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
              <FormField
                control={form.control}
                name="confirm_password"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-start">
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Retype your password"
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
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-start">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your email"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      We would like to inform you about our latest news.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-start">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your firstName"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      We would like to inform you about our latest news.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-start">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your last name"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      We would like to inform you about our latest news.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Avatar className="w-20 h-20 m-auto">
                <AvatarImage src={preview} />
                <AvatarFallback>BU</AvatarFallback>
              </Avatar>
              <FormField
                control={form.control}
                name="circle_image"
                render={({ field: { onChange, value, ...rest } }) => (
                  <>
                    <FormItem className="flex flex-col items-start">
                      <FormLabel>Avatar</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          {...rest}
                          onChange={(event) => {
                            const { files, displayUrl } = getImageData(event);
                            setPreview(displayUrl);
                            onChange(files);
                          }}
                        />
                      </FormControl>
                      <FormDescription>
                        Choose best image that bring spirits to your circle.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  </>
                )}
              />
              <Button type="submit">Register</Button>
            </form>
          </Form>
        </ScrollArea>
      </div>
    </Fragment>
  );
}
