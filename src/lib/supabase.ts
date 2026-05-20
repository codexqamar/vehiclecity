import { createClient } from "@supabase/supabase-js";
import { Database } from "./database.types";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  if (typeof window !== "undefined") {
    console.warn("Supabase credentials missing. Check your environment variables.");
  }
}

// Fix for Node.js 20 without native WebSocket support (for SSR)
const isServer = typeof window === "undefined";

export const supabase = createClient<Database>(
  supabaseUrl || "",
  supabaseAnonKey || "",
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
    // Only provide the transport if we are on the server
    ...(isServer ? {
      realtime: {
        async transport() {
          const { default: ws } = await import("ws");
          return ws;
        }
      }
    } : {})
  }
);
