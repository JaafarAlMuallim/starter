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
import { api } from "@/trpc/server";

// server componnet
//const ViewChirps = async () => {
//  const chirps = await api.chirp.getUserChirps();

const ViewChirps = async () => {
  const chirps = await api.chirp.getChirps();

  if (!chirps) {
    return <div>No Chirps Yet. Start Chirping</div>;
  }
  return (
    <div className="flex flex-col gap-4">
      {chirps.map((chirp) => (
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
    </div>
  );
};

export default ViewChirps;
