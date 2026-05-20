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

export function AddInvoiceModal({ workspaceId }: { workspaceId: string }) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [customerId, setCustomerId] = useState("");
  const [vehicleId, setVehicleId] = useState("none");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [dueDate, setDueDate] = useState<Date | undefined>(new Date());
  
  const [customers, setCustomers] = useState<any[]>([]);
  const [vehicles, setVehicles] = useState<any[]>([]);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (open) {
      const fetchData = async () => {
        const [custRes, vehRes] = await Promise.all([
          supabase
            .from("customers")
            .select("id, name")
            .eq("workspace_id", workspaceId)
            .order("name"),
          supabase
            .from("vehicles")
            .select("id, registration, make_model, customer_id")
            .eq("workspace_id", workspaceId)
            .order("registration")
        ]);

        if (custRes.data) setCustomers(custRes.data);
        if (vehRes.data) setVehicles(vehRes.data);

        // Generate a random invoice number if empty
        if (!invoiceNumber) {
          const rand = Math.floor(1000 + Math.random() * 9000);
          setInvoiceNumber(`INV-${rand}`);
        }
      };
      fetchData();
    }
  }, [open, workspaceId]);

  // Update vehicle list based on selected customer
  const filteredVehicles = customerId 
    ? vehicles.filter(v => v.customer_id === customerId)
    : vehicles;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dueDate) {
      toast.error("Please select a due date");
      return;
    }
    
    setIsLoading(true);

    try {
      const { error } = await supabase.from("invoices").insert({
        workspace_id: workspaceId,
        customer_id: customerId || null,
        vehicle_id: vehicleId === "none" ? null : vehicleId,
        invoice_number: invoiceNumber,
        amount: parseFloat(amount),
        status: "sent",
        due_date: format(dueDate, "yyyy-MM-dd"),
      });

      if (error) throw error;

      toast.success("Invoice created successfully");
      setOpen(false);
      setCustomerId("");
      setVehicleId("none");
      setAmount("");
      setInvoiceNumber("");
      setDueDate(new Date());
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
    } catch (error: any) {
      toast.error(error.message || "Failed to create invoice");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-1.5">
          <Plus className="h-3.5 w-3.5" /> New invoice
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>New Invoice</DialogTitle>
            <DialogDescription>
              Create a new invoice for a customer.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="invoiceNumber">Invoice Number</Label>
              <Input
                id="invoiceNumber"
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
                placeholder="INV-1234"
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="customer">Customer</Label>
              <Select value={customerId} onValueChange={setCustomerId} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select a customer" />
                </SelectTrigger>
                <SelectContent>
                  {customers.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.name}
                    </SelectItem>
                  ))}
                  {customers.length === 0 && (
                    <SelectItem value="none" disabled>No customers found.</SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="vehicle">Vehicle (Optional)</Label>
              <Select value={vehicleId} onValueChange={setVehicleId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a vehicle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  {filteredVehicles.map((v) => (
                    <SelectItem key={v.id} value={v.id}>
                      {v.registration} {v.make_model ? `(${v.make_model})` : ""}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="amount">Amount (£)</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label>Due Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !dueDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dueDate ? format(dueDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dueDate}
                    onSelect={setDueDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading || !customerId || !amount}>
              {isLoading ? "Creating..." : "Create invoice"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
