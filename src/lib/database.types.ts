export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          business_name: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          business_name?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          business_name?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      customers: {
        Row: {
          id: string
          workspace_id: string
          name: string
          email: string | null
          phone: string | null
          tag: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          workspace_id: string
          name: string
          email?: string | null
          phone?: string | null
          tag?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          workspace_id?: string
          name?: string
          email?: string | null
          phone?: string | null
          tag?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      vehicles: {
        Row: {
          id: string
          workspace_id: string
          customer_id: string | null
          registration: string
          make_model: string | null
          mot_status: string | null
          mot_expiry: string | null
          tax_status: string | null
          last_visit: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          workspace_id: string
          customer_id?: string | null
          registration: string
          make_model?: string | null
          mot_status?: string | null
          mot_expiry?: string | null
          tax_status?: string | null
          last_visit?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          workspace_id?: string
          customer_id?: string | null
          registration?: string
          make_model?: string | null
          mot_status?: string | null
          mot_expiry?: string | null
          tax_status?: string | null
          last_visit?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      jobs: {
        Row: {
          id: string
          workspace_id: string
          vehicle_id: string
          customer_id: string | null
          status: string
          service_type: string | null
          mechanic_name: string | null
          eta: string | null
          bay: string | null
          scheduled_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          workspace_id: string
          vehicle_id: string
          customer_id?: string | null
          status?: string
          service_type?: string | null
          mechanic_name?: string | null
          eta?: string | null
          bay?: string | null
          scheduled_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          workspace_id?: string
          vehicle_id?: string
          customer_id?: string | null
          status?: string
          service_type?: string | null
          mechanic_name?: string | null
          eta?: string | null
          bay?: string | null
          scheduled_date?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      invoices: {
        Row: {
          id: string
          workspace_id: string
          customer_id: string | null
          vehicle_id: string | null
          invoice_number: string
          amount: number
          status: string
          due_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          workspace_id: string
          customer_id?: string | null
          vehicle_id?: string | null
          invoice_number: string
          amount: number
          status?: string
          due_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          workspace_id?: string
          customer_id?: string | null
          vehicle_id?: string | null
          invoice_number?: string
          amount?: number
          status?: string
          due_date?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
