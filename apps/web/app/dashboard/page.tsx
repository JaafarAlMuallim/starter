//import { Chart } from "@/components/chart";
//import MaxWidthWrapper from "@/components/max-width-wrapper";
//import { api } from "@/trpc/server";
//
//const Page = async () => {
//  const data = await api.dashboard.getChirpsByDay();
//  const total = data?.reduce((acc, curr) => {
//    return acc + curr.chirps;
//  }, 0);
//  return (
//    <MaxWidthWrapper>
//      <Chart chirps={data} total={total} />
//    </MaxWidthWrapper>
//  );
//};
//
//export default Page;

import { Chart } from "@/components/chart";
import MaxWidthWrapper from "@/components/max-width-wrapper";

const Page = () => {
  return (
    <MaxWidthWrapper>
      <Chart />
    </MaxWidthWrapper>
  );
};

export default Page;
