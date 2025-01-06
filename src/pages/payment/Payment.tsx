import { DataTable } from "./data-table";
import { columns } from "./columns";
import { useLocation } from "react-router-dom";
import { useState } from "react";

export default function Payment() {
  const { state } = useLocation();
  const [data, setData] = useState(state);
  console.log("DATA", data);

  return (
    <div className="min-h-screen">
      <h2 className="font-semibold text-3xl my-10">Checkout</h2>
      <DataTable columns={columns} data={data} setData={setData} />
    </div>
  );
}
