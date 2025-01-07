"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@repo/ui/components/button";
import { Textarea } from "@repo/ui/components/textarea";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField } from "@repo/ui/components/form";
import { z } from "zod";
//import { chirpAction } from "@/app/actions";
import { useToast } from "@repo/ui/hooks/use-toast";
import { chirpSchema } from "@repo/validators";
import { api } from "@/trpc/client";
import { chirpAction } from "@/app/actions";

const ChirpForm = () => {
  const { toast } = useToast();
  const utils = api.useUtils();
  const form = useForm<z.infer<typeof chirpSchema>>({
    resolver: zodResolver(chirpSchema),
    defaultValues: {
      chirp: "",
    },
  });
  //const { mutate: addChirp } = api.chirp.addChirp.useMutation({
  //  onSuccess: () => {
  //    toast({
  //      title: "Add New Chirp",
  //      description: "Chirp Added Successfully",
  //    });
  //    utils.chirp.getChirps.invalidate();
  //    utils.chirp.infinite.invalidate();
  //    form.reset();
  //  },
  //  onError: (err) => {
  //    console.log(err);
  //    toast({
  //      title: "Add New Chirp",
  //      description: "Chirp Failed to Add",
  //      variant: "destructive",
  //    });
  //  },
  //});
  const onSubmit = async (data: z.infer<typeof chirpSchema>) => {
    chirpAction(data);
    form.reset();
    return;
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="chirp"
          render={({ field }) => (
            <FormControl>
              <Textarea
                placeholder="Write a chirp of your thoughts..."
                {...field}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    form.handleSubmit(onSubmit)();
                  }
                }}
                autoFocus
              />
            </FormControl>
          )}
        />
        <Button className="self-end">Submit</Button>
      </form>
    </Form>
  );
};

export default ChirpForm;
