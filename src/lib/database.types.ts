export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      palettes: {
        Row: {
          id: number
          user_id: string
          name: string
          colors: string[]
          tags: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          user_id?: string
          name: string
          colors: string[]
          tags?: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: never
          user_id?: never
          name?: string
          colors?: string[]
          tags?: string[]
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      fonts: {
        Row: {
          id: number
          user_id: string
          name: string
          category: string
          preview_text: string
          weight: string
          file_size: string
          storage_path: string | null
          is_favorite: boolean
          added_at: string
        }
        Insert: {
          id?: number
          user_id?: string
          name: string
          category?: string
          preview_text?: string
          weight?: string
          file_size: string
          storage_path?: string | null
          is_favorite?: boolean
          added_at?: string
        }
        Update: {
          id?: never
          user_id?: never
          name?: string
          category?: string
          preview_text?: string
          weight?: string
          file_size?: string
          storage_path?: string | null
          is_favorite?: boolean
          added_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      transfer_anonymous_data: {
        Args: { old_user_id: string }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type PaletteRow = Database['public']['Tables']['palettes']['Row']
export type PaletteInsert = Database['public']['Tables']['palettes']['Insert']
export type PaletteUpdate = Database['public']['Tables']['palettes']['Update']

export type FontRow = Database['public']['Tables']['fonts']['Row']
export type FontInsert = Database['public']['Tables']['fonts']['Insert']
export type FontUpdate = Database['public']['Tables']['fonts']['Update']
