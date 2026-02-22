import { useMutation } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { type InsertContactMessage } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export function useCreateContact() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: InsertContactMessage) => {
      const res = await fetch(api.contact.create.path, {
        method: api.contact.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      let body: unknown;
      try {
        body = await res.json();
      } catch {
        throw new Error(res.ok ? "Invalid response from server" : `Request failed: ${res.status} ${res.statusText}`);
      }

      if (!res.ok) {
        const msg = body && typeof body === "object" && "message" in body && typeof (body as { message: unknown }).message === "string"
          ? (body as { message: string }).message
          : `Request failed: ${res.status} ${res.statusText}`;
        throw new Error(msg);
      }

      return api.contact.create.responses[200].parse(body);
    },
    onSuccess: () => {
      toast({
        title: "Message sent",
        description: "We've received your inquiry and will get back to you shortly.",
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
