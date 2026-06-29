import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Lock } from "lucide-react";
import { api, setAdminToken } from "@/lib/api";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/admin/login", { password });
      setAdminToken(res.data.token);
      toast.success("Welcome back, Megha!");
      navigate("/admin");
    } catch {
      toast.error("Invalid password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid place-items-center px-4" style={{ background: "var(--bg)" }} data-testid="admin-login-page">
      <div className="w-full max-w-md bg-white rounded-3xl border border-[#E8E2D9] p-8 lg:p-10 shadow-[0_30px_60px_rgba(0,0,0,0.08)]">
        <div className="w-14 h-14 rounded-full bg-[#F0ECE1] grid place-items-center">
          <Lock className="w-6 h-6 text-[#C87A63]" />
        </div>
        <h1 className="font-serif-display text-3xl text-[#2A2A2A] mt-5">Owner login</h1>
        <p className="text-sm text-[#5C5C5C] mt-1">Manage bookings, services and messages.</p>

        <form onSubmit={submit} className="mt-6 space-y-4">
          <div>
            <Label htmlFor="pw">Password</Label>
            <Input
              id="pw"
              data-testid="admin-password-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              autoFocus
            />
          </div>
          <Button
            data-testid="admin-login-btn"
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-[#2A2A2A] hover:bg-black text-white h-12"
          >
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </form>
        <p className="text-xs text-[#5C5C5C] mt-6 text-center">
          Default password: <span className="font-mono">megha-salon-admin-2025</span> — change it later from settings.
        </p>
      </div>
    </div>
  );
}
