import { createFileRoute } from "@tanstack/react-router";
import { AppTopbar } from "@/components/app/AppTopbar";
import { Plate } from "@/components/site/Plate";
import { cn } from "@/lib/utils";
import { Loader2, Trash2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AddJobModal } from "@/components/app/AddJobModal";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { toast } from "sonner";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/app/workshop")({
  head: () => ({ meta: [{ title: "Workshop · VehicleCity UK" }] }),
  component: Workshop,
});

const COLS = [
  { id: "queue", title: "Booked", tone: "bg-muted text-muted-foreground" },
  { id: "diag", title: "Diagnostics", tone: "bg-warning/15 text-warning-foreground" },
  { id: "bay", title: "In bay", tone: "bg-accent/15 text-accent" },
  { id: "parts", title: "Awaiting parts", tone: "bg-muted text-muted-foreground" },
  { id: "ready", title: "Ready", tone: "bg-success/15 text-success" },
];

function Workshop() {
  const { session } = Route.useRouteContext();
  const workspaceId = session.user.id;
  const queryClient = useQueryClient();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const { data: jobs, isLoading } = useQuery({
    queryKey: ["jobs", workspaceId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("jobs")
        .select(`
          *,
          vehicle:vehicles(registration, make_model)
        `)
        .eq("workspace_id", workspaceId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const updateJobStatus = useMutation({
    mutationFn: async ({ jobId, status }: { jobId: string; status: string }) => {
      const { error } = await supabase
        .from("jobs")
        .update({ status, updated_at: new Date().toISOString() })
        .eq("id", jobId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs", workspaceId] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update status");
      queryClient.invalidateQueries({ queryKey: ["jobs", workspaceId] });
    },
  });

  const deleteJob = useMutation({
    mutationFn: async (jobId: string) => {
      const { error } = await supabase.from("jobs").delete().eq("id", jobId);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Job deleted");
      queryClient.invalidateQueries({ queryKey: ["jobs", workspaceId] });
      queryClient.invalidateQueries({ queryKey: ["calendar-jobs"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to delete job");
    },
  });

  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      
      const handleWheel = (e: WheelEvent) => {
        if (e.deltaY !== 0) {
          // Only scroll horizontally if we are not dragging or if we explicitly want to
          e.preventDefault();
          gsap.to(container, {
            scrollLeft: container.scrollLeft + e.deltaY * 2.5,
            duration: 0.4,
            ease: "power2.out"
          });
        }
      };

      container.addEventListener("wheel", handleWheel, { passive: false });
      return () => container.removeEventListener("wheel", handleWheel);
    }
  }, [isLoading]);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Update status in database
    updateJobStatus.mutate({ jobId: draggableId, status: destination.droppableId });

    // Optimistic UI update
    const updatedJobs = jobs ? [...jobs] : [];
    const jobIndex = updatedJobs.findIndex((j) => j.id === draggableId);
    
    if (jobIndex !== -1) {
      updatedJobs[jobIndex] = { ...updatedJobs[jobIndex], status: destination.droppableId };
      queryClient.setQueryData(["jobs", workspaceId], updatedJobs);
    }
  };

  const getGroupedJobs = (status: string) => {
    return jobs?.filter((j) => j.status === status) || [];
  };

  return (
    <div className="flex flex-col h-full overflow-hidden no-scrollbar">
      <AppTopbar
        title="Workshop"
        subtitle={`Live status across your bays · ${jobs?.length || 0} active jobs`}
        actions={<AddJobModal workspaceId={workspaceId} />}
      />
      
      {/* Scrollable Container wrapped in DragDropContext */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div 
          ref={scrollContainerRef}
          className="flex-1 overflow-x-auto bg-surface/30 no-scrollbar relative"
        >
          {isLoading ? (
            <div className="flex h-full items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <div className="flex gap-6 h-full p-6 min-w-max pr-12">
              {COLS.map((c) => (
                <div key={c.id} className="w-80 flex flex-col h-full max-h-full">
                  <div className="flex items-center justify-between px-1 mb-4 shrink-0">
                    <div className="flex items-center gap-2">
                      <span className={cn("rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-widest", c.tone)}>
                        {c.title}
                      </span>
                      <span className="text-xs font-bold text-muted-foreground/40">{getGroupedJobs(c.id).length}</span>
                    </div>
                  </div>
                  
                  <Droppable droppableId={c.id}>
                    {(provided, snapshot) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className={cn(
                          "flex-1 overflow-y-auto space-y-3 rounded-2xl p-2 transition-all duration-300 no-scrollbar",
                          snapshot.isDraggingOver ? "bg-primary/5 ring-1 ring-primary/10 ring-inset" : "bg-transparent"
                        )}
                      >
                        {getGroupedJobs(c.id).map((job, index) => (
                          <Draggable key={job.id} draggableId={job.id} index={index}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={cn(
                                  "rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-300",
                                  snapshot.isDragging ? "shadow-2xl border-primary/40 rotate-3 scale-105 z-50 ring-2 ring-primary/20" : "hover:border-foreground/10 hover:shadow-lg active:scale-95"
                                )}
                              >
                                <div className="flex items-center justify-between mb-4">
                                  <Plate reg={job.vehicle?.registration || "???"} className="scale-90 origin-left" />
                                  <div className="flex items-center gap-1">
                                    <span className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest bg-muted/30 px-2 py-0.5 rounded">
                                      {job.scheduled_date ? new Date(job.scheduled_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) : (job.eta || "Scheduled")}
                                    </span>
                                    <AlertDialog>
                                      <AlertDialogTrigger asChild>
                                        <button 
                                          className="p-1 text-muted-foreground/40 hover:text-destructive transition-colors"
                                          onClick={(e) => e.stopPropagation()}
                                        >
                                          <Trash2 className="h-3 w-3" />
                                        </button>
                                      </AlertDialogTrigger>
                                      <AlertDialogContent onClick={(e) => e.stopPropagation()}>
                                        <AlertDialogHeader>
                                          <AlertDialogTitle>Delete job?</AlertDialogTitle>
                                          <AlertDialogDescription>
                                            This will permanently remove the workshop job for <strong>{job.vehicle?.registration}</strong>.
                                          </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                                          <AlertDialogAction 
                                            onClick={() => deleteJob.mutate(job.id)}
                                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                          >
                                            Delete
                                          </AlertDialogAction>
                                        </AlertDialogFooter>
                                      </AlertDialogContent>
                                    </AlertDialog>
                                  </div>
                                </div>
                                <div className="text-[15px] font-bold text-foreground leading-tight tracking-tight">
                                  {job.vehicle?.make_model || "Unknown Vehicle"}
                                </div>
                                <div className="mt-1.5 text-xs text-muted-foreground/80 font-medium line-clamp-1">
                                  {job.service_type}
                                </div>
                                <div className="mt-5 flex items-center justify-between border-t border-border/60 pt-4">
                                  <div className="text-[10px] font-black text-muted-foreground/40 uppercase tracking-[0.2em]">
                                    {job.bay || "UNASSIGNED"}
                                  </div>
                                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-accent/10 text-accent text-[11px] font-black ring-2 ring-accent/5">
                                    {job.mechanic_name?.[0] || "?"}
                                  </div>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                        {getGroupedJobs(c.id).length === 0 && !snapshot.isDraggingOver && (
                          <div className="rounded-2xl border-2 border-dashed border-border/20 p-12 text-center bg-card/5 opacity-40">
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">No active jobs</p>
                          </div>
                        )}
                      </div>
                    )}
                  </Droppable>
                </div>
              ))}
            </div>
          )}
        </div>
      </DragDropContext>
    </div>
  );
}
