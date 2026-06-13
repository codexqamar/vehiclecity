import { r as reactExports, W as jsxRuntimeExports } from "./server-B6_Oiuea.mjs";
import { u as useQuery, A as AppTopbar } from "./AppTopbar-B2N-utjh.mjs";
import { P as Plate } from "./Plate-DI6wOjYz.mjs";
import { c as cn } from "./button-CBWnG0WW.mjs";
import { i as Route$1, b as useQueryClient, t as toast, s as supabase } from "./router-DvedLIcD.mjs";
import { u as useMutation } from "./useMutation-o548g_bv.mjs";
import { A as AddJobModal, D as DragDropContext, C as ConnectedDroppable, P as PublicDraggable } from "./dnd.esm-tyZKO50W.mjs";
import { c as ChevronLeft, P as Popover, a as PopoverTrigger, b as PopoverContent, C as Calendar$1 } from "./popover-DTBEW-e7.mjs";
import { C as Calendar } from "./calendar-D69TJAaR.mjs";
import { C as ChevronRight } from "./chevron-right-Bp1KjpvA.mjs";
import { L as LoaderCircle } from "./loader-circle-B0RJ0UPi.mjs";
import { P as Plus } from "./plus-D-HN2_wc.mjs";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./ThemeToggle-DL_hqj43.mjs";
import "./search-D_lFFk0a.mjs";
import "./bell-D3M_u7N_.mjs";
import "./dialog-CDCitZBe.mjs";
import "./index-CPhrW7pK.mjs";
import "./index-4JqtvOL4.mjs";
import "./input-CQWJZSou.mjs";
import "./label-BG98R_ZY.mjs";
import "./select-BOMdvC5a.mjs";
import "./index-CuM6yV67.mjs";
import "./check-hP7kZg1H.mjs";
import "./tiny-invariant-BVT9pohb.mjs";
function CalendarPage() {
  const {
    session
  } = Route$1.useRouteContext();
  const workspaceId = session.user.id;
  const queryClient = useQueryClient();
  const today = /* @__PURE__ */ new Date();
  const dayOfWeek = today.getDay();
  const diff = today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
  const startOfWeek = new Date(today.setDate(diff));
  const [currentWeekStart, setCurrentWeekStart] = reactExports.useState(startOfWeek);
  const [isAddModalOpen, setIsAddModalOpen] = reactExports.useState(false);
  const [selectedDate, setSelectedDate] = reactExports.useState();
  const {
    data: jobs,
    isLoading
  } = useQuery({
    queryKey: ["calendar-jobs", workspaceId, currentWeekStart.toISOString()],
    queryFn: async () => {
      const endOfWeek = new Date(currentWeekStart);
      endOfWeek.setDate(currentWeekStart.getDate() + 6);
      const {
        data,
        error
      } = await supabase.from("jobs").select(`
          *,
          vehicle:vehicles(registration, make_model)
        `).eq("workspace_id", workspaceId).gte("scheduled_date", currentWeekStart.toISOString().split("T")[0]).lte("scheduled_date", endOfWeek.toISOString().split("T")[0]);
      if (error) throw error;
      return data;
    }
  });
  const updateJobDate = useMutation({
    mutationFn: async ({
      jobId,
      date
    }) => {
      const {
        error
      } = await supabase.from("jobs").update({
        scheduled_date: date,
        updated_at: (/* @__PURE__ */ new Date()).toISOString()
      }).eq("id", jobId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["calendar-jobs", workspaceId]
      });
      toast.success("Job rescheduled");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to reschedule job");
      queryClient.invalidateQueries({
        queryKey: ["calendar-jobs", workspaceId]
      });
    }
  });
  const onDragEnd = (result) => {
    const {
      destination,
      source,
      draggableId
    } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }
    updateJobDate.mutate({
      jobId: draggableId,
      date: destination.droppableId
    });
    const updatedJobs = jobs ? [...jobs] : [];
    const jobIndex = updatedJobs.findIndex((j) => j.id === draggableId);
    if (jobIndex !== -1) {
      updatedJobs[jobIndex] = {
        ...updatedJobs[jobIndex],
        scheduled_date: destination.droppableId
      };
      queryClient.setQueryData(["calendar-jobs", workspaceId, currentWeekStart.toISOString()], updatedJobs);
    }
  };
  const getDaysOfWeek = () => {
    const days2 = [];
    for (let i = 0; i < 6; i++) {
      const date = new Date(currentWeekStart);
      date.setDate(currentWeekStart.getDate() + i);
      days2.push(date);
    }
    return days2;
  };
  const days = getDaysOfWeek();
  const navigateWeek = (direction) => {
    const newDate = new Date(currentWeekStart);
    newDate.setDate(currentWeekStart.getDate() + direction * 7);
    setCurrentWeekStart(newDate);
  };
  const handleJumpToDate = (date) => {
    if (!date) return;
    const day = date.getDay();
    const d = date.getDate() - day + (day === 0 ? -6 : 1);
    const s = new Date(date.setDate(d));
    setCurrentWeekStart(s);
  };
  const openAddModal = (dateStr) => {
    setSelectedDate(dateStr);
    setIsAddModalOpen(true);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AppTopbar, { title: "Calendar", subtitle: `Week of ${currentWeekStart.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric"
    })}`, actions: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 bg-card border border-border rounded-md p-0.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => navigateWeek(-1), className: "p-1 hover:bg-muted rounded transition-colors", title: "Previous Week", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-4 w-4" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Popover, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "px-2 text-xs font-medium hover:bg-muted rounded py-1 transition-colors flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3 w-3" }),
            "Jump to"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverContent, { className: "w-auto p-0", align: "end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar$1, { mode: "single", onSelect: handleJumpToDate, initialFocus: true }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setCurrentWeekStart(new Date(startOfWeek)), className: "px-2 text-xs font-medium hover:bg-muted rounded py-1 transition-colors", children: "Today" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => navigateWeek(1), className: "p-1 hover:bg-muted rounded transition-colors", title: "Next Week", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AddJobModal, { workspaceId, open: isAddModalOpen, onOpenChange: setIsAddModalOpen, initialDate: selectedDate })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-border bg-card shadow-soft overflow-hidden", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-96 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-muted-foreground" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(DragDropContext, { onDragEnd, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-6 divide-y md:divide-y-0 md:divide-x divide-border min-h-[600px]", children: days.map((day) => {
      const dateStr = day.toISOString().split("T")[0];
      const dayJobs = jobs?.filter((j) => j.scheduled_date === dateStr) || [];
      const isToday = (/* @__PURE__ */ new Date()).toISOString().split("T")[0] === dateStr;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("flex flex-col min-h-[150px]", isToday && "bg-accent/5"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("px-4 py-3 border-b border-border flex flex-col items-center justify-center relative group", isToday ? "bg-accent text-accent-foreground" : "bg-surface/50 text-muted-foreground"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold uppercase tracking-widest opacity-80", children: day.toLocaleDateString("en-GB", {
            weekday: "short"
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl font-bold tracking-tighter", children: day.getDate() }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => openAddModal(dateStr), className: "absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-background/20 hover:bg-background/40 rounded-full opacity-0 group-hover:opacity-100 transition-all", title: "Add job for this day", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3 w-3" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ConnectedDroppable, { droppableId: dateStr, children: (provided, snapshot) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ...provided.droppableProps, ref: provided.innerRef, className: cn("flex-1 p-2 space-y-2 overflow-y-auto max-h-[500px] cursor-pointer transition-colors", snapshot.isDraggingOver ? "bg-accent/10" : "hover:bg-accent/5"), onClick: (e) => {
          if (e.target === e.currentTarget) openAddModal(dateStr);
        }, children: [
          dayJobs.map((job, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(PublicDraggable, { draggableId: job.id, index, children: (provided2, snapshot2) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: provided2.innerRef, ...provided2.draggableProps, ...provided2.dragHandleProps, className: cn("bg-card border border-border rounded-lg p-3 shadow-sm hover:border-foreground/10 transition-colors cursor-default", snapshot2.isDragging && "shadow-xl border-primary/40 rotate-1 scale-105 z-50 ring-2 ring-primary/20"), onClick: (e) => e.stopPropagation(), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plate, { reg: job.vehicle?.registration || "???", className: "scale-75 origin-left" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase", job.status === "ready" ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"), children: job.status })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold truncate", children: job.vehicle?.make_model || "Unknown" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground line-clamp-1 mt-0.5", children: job.service_type })
          ] }) }, job.id)),
          provided.placeholder,
          dayJobs.length === 0 && !snapshot.isDraggingOver && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full flex items-center justify-center py-10 opacity-20 pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-8 w-8" }) })
        ] }) })
      ] }, dateStr);
    }) }) }) }) })
  ] });
}
export {
  CalendarPage as component
};
