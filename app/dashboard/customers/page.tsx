import { Metadata } from "next";
import Table from "@/app/ui/customers/table";
import { fetchFilteredCustomers } from "@/app/lib/data";

export const metadata: Metadata = {
  title: "Customers",
};

export default async function Page() {
  // const searchParams = await props.searchParams;
  // const query = searchParams?.query || "";
  const query = "";
  const customers = await fetchFilteredCustomers(query);
  return <Table customers={customers} />;
}
