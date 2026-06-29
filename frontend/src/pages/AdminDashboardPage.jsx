import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { LogOut, Plus, Calendar, MessageSquare, Scissors, Trash2 } from "lucide-react";
import { api, setAdminToken, getAdminToken } from "@/lib/api";
import { formatINR, SALON } from "@/lib/salon";

const STATUS_OPTIONS = ["pending", "confirmed", "completed", "cancelled"];
const STATUS_COLORS = {
  pending: "bg-amber-100 text-amber-800 border-amber-200",
  confirmed: "bg-emerald-100 text-emerald-800 border-emerald-200",
  completed: "bg-blue-100 text-blue-800 border-blue-200",
  cancelled: "bg-rose-100 text-rose-800 border-rose-200",
};

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [services, setServices] = useState([]);
  const [messages, setMessages] = useState([]);
  const [showAddService, setShowAddService] = useState(false);
  const [newService, setNewService] = useState({ name: "", category: "Hair", description: "", price: 500, duration_min: 60 });

  useEffect(() => {
    if (!getAdminToken()) {
      navigate("/admin/login");
      return;
    }
    refresh();
  }, [navigate]);

  const refresh = async () => {
    try {
      const [s, b, sv, m] = await Promise.all([
        api.get("/admin/stats"),
        api.get("/bookings"),
        api.get("/services?active_only=false"),
        api.get("/contact"),
      ]);
      setStats(s.data);
      setBookings(b.data);
      setServices(sv.data);
      setMessages(m.data);
    } catch (e) {
      if (e?.response?.status === 401) {
        setAdminToken(null);
        navigate("/admin/login");
      }
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/bookings/${id}`, { status });
      toast.success(`Booking ${status}`);
      refresh();
    } catch {
      toast.error("Update failed");
    }
  };

  const deleteBooking = async (id) => {
    if (!window.confirm("Delete this booking?")) return;
    try {
      await api.delete(`/bookings/${id}`);
      toast.success("Booking deleted");
      refresh();
    } catch {
      toast.error("Delete failed");
    }
  };

  const addService = async () => {
    if (!newService.name.trim()) return toast.error("Name required");
    try {
      await api.post("/services", newService);
      toast.success("Service added");
      setShowAddService(false);
      setNewService({ name: "", category: "Hair", description: "", price: 500, duration_min: 60 });
      refresh();
    } catch {
      toast.error("Failed to add");
    }
  };

  const deleteService = async (id) => {
    if (!window.confirm("Delete this service?")) return;
    try {
      await api.delete(`/services/${id}`);
      toast.success("Service deleted");
      refresh();
    } catch {
      toast.error("Delete failed");
    }
  };

  const logout = () => {
    setAdminToken(null);
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }} data-testid="admin-dashboard">
      <header className="bg-white border-b border-[#E8E2D9] sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-full bg-[#C87A63] text-white grid place-items-center font-serif-display text-lg">M</span>
            <div>
              <p className="font-serif-display text-lg text-[#2A2A2A] leading-none">{SALON.name}</p>
              <p className="text-[10px] uppercase tracking-[0.18em] text-[#C87A63]">Owner Dashboard</p>
            </div>
          </div>
          <Button onClick={logout} data-testid="admin-logout" variant="outline" className="rounded-full border-[#2A2A2A] text-[#2A2A2A]">
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8">
        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard label="Total bookings" value={stats.total_bookings} testid="stat-total" />
            <StatCard label="Pending" value={stats.pending} accent testid="stat-pending" />
            <StatCard label="Confirmed" value={stats.confirmed} testid="stat-confirmed" />
            <StatCard label="Messages" value={stats.total_messages} testid="stat-messages" />
          </div>
        )}

        <Tabs defaultValue="bookings">
          <TabsList className="bg-[#F0ECE1] p-1.5 rounded-full">
            <TabsTrigger value="bookings" data-testid="tab-bookings" className="rounded-full data-[state=active]:bg-[#2A2A2A] data-[state=active]:text-white px-5">
              <Calendar className="w-4 h-4 mr-2" /> Bookings
            </TabsTrigger>
            <TabsTrigger value="services" data-testid="tab-services" className="rounded-full data-[state=active]:bg-[#2A2A2A] data-[state=active]:text-white px-5">
              <Scissors className="w-4 h-4 mr-2" /> Services
            </TabsTrigger>
            <TabsTrigger value="messages" data-testid="tab-messages" className="rounded-full data-[state=active]:bg-[#2A2A2A] data-[state=active]:text-white px-5">
              <MessageSquare className="w-4 h-4 mr-2" /> Messages
            </TabsTrigger>
          </TabsList>

          {/* Bookings */}
          <TabsContent value="bookings" className="mt-6">
            <div className="bg-white rounded-2xl border border-[#E8E2D9] overflow-hidden">
              <div className="p-6 border-b border-[#F0ECE1]">
                <h3 className="font-serif-display text-2xl text-[#2A2A2A]">All bookings</h3>
                <p className="text-sm text-[#5C5C5C]">{bookings.length} total</p>
              </div>
              <div className="divide-y divide-[#F0ECE1]">
                {bookings.length === 0 && <p className="p-6 text-[#5C5C5C]">No bookings yet.</p>}
                {bookings.map((b, i) => (
                  <div key={b.id} className="p-5 lg:p-6 flex flex-col lg:flex-row lg:items-center gap-4" data-testid={`booking-row-${i}`}>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 flex-wrap">
                        <p className="font-medium text-[#2A2A2A]">{b.name}</p>
                        <Badge className={`${STATUS_COLORS[b.status]} font-normal capitalize`}>{b.status}</Badge>
                      </div>
                      <p className="text-sm text-[#5C5C5C] mt-1">
                        <a href={`tel:${b.phone}`} className="hover:text-[#C87A63]">{b.phone}</a>
                        {b.email && <span> · {b.email}</span>}
                      </p>
                      <p className="text-sm text-[#2A2A2A] mt-1">{b.service_names.join(", ")}</p>
                      {b.notes && <p className="text-xs text-[#5C5C5C] mt-1 italic">"{b.notes}"</p>}
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm text-[#2A2A2A] font-medium">{b.date} · {b.time}</p>
                        <p className="font-serif-display text-xl text-[#C87A63]">{formatINR(b.total_price)}</p>
                      </div>
                      <Select value={b.status} onValueChange={(v) => updateStatus(b.id, v)}>
                        <SelectTrigger data-testid={`status-trigger-${i}`} className="w-36 rounded-full h-9">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          {STATUS_OPTIONS.map((s) => (
                            <SelectItem key={s} value={s} className="capitalize">{s}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <button data-testid={`delete-booking-${i}`} onClick={() => deleteBooking(b.id)} className="text-rose-500 hover:text-rose-700 p-2">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Services */}
          <TabsContent value="services" className="mt-6">
            <div className="bg-white rounded-2xl border border-[#E8E2D9] overflow-hidden">
              <div className="p-6 border-b border-[#F0ECE1] flex items-center justify-between">
                <div>
                  <h3 className="font-serif-display text-2xl text-[#2A2A2A]">Services</h3>
                  <p className="text-sm text-[#5C5C5C]">{services.length} total</p>
                </div>
                <Dialog open={showAddService} onOpenChange={setShowAddService}>
                  <DialogTrigger asChild>
                    <Button data-testid="add-service-btn" className="rounded-full bg-[#C87A63] hover:bg-[#B3664F] text-white">
                      <Plus className="w-4 h-4 mr-1.5" /> Add service
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-white">
                    <DialogHeader>
                      <DialogTitle className="font-serif-display text-2xl">New service</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-3">
                      <div>
                        <Label>Name</Label>
                        <Input data-testid="new-service-name" value={newService.name} onChange={(e) => setNewService({ ...newService, name: e.target.value })} />
                      </div>
                      <div>
                        <Label>Category</Label>
                        <Input data-testid="new-service-category" value={newService.category} onChange={(e) => setNewService({ ...newService, category: e.target.value })} />
                      </div>
                      <div>
                        <Label>Description</Label>
                        <Textarea data-testid="new-service-desc" rows={2} value={newService.description} onChange={(e) => setNewService({ ...newService, description: e.target.value })} />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label>Price (₹)</Label>
                          <Input data-testid="new-service-price" type="number" value={newService.price} onChange={(e) => setNewService({ ...newService, price: parseInt(e.target.value, 10) || 0 })} />
                        </div>
                        <div>
                          <Label>Duration (min)</Label>
                          <Input data-testid="new-service-duration" type="number" value={newService.duration_min} onChange={(e) => setNewService({ ...newService, duration_min: parseInt(e.target.value, 10) || 30 })} />
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button data-testid="save-new-service" onClick={addService} className="rounded-full bg-[#2A2A2A] hover:bg-black text-white">Save</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="divide-y divide-[#F0ECE1]">
                {services.map((s, i) => (
                  <div key={s.id} className="p-5 flex items-center justify-between gap-3" data-testid={`service-row-${i}`}>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-[#2A2A2A]">{s.name}</p>
                        <span className="text-[10px] uppercase tracking-[0.18em] text-[#C87A63]">{s.category}</span>
                        {!s.active && <Badge variant="outline">inactive</Badge>}
                      </div>
                      <p className="text-sm text-[#5C5C5C] mt-0.5 line-clamp-1">{s.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-serif-display text-xl text-[#C87A63]">{formatINR(s.price)}</p>
                      <p className="text-xs text-[#5C5C5C]">{s.duration_min} min</p>
                    </div>
                    <button onClick={() => deleteService(s.id)} data-testid={`delete-service-${i}`} className="text-rose-500 hover:text-rose-700 p-2">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Messages */}
          <TabsContent value="messages" className="mt-6">
            <div className="bg-white rounded-2xl border border-[#E8E2D9] overflow-hidden">
              <div className="p-6 border-b border-[#F0ECE1]">
                <h3 className="font-serif-display text-2xl text-[#2A2A2A]">Contact messages</h3>
                <p className="text-sm text-[#5C5C5C]">{messages.length} total</p>
              </div>
              <div className="divide-y divide-[#F0ECE1]">
                {messages.length === 0 && <p className="p-6 text-[#5C5C5C]">No messages yet.</p>}
                {messages.map((m, i) => (
                  <div key={m.id} className="p-5" data-testid={`message-row-${i}`}>
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <p className="font-medium text-[#2A2A2A]">{m.name}</p>
                      <p className="text-xs text-[#5C5C5C]">{new Date(m.created_at).toLocaleString()}</p>
                    </div>
                    <p className="text-sm text-[#5C5C5C] mt-1">
                      <a href={`tel:${m.phone}`} className="hover:text-[#C87A63]">{m.phone}</a>
                      {m.email && <span> · {m.email}</span>}
                    </p>
                    <p className="text-[#2A2A2A] mt-2 leading-relaxed">{m.message}</p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

function StatCard({ label, value, accent, testid }) {
  return (
    <div className={`rounded-2xl p-5 border ${accent ? "bg-[#C87A63] text-white border-[#C87A63]" : "bg-white border-[#E8E2D9]"}`} data-testid={testid}>
      <p className={`text-xs uppercase tracking-[0.2em] ${accent ? "text-white/70" : "text-[#5C5C5C]"}`}>{label}</p>
      <p className={`font-serif-display text-4xl mt-2 ${accent ? "text-white" : "text-[#2A2A2A]"}`}>{value}</p>
    </div>
  );
}
