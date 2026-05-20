import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function AddVehicleModal({ workspaceId }: { workspaceId: string }) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [registration, setRegistration] = useState("");
  const [makeModel, setMakeModel] = useState("");
  const [customerId, setCustomerId] = useState<string>("");
  const [customers, setCustomers] = useState<any[]>([]);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (open) {
      const fetchCustomers = async () => {
        const { data } = await supabase
          .from("customers")
          .select("id, name")
          .eq("workspace_id", workspaceId)
          .order("name");
        if (data) setCustomers(data);
      };
      fetchCustomers();
    }
  }, [open, workspaceId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.from("vehicles").insert({
        workspace_id: workspaceId,
        registration: registration.toUpperCase(),
        make_model: makeModel,
        customer_id: customerId || null,
        mot_status: "Check DVLA",
        tax_status: "Check DVLA",
      });

      if (error) throw error;

      toast.success("Vehicle added successfully");
      setOpen(false);
      setRegistration("");
      setMakeModel("");
      setCustomerId("");
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
    } catch (error: any) {
      toast.error(error.message || "Failed to add vehicle");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-1.5">
          <Plus className="h-3.5 w-3.5" /> Add vehicle
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add vehicle</DialogTitle>
            <DialogDescription>
              Register a new vehicle in your workspace.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="registration">Registration Number</Label>
              <Input
                id="registration"
                value={registration}
                onChange={(e) => setRegistration(e.target.value)}
                placeholder="AB12 CDE"
                className="uppercase"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="makeModel">Make & Model</Label>
              <Input
                id="makeModel"
                value={makeModel}
                onChange={(e) => setMakeModel(e.target.value)}
                placeholder="Ford Focus"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="customer">Owner (Optional)</Label>
              <Select value={customerId} onValueChange={setCustomerId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a customer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No owner</SelectItem>
                  {customers.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Adding..." : "Add vehicle"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
