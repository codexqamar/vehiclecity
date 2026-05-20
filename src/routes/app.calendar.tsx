import { createFileRoute } from "@tanstack/react-router";
import { AppTopbar } from "@/components/app/AppTopbar";
import { Plate } from "@/components/site/Plate";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { useState } from "react";
import { AddJobModal } from "@/components/app/AddJobModal";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { toast } from "sonner";

export const Route = createFileRoute("/app/calendar")({
  head: () => ({ meta: [{ title: "Calendar · VehicleCity UK" }] }),
  component: CalendarPage,
});

function CalendarPage() {
  const { session } = Route.useRouteContext();
  const workspaceId = session.user.id;
  const queryClient = useQueryClient();
  
  // Get current week start (Monday)
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 is Sunday, 1 is Monday
  const diff = today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
  const startOfWeek = new Date(today.setDate(diff));
  
  const [currentWeekStart, setCurrentWeekStart] = useState(startOfWeek);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | undefined>();

  const { data: jobs, isLoading } = useQuery({
    queryKey: ["calendar-jobs", workspaceId, currentWeekStart.toISOString()],
    queryFn: async () => {
      const endOfWeek = new Date(currentWeekStart);
      endOfWeek.setDate(currentWeekStart.getDate() + 6);

      const { data, error } = await supabase
        .from("jobs")
        .select(`
          *,
          vehicle:vehicles(registration, make_model)
        `)
        .eq("workspace_id", workspaceId)
        .gte("scheduled_date", currentWeekStart.toISOString().split('T')[0])
        .lte("scheduled_date", endOfWeek.toISOString().split('T')[0]);

      if (error) throw error;
      return data;
    },
  });

  const updateJobDate = useMutation({
    mutationFn: async ({ jobId, date }: { jobId: string; date: string }) => {
      const { error } = await supabase
        .from("jobs")
        .update({ scheduled_date: date, updated_at: new Date().toISOString() })
        .eq("id", jobId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["calendar-jobs", workspaceId] });
      toast.success("Job rescheduled");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to reschedule job");
      queryClient.invalidateQueries({ queryKey: ["calendar-jobs", workspaceId] });
    },
  });

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Update date in database
    updateJobDate.mutate({ jobId: draggableId, date: destination.droppableId });

    // Optimistic UI update
    const updatedJobs = jobs ? [...jobs] : [];
    const jobIndex = updatedJobs.findIndex((j) => j.id === draggableId);
    
    if (jobIndex !== -1) {
      updatedJobs[jobIndex] = { ...updatedJobs[jobIndex], scheduled_date: destination.droppableId };
      queryClient.setQueryData(["calendar-jobs", workspaceId, currentWeekStart.toISOString()], updatedJobs);
    }
  };

  const getDaysOfWeek = () => {
    const days = [];
    for (let i = 0; i < 6; i++) {
      const date = new Date(currentWeekStart);
      date.setDate(currentWeekStart.getDate() + i);
      days.push(date);
    }
    return days;
  };

  const days = getDaysOfWeek();

  const navigateWeek = (direction: number) => {
    const newDate = new Date(currentWeekStart);
    newDate.setDate(currentWeekStart.getDate() + (direction * 7));
    setCurrentWeekStart(newDate);
  };

  const handleJumpToDate = (date: Date | undefined) => {
    if (!date) return;
    const day = date.getDay();
    const d = date.getDate() - day + (day === 0 ? -6 : 1);
    const s = new Date(date.setDate(d));
    setCurrentWeekStart(s);
  };

  const openAddModal = (dateStr: string) => {
    setSelectedDate(dateStr);
    setIsAddModalOpen(true);
  };

  return (
    <>
      <AppTopbar 
        title="Calendar" 
        subtitle={`Week of ${currentWeekStart.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}`}
        actions={
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-card border border-border rounded-md p-0.5">
              <button 
                onClick={() => navigateWeek(-1)}
                className="p-1 hover:bg-muted rounded transition-colors"
                title="Previous Week"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              
              <Popover>
                <PopoverTrigger asChild>
                  <button 
                    className="px-2 text-xs font-medium hover:bg-muted rounded py-1 transition-colors flex items-center gap-1.5"
                  >
                    <CalendarIcon className="h-3 w-3" />
                    Jump to
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <Calendar
                    mode="single"
                    onSelect={handleJumpToDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <button 
                onClick={() => setCurrentWeekStart(new Date(startOfWeek))}
                className="px-2 text-xs font-medium hover:bg-muted rounded py-1 transition-colors"
              >
                Today
              </button>
              <button 
                onClick={() => navigateWeek(1)}
                className="p-1 hover:bg-muted rounded transition-colors"
                title="Next Week"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
            
            <AddJobModal 
              workspaceId={workspaceId} 
              open={isAddModalOpen}
              onOpenChange={setIsAddModalOpen}
              initialDate={selectedDate}
            />
          </div>
        }
      />
      <div className="p-5">
        <div className="rounded-xl border border-border bg-card shadow-soft overflow-hidden">
          {isLoading ? (
            <div className="flex h-96 items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <DragDropContext onDragEnd={onDragEnd}>
              <div className="grid grid-cols-1 md:grid-cols-6 divide-y md:divide-y-0 md:divide-x divide-border min-h-[600px]">
                {days.map((day) => {
                  const dateStr = day.toISOString().split('T')[0];
                  const dayJobs = jobs?.filter(j => j.scheduled_date === dateStr) || [];
                  const isToday = new Date().toISOString().split('T')[0] === dateStr;

                  return (
                    <div key={dateStr} className={cn("flex flex-col min-h-[150px]", isToday && "bg-accent/5")}>
                      <div className={cn(
                        "px-4 py-3 border-b border-border flex flex-col items-center justify-center relative group",
                        isToday ? "bg-accent text-accent-foreground" : "bg-surface/50 text-muted-foreground"
                      )}>
                        <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">
                          {day.toLocaleDateString('en-GB', { weekday: 'short' })}
                        </span>
                        <span className="text-xl font-bold tracking-tighter">
                          {day.getDate()}
                        </span>
                        
                        <button 
                          onClick={() => openAddModal(dateStr)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-background/20 hover:bg-background/40 rounded-full opacity-0 group-hover:opacity-100 transition-all"
                          title="Add job for this day"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      
                      <Droppable droppableId={dateStr}>
                        {(provided, snapshot) => (
                          <div 
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className={cn(
                              "flex-1 p-2 space-y-2 overflow-y-auto max-h-[500px] cursor-pointer transition-colors",
                              snapshot.isDraggingOver ? "bg-accent/10" : "hover:bg-accent/5"
                            )}
                            onClick={(e) => {
                              if (e.target === e.currentTarget) openAddModal(dateStr);
                            }}
                          >
                            {dayJobs.map((job, index) => (
                              <Draggable key={job.id} draggableId={job.id} index={index}>
                                {(provided, snapshot) => (
                                  <div 
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className={cn(
                                      "bg-card border border-border rounded-lg p-3 shadow-sm hover:border-foreground/10 transition-colors cursor-default",
                                      snapshot.isDragging && "shadow-xl border-primary/40 rotate-1 scale-105 z-50 ring-2 ring-primary/20"
                                    )}
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <div className="flex items-center justify-between mb-2">
                                      <Plate reg={job.vehicle?.registration || "???"} className="scale-75 origin-left" />
                                      <span className={cn(
                                        "text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase",
                                        job.status === 'ready' ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"
                                      )}>
                                        {job.status}
                                      </span>
                                    </div>
                                    <div className="text-xs font-semibold truncate">
                                      {job.vehicle?.make_model || "Unknown"}
                                    </div>
                                    <div className="text-[10px] text-muted-foreground line-clamp-1 mt-0.5">
                                      {job.service_type}
                                    </div>
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                            {dayJobs.length === 0 && !snapshot.isDraggingOver && (
                              <div className="h-full flex items-center justify-center py-10 opacity-20 pointer-events-none">
                                <CalendarIcon className="h-8 w-8" />
                              </div>
                            )}
                          </div>
                        )}
                      </Droppable>
                    </div>
                  );
                })}
              </div>
            </DragDropContext>
          )}
        </div>
      </div>
    </>
  );
}
