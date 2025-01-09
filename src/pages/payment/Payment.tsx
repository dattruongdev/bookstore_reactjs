import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Elements, PaymentElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export default function Payment() {
  const options = {
    clientSecret: import.meta.env.VITE_STRIPE_CLIENT_SECRET,
  };
  return (
    <div className="min-h-screen">
      <h2 className="font-semibold text-3xl my-10">Checkout</h2>
      <DataTable columns={columns} />
      <Elements stripe={stripePromise} options={options}>
        <form>
          <PaymentElement />
          <button>Submit</button>
        </form>
      </Elements>
    </div>
  );
}
