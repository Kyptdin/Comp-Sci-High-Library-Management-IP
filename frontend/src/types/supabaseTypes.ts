export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      book_ratings: {
        Row: {
          book_id: string;
          downvotes: number;
          id: string;
          upvotes: number;
        };
        Insert: {
          book_id: string;
          downvotes?: number;
          id?: string;
          upvotes?: number;
        };
        Update: {
          book_id?: string;
          downvotes?: number;
          id?: string;
          upvotes?: number;
        };
        Relationships: [
          {
            foreignKeyName: "book_ratings_book_id_fkey";
            columns: ["book_id"];
            isOneToOne: false;
            referencedRelation: "books";
            referencedColumns: ["id"];
          }
        ];
      };
      books: {
        Row: {
          id: string;
          title: string;
          total_copies_within_school: number;
        };
        Insert: {
          id: string;
          title: string;
          total_copies_within_school: number;
        };
        Update: {
          id?: string;
          title?: string;
          total_copies_within_school?: number;
        };
        Relationships: [];
      };
      borrows: {
        Row: {
          borrow_id: string;
          damaged: boolean;
          date_borrowed: string;
          isbn: string;
          return_due_date: string;
          returned: boolean;
          user: string;
        };
        Insert: {
          borrow_id?: string;
          damaged: boolean;
          date_borrowed: string;
          isbn: string;
          return_due_date: string;
          returned: boolean;
          user: string;
        };
        Update: {
          borrow_id?: string;
          damaged?: boolean;
          date_borrowed?: string;
          isbn?: string;
          return_due_date?: string;
          returned?: boolean;
          user?: string;
        };
        Relationships: [
          {
            foreignKeyName: "borrows_user_fkey";
            columns: ["user"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["user_id"];
          }
        ];
      };
      reports: {
        Row: {
          book_id: string;
          created_at: string;
          explanation: string;
          id: string;
          reason: string;
          user: string;
        };
        Insert: {
          book_id: string;
          created_at?: string;
          explanation: string;
          id?: string;
          reason: string;
          user: string;
        };
        Update: {
          book_id?: string;
          created_at?: string;
          explanation?: string;
          id?: string;
          reason?: string;
          user?: string;
        };
        Relationships: [
          {
            foreignKeyName: "reasons_user_fkey";
            columns: ["user"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["user_id"];
          },
          {
            foreignKeyName: "reports_book_id_fkey";
            columns: ["book_id"];
            isOneToOne: false;
            referencedRelation: "books";
            referencedColumns: ["id"];
          }
        ];
      };
      user_book_ratings: {
        Row: {
          id: string;
          is_upvote: boolean;
          rating_id: string;
          user_id: string;
        };
        Insert: {
          id?: string;
          is_upvote: boolean;
          rating_id: string;
          user_id: string;
        };
        Update: {
          id?: string;
          is_upvote?: boolean;
          rating_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_ratings_rating_id_fkey";
            columns: ["rating_id"];
            isOneToOne: false;
            referencedRelation: "book_ratings";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "user_ratings_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["user_id"];
          }
        ];
      };
      users: {
        Row: {
          admin_status: string;
          email: string;
          password: string | null;
          user_id: string;
          user_name: string;
        };
        Insert: {
          admin_status: string;
          email: string;
          password?: string | null;
          user_id: string;
          user_name: string;
        };
        Update: {
          admin_status?: string;
          email?: string;
          password?: string | null;
          user_id?: string;
          user_name?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
      PublicSchema["Views"])
  ? (PublicSchema["Tables"] &
      PublicSchema["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
  ? PublicSchema["Enums"][PublicEnumNameOrOptions]
  : never;

/**
 * Represents user data from the "users" table.
 */
export type UserData = Tables<"users">;

/**
 * Represents borrow data from the "borrows" table.
 */
export type Borrow = Tables<"borrows">;

/**
 * Represents book data from the "books" table.
 */
export type Book = Tables<"books">;

/**
 * Represents report data from the "reports" table.
 */
export type Report = Tables<"reports">;

/**
 * Represents statistics for borrows.
 */
export interface BorrowStats {
  missing: number;
  borrowed: number;
  returned: number;
}

/**
 * Represents an update operation for the "borrows" table.
 */
export type BorrowsUpdate = Database["public"]["Tables"]["borrows"]["Update"];

/**
 * Represents an update operation for the "books" table.
 */
export type BooksUpdate = Database["public"]["Tables"]["books"]["Update"];

/**The total upvotes and downvotes a book has**/
export type BookRatings = Tables<"book_ratings">;

/**
 * Represents an update operation for the "books" table.
 */
export type BookRatingsUpdate =
  Database["public"]["Tables"]["book_ratings"]["Update"];

/**All the ratings a user has made**/
export type UserBookRatings = Tables<"user_book_ratings">;
