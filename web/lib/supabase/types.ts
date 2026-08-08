export type ToolFormField = {
  key: string;
  label: string;
  type: "text" | "textarea" | "select";
  required: boolean;
  placeholder?: string;
  options?: string[];
};

export type ToolStatus = "active" | "coming_soon";
export type ToolOutputType = "text_report" | "image" | "video";
export type ToolChargeType = "per_use" | "one_time_unlock";
export type ToolRunStatus = "pending" | "success" | "refunded";
export type LedgerType = "welcome_grant" | "debit" | "refund" | "purchase";

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string;
          email: string;
          whatsapp: string | null;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["profiles"]["Row"]> & {
          id: string;
        };
        Update: Partial<Database["public"]["Tables"]["profiles"]["Row"]>;
        Relationships: [];
      };
      tools: {
        Row: {
          slug: string;
          name: string;
          description: string;
          icon_key: string;
          category: string;
          cost_credits: number;
          status: ToolStatus;
          output_type: ToolOutputType;
          charge_type: ToolChargeType;
          form_schema: ToolFormField[];
          checkmarks: string[];
          icon_bg: string;
          icon_color: string;
          sort_order: number;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["tools"]["Row"]> & {
          slug: string;
        };
        Update: Partial<Database["public"]["Tables"]["tools"]["Row"]>;
        Relationships: [];
      };
      tool_runs: {
        Row: {
          id: string;
          profile_id: string;
          tool_slug: string;
          input: Record<string, unknown>;
          status: ToolRunStatus;
          output: Record<string, unknown> | null;
          credits_charged: number;
          error: string | null;
          created_at: string;
          completed_at: string | null;
        };
        Insert: Partial<Database["public"]["Tables"]["tool_runs"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["tool_runs"]["Row"]>;
        Relationships: [];
      };
      credit_ledger: {
        Row: {
          id: number;
          profile_id: string;
          amount: number;
          type: LedgerType;
          tool_slug: string | null;
          run_id: string | null;
          stripe_payment_intent_id: string | null;
          description: string | null;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["credit_ledger"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["credit_ledger"]["Row"]>;
        Relationships: [];
      };
      broker_branding: {
        Row: {
          profile_id: string;
          logo_url: string | null;
          brand_color: string | null;
          contact_whatsapp: string | null;
          updated_at: string;
        };
        Insert: Partial<
          Database["public"]["Tables"]["broker_branding"]["Row"]
        > & { profile_id: string };
        Update: Partial<Database["public"]["Tables"]["broker_branding"]["Row"]>;
        Relationships: [];
      };
      credit_packages: {
        Row: {
          id: string;
          name: string;
          credits: number;
          price_mxn_cents: number;
          stripe_price_id: string | null;
          is_featured: boolean;
          sort_order: number;
        };
        Insert: Partial<
          Database["public"]["Tables"]["credit_packages"]["Row"]
        > & { id: string };
        Update: Partial<Database["public"]["Tables"]["credit_packages"]["Row"]>;
        Relationships: [];
      };
      service_leads: {
        Row: {
          id: string;
          profile_id: string | null;
          name: string;
          email: string;
          phone: string | null;
          service_slug: string | null;
          message: string;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["service_leads"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["service_leads"]["Row"]>;
        Relationships: [];
      };
      contact_messages: {
        Row: {
          id: string;
          name: string;
          email: string;
          company: string | null;
          phone: string | null;
          topic: string | null;
          message: string;
          created_at: string;
        };
        Insert: Partial<
          Database["public"]["Tables"]["contact_messages"]["Row"]
        >;
        Update: Partial<Database["public"]["Tables"]["contact_messages"]["Row"]>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      get_credit_balance: { Args: Record<string, never>; Returns: number };
      charge_credits: { Args: { p_tool_slug: string }; Returns: string };
      complete_run: {
        Args: { p_run_id: string; p_output: Record<string, unknown> };
        Returns: void;
      };
      refund_credits: {
        Args: { p_run_id: string; p_error?: string | null };
        Returns: void;
      };
      purchase_credits: {
        Args: {
          p_profile_id: string;
          p_credits: number;
          p_stripe_payment_intent_id: string;
        };
        Returns: void;
      };
    };
  };
}
