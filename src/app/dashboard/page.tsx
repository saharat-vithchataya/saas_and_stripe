import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import {
  createCheckoutLink,
  createCustomerIfNull,
  generateCustomerPortalLink,
  hasSubscription,
} from "@/helpers/billing";
import { PrismaClient } from "@prisma/client";
import Link from "next/link";

const prisma = new PrismaClient();

export default async function Page() {
  const session = await getServerSession(authOptions);
  await createCustomerIfNull();
  const user = await prisma.user.findFirst({
    where: {
      email: session?.user?.email,
    },
  });
  const manage_link = await generateCustomerPortalLink(
    "" + user?.stripe_customer_id
  );
  const hasSub = await hasSubscription();
  const checkout_link = await createCheckoutLink(
    String(user?.stripe_customer_id)
  );
  return (
    <div className="max-w-4xl m-auto w-full px-4">
      <div className="flex flex-col">
        <p className="text-2xl font-medium">Hello, {session?.user?.name}</p>
        <div className="py-4 ">
          <Link
            href={String(manage_link)}
            className="bg-black text-white rounded-md px-2 py-1 ml-auto"
          >
            Manage billing
          </Link>
        </div>
        <div className="">
          {hasSub ? (
            <div className="p-6 rounded-md border-emerald-400 border shadow-sm font-medium">
              Subscribed
            </div>
          ) : (
            <div className="p-6 rounded-md border-zinc-200 border shadow-sm font-medium flex items-center gap-2">
              Free plan
              <Link
                href={"" + checkout_link}
                className="bg-black text-white rounded-md px-2 py-1 ml-auto"
              >
                Upgrade
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
