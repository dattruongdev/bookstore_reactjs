"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { toast } from "../hooks/use-toast";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import DualThumbSlider from "./DualThumbSlider";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Ratings } from "./Rating";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const FormSchema = z.object({
  categories: z.array(z.string()),
  authors: z.array(z.string()),
  price: z.array(z.number(), z.number()),
  rating: z.string(),
  // minPrice: z.number().min(0),
  // maxPrice: z.number(),
});

export default function FilterForm({
  categories,
  authors,
  onFilter,
}: {
  categories: { name: string; id: string }[];
  authors: Author[];
  onFilter: (books: Book[]) => void;
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      categories: [],
      authors: [],
      price: [0, 200000],
      rating: "0",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const { categories, authors, price, rating } = data;

    const res = await fetch(`${BASE_URL}/api/v1/catalog/books-by-filter`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        categoryIds: categories,
        authorIds: authors,
        priceRange: price,
        rating,
      }),
    });

    if (!res.ok) {
      console.error("Failed to filter books", res);
      return;
    }

    const { response } = await res.json();
    const dta = response.data;

    onFilter(dta);

    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="categories"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Categories</FormLabel>
              </div>
              {categories.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="categories"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormLabel className="font-normal mr-auto text-nowrap mb-3">
                          {item.name}
                        </FormLabel>
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item.id
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="authors"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Authors</FormLabel>
              </div>
              {authors.map((item) => (
                <FormField
                  key={item._id}
                  control={form.control}
                  name="authors"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item._id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormLabel className="font-normal mr-auto text-nowrap mb-3">
                          {item.fullName}
                        </FormLabel>
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item._id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item._id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item._id
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="mb-10">
          <FormLabel className="text-base">Price</FormLabel>
        </div>
        <FormField
          control={form.control}
          name="price"
          render={() => (
            <FormItem>
              <DualThumbSlider
                defaultValue={[0, 200000]}
                max={10000000}
                value={[form.getValues("price")[0], form.getValues("price")[1]]}
                onValueChange={(values) => {
                  form.setValue("price", values);
                }}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="mb-4">
          <FormLabel className="text-base">Rating</FormLabel>
        </div>
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => {
            console.log(field);
            return (
              <FormItem>
                <RadioGroup
                  className="flex flex-col gap-5 mt-3"
                  value={field.value}
                  defaultValue={"5"}
                  onValueChange={field.onChange}
                >
                  <div className="flex gap-5 items-center mt-3">
                    <Label
                      htmlFor="rating5"
                      className="mr-auto text-lg text-neutral-600"
                    >
                      <Ratings rating={5} />
                    </Label>
                    <RadioGroupItem value="5" id="rating5" />
                  </div>
                  <div className="flex gap-5 items-center  mt-3">
                    <Label
                      htmlFor="rating4"
                      className="mr-auto text-lg text-neutral-600"
                    >
                      <Ratings rating={4} />
                    </Label>
                    <RadioGroupItem value="4" id="rating4" />
                  </div>
                  <div className="flex gap-5 items-center  mt-3">
                    <Label
                      htmlFor="rating3"
                      className="mr-auto text-lg text-neutral-600"
                    >
                      <Ratings rating={3} />
                    </Label>
                    <RadioGroupItem value="3" id="rating3" />
                  </div>
                  <div className="flex gap-5 items-center  mt-3">
                    <Label
                      htmlFor="rating2"
                      className="mr-auto text-lg text-neutral-600"
                    >
                      <Ratings rating={2} />
                    </Label>
                    <RadioGroupItem value="2" id="rating2" />
                  </div>
                  <div className="flex gap-5 items-center  mt-3">
                    <Label
                      htmlFor="rating5"
                      className="mr-auto text-lg text-neutral-600"
                    >
                      <Ratings rating={1} />
                    </Label>
                    <RadioGroupItem value="1" id="rating1" />
                  </div>
                </RadioGroup>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <Button type="submit">Filter</Button>
      </form>
    </Form>
  );
}
