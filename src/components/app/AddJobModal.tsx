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
import { Plus, Calendar as CalendarIcon } from "lucide-react";
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
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface AddJobModalProps {
  workspaceId: string;
  initialDate?: string;
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function AddJobModal({ 
  workspaceId, 
  initialDate, 
  trigger,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange 
}: AddJobModalProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setOpen = controlledOnOpenChange !== undefined ? controlledOnOpenChange : setInternalOpen;

  const [isLoading, setIsLoading] = useState(false);
  const [vehicleId, setVehicleId] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [mechanicName, setMechanicName] = useState("");
  const [bay, setBay] = useState("");
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [date, setDate] = useState<Date | undefined>(
    initialDate ? new Date(initialDate) : new Date()
  );

  const queryClient = useQueryClient();

  useEffect(() => {
    if (open) {
      const fetchVehicles = async () => {
        const { data } = await supabase
          .from("vehicles")
          .select("id, registration, make_model, customer_id")
          .eq("workspace_id", workspaceId)
          .order("registration");
        if (data) setVehicles(data);
      };
      fetchVehicles();
      if (initialDate) {
        setDate(new Date(initialDate));
      }
    }
  }, [open, workspaceId, initialDate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date) {
      toast.error("Please select a date");
      return;
    }
    
    setIsLoading(true);

    const selectedVehicle = vehicles.find(v => v.id === vehicleId);

    try {
      const { error } = await supabase.from("jobs").insert({
        workspace_id: workspaceId,
        vehicle_id: vehicleId,
        customer_id: selectedVehicle?.customer_id || null,
        status: "queue",
        service_type: serviceType,
        mechanic_name: mechanicName || null,
        bay: bay || null,
        eta: "Scheduled",
        scheduled_date: format(date, "yyyy-MM-dd"),
      });

      if (error) throw error;

      toast.success("Job created successfully");
      setOpen(false);
      setVehicleId("");
      setServiceType("");
      setMechanicName("");
      setBay("");
      setDate(new Date());
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      queryClient.invalidateQueries({ queryKey: ["calendar-jobs"] });
    } catch (error: any) {
      toast.error(error.message || "Failed to create job");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button size="sm" className="gap-1.5">
            <Plus className="h-3.5 w-3.5" /> New job
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>New workshop job</DialogTitle>
            <DialogDescription>
              Assign a new job to a vehicle in your workspace.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="vehicle">Vehicle</Label>
              <Select value={vehicleId} onValueChange={setVehicleId} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select a vehicle" />
                </SelectTrigger>
                <SelectContent>
                  {vehicles.map((v) => (
                    <SelectItem key={v.id} value={v.id}>
                      {v.registration} {v.make_model ? `(${v.make_model})` : ""}
                    </SelectItem>
                  ))}
                  {vehicles.length === 0 && (
                    <SelectItem value="none" disabled>No vehicles found. Add one first.</SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label>Scheduled Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="service">Service Type</Label>
              <Input
                id="service"
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                placeholder="MOT, Service, Repair..."
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="mechanic">Mechanic (Optional)</Label>
              <Input
                id="mechanic"
                value={mechanicName}
                onChange={(e) => setMechanicName(e.target.value)}
                placeholder="Name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="bay">Bay (Optional)</Label>
              <Input
                id="bay"
                value={bay}
                onChange={(e) => setBay(e.target.value)}
                placeholder="Bay 1, Bay 2..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading || !vehicleId || !date}>
              {isLoading ? "Creating..." : "Create job"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
