import React, { useState } from "react";
import { Ratings } from "../components/Rating";
import { Separator } from "../components/ui/separator";
import { ShoppingCart } from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { CommentRatings } from "../components/CommentRatings";
import { Textarea } from "../components/ui/textarea";

export default function Book() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [review, setReview] = useState<string>("");
  return (
    <div className="min-w-[80%]">
      <div className="flex grow w-[90%]">
        {/* Images */}
        <div className="flex-[1]"></div>

        {/* Book info */}
        <div className="flex-[2] text-left">
          <div className="categories flex justify-between items-center">
            <div className="text-pink-400">EDUCATION, HISTORY</div>
            <div>
              <div className="flex items-center gap-3">
                <span>4.3</span>
                <Ratings rating={4.3} />
              </div>
              <div>118 reviews</div>
            </div>
          </div>

          <div className="title">Book title</div>
          <div className="description">some description</div>
          <div className="flex items-center gap-5">
            <div>
              <p>Author</p>
              <p>Collin</p>
            </div>

            <div>
              <p>Year</p>
              <p>2022</p>
            </div>
          </div>

          <Separator color="grey" className="my-5" />

          <div className="flex items-center justify-between">
            <div className="text-xl text-pink-400">43.000 VND</div>
            <Button className="flex rounded-full px-5 py-3 bg-pink-400 text-white gap-3">
              Add Cart{" "}
              <span>
                <ShoppingCart color="white" />
              </span>
            </Button>
          </div>
        </div>
      </div>
      <Tabs defaultValue="description" className="w-[80%] mx-auto my-20">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="product">Product</TabsTrigger>
          <TabsTrigger value="review">Review</TabsTrigger>
        </TabsList>
        <TabsContent value="description" defaultValue={"description"}>
          <div className="mt-12">Description</div>
          <div>Author</div>
        </TabsContent>
        <TabsContent value="product">
          <div className="mt-12">
            <table>
              <tbody>
                {/* add book format: and value is Paperback horizontally */}
                <tr>
                  <td>Format:</td>
                  <td>Paperback</td>
                </tr>
                <tr>
                  <td>Dimension:</td>
                  <td>126mm x 194mm x 28mm | 300g</td>
                </tr>
                <tr>
                  <td>Publication date:</td>
                  <td>01 Jan 2022</td>
                </tr>
              </tbody>
            </table>
          </div>
        </TabsContent>
        <TabsContent value="review">
          <div className="flex">
            {/* Reviews */}
            <div className="flex flex-col"></div>
            {/* input review */}
            <form className="flex flex-col" method="post">
              <table>
                <tbody>
                  <tr>
                    <td className="p-5">
                      <Label>Rating</Label>
                    </td>
                    <td>
                      <CommentRatings rating={0} onRatingChange={() => {}} />
                    </td>
                  </tr>
                  <tr>
                    <td className="p-5">
                      <Label>Name:</Label>
                    </td>
                    <td>
                      <Input
                        type="text"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="p-5">
                      <Label>Email:</Label>
                    </td>
                    <td>
                      <Input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="p-5">
                      <Label>Review:</Label>
                    </td>
                    <td>
                      <Textarea
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <Input type="submit" value="Submit" />
            </form>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
