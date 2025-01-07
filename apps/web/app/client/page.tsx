"use client";

import { cx } from "class-variance-authority";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@repo/ui/components/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/avatar";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import ChirpForm from "@/components/chirp-form";
import { useLiveChirps } from "@/hooks/use-live-chirps";
import { useRef } from "react";
import { Button } from "@repo/ui/components/button";
import { run } from "@/lib/utils";

const ViewChirps = () => {
  const liveChirps = useLiveChirps();
  const scrollRef = useRef<HTMLDivElement>(null);

  if (!liveChirps.chirps) {
    return <div>No Chirps Yet. Start Chirping</div>;
  }
  return (
    <MaxWidthWrapper className="flex flex-col gap-4">
      <ChirpForm />
      <SubscriptionStatus subscription={liveChirps.subscription} />
      <div className="flex flex-col gap-4" ref={scrollRef}>
        {liveChirps.chirps.map((chirp) => (
          <Card key={chirp.id}>
            <CardHeader className="flex flex-row items-center justify-start gap-2">
              <Avatar>
                <AvatarImage src={chirp.user!.image ?? ""} />
                <AvatarFallback className="bg-gradient-to-b from-violet-500 to-blue-400 text-white">
                  {chirp.user!.name[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span>{chirp.user!.name}</span>
            </CardHeader>
            <CardContent>
              <p>{chirp.chirp}</p>
            </CardContent>
            <CardFooter>
              <p>{new Date(chirp.updated_at).toLocaleString()}</p>
            </CardFooter>
          </Card>
        ))}
        <div>
          <Button
            disabled={
              !liveChirps.query.hasNextPage ||
              liveChirps.query.isFetchingNextPage
            }
            onClick={() => {
              void liveChirps.query.fetchNextPage();
            }}
          >
            {liveChirps.query.isFetchingNextPage
              ? "Loading..."
              : !liveChirps.query.hasNextPage
                ? "Fetched everything!"
                : "Load more"}
          </Button>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default ViewChirps;

function SubscriptionStatus(props: {
  subscription: ReturnType<typeof useLiveChirps>["subscription"];
}) {
  const { subscription } = props;
  return (
    <div
      className={cx(
        "rounded-md p-2 text-sm transition-colors",
        run(() => {
          switch (subscription.status) {
            case "connecting":
              return "bg-white text-gray-500 dark:bg-gray-900 dark:text-gray-400";
            case "error":
              return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
            case "pending":
              return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200";
          }
        }),
      )}
    >
      {run(() => {
        switch (subscription.status) {
          case "connecting":
            // treat idle and connecting the same

            return (
              <div>
                Connecting...
                {subscription.error && " (There are connection problems)"}
              </div>
            );
          case "error":
            // something went wrong
            return (
              <div>
                Error - <em>{subscription.error.message}</em>
                <a
                  href="#"
                  onClick={() => {
                    subscription.reset();
                  }}
                  className="hover underline"
                >
                  Try Again
                </a>
              </div>
            );
          case "pending":
            // we are polling for new messages
            return <div>Connected - awaiting messages</div>;
        }
      })}
    </div>
  );
}
