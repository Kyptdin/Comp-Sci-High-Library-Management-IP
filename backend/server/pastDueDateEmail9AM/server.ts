import { createClient } from "npm:@supabase/supabase-js@2";

// deployctl deploy --prod --project=helloworld main.ts
const supabase = createClient<Database>(
  "https://vygjxzhtqazwuskkaxpz.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ5Z2p4emh0cWF6d3Vza2theHB6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUwMTg2MjgsImV4cCI6MjAzMDU5NDYyOH0.7c2_7Hv_fcJchjmJ1amzNgAJVgrobMMOYKAZjB0uhIU"
);

// Supabase schema
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

// const htmlForEmail = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
// <html dir="ltr" lang="en">

//   <head>
//     <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
//     <meta name="x-apple-disable-message-reformatting" />
//   </head>
//   <div style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0">Missing Book<div> ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿</div>
//   </div>

//   <body style="background-color:rgb(255,255,255);font-family:ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;">
//     <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="max-width:37.5em;margin-left:auto;margin-right:auto;padding:1.5rem;padding-bottom:3rem;background-repeat:no-repeat;background-position:bottom">
//       <tbody>
//         <tr style="width:100%">
//           <td>
//             <div style="display:flex;justify-content:center"><img alt="Comp Sci High Library Logo" src="https://vygjxzhtqazwuskkaxpz.supabase.co/storage/v1/object/public/logos/black.png" style="display:block;outline:none;border:none;text-decoration:none;height:1.25rem" /></div>
//             <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="margin-top:1.5rem;margin-bottom:1.5rem">
//               <tbody>
//                 <tr>
//                   <td>
//                     <p style="font-size:1rem;line-height:1.75rem;margin:16px 0;margin-top:1rem">Dear <!-- -->{STUDENT&#x27;S NAME}<!-- -->,</p>
//                     <p style="font-size:1rem;line-height:1.75rem;margin:16px 0">We are writing to inform you that the book &quot;<!-- -->{BOOK NAME}<!-- -->&quot; was due on <!-- -->{DUE DATE}<!-- -->, and has not yet been returned. Please return the as soon as possible.</p>
//                     <p style="font-size:1rem;line-height:1.75rem;margin:16px 0;margin-top:1rem">If you have lost &quot;<!-- -->{BOOK NAME}<!-- -->,&quot; please contact your English teacher for further instructions.</p><a href="google.com" class="hover:bg-gray-800" style="color:rgb(255,255,255);text-decoration:none;background-color:rgb(0,0,0);font-weight:700;padding-top:0.75rem;padding-bottom:0.75rem;padding-left:1rem;padding-right:1rem;border-radius:0.25rem;margin-top:2rem;display:block;text-align:center" target="_blank">Return book</a>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//             <p style="font-size:1rem;line-height:1.75rem;margin:16px 0;margin-top:1rem">Best Regards,<br />CSH Library Team</p>
//             <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-top-width:1px;border-color:rgb(209,213,219);margin-top:3rem" />
//             <p style="font-size:0.75rem;line-height:1rem;margin:16px 0;color:rgb(75,85,99);margin-left:0.25rem">Urban Assembly Charter School for Computer Science</p>
//             <p style="font-size:0.75rem;line-height:1rem;margin:16px 0;color:rgb(75,85,99);margin-left:0.25rem">1300 Boynton Ave, Bronx, NY 10472</p>
//           </td>
//         </tr>
//       </tbody>
//     </table>
//   </body>
// </html>`;

const getStudentMetaDataById = async (userId: string) => {
  const { data: users, error } = await supabase
    .from("users")
    .select("*")
    // Filters
    .eq("user_id", userId);
  if (error) {
    throw new Error(error.message);
  }
  return users;
};

const getBookDataById = async (bookId: string) => {
  const { data: bookData, error } = await supabase
    .from("books")
    .select("*")
    .eq("id", bookId)
    .single();

  if (error) {
    throw new Error(`Failed to fetch book data: ${error.message}`);
  }

  return bookData;
};

const sendMissingBookEmail = async (
  studentName: string,
  studentEmail: string,
  bookName: string,
  dueDate: string
): Promise<void | Response> => {
  const newHtml = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" lang="en">

  <head>
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
    <meta name="x-apple-disable-message-reformatting" />
  </head>
  <div style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0">Missing Book<div> ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿</div>
  </div>

  <body style="background-color:rgb(255,255,255);font-family:ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;">
    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="max-width:37.5em;margin-left:auto;margin-right:auto;padding:1.5rem;padding-bottom:3rem;background-repeat:no-repeat;background-position:bottom">
      <tbody>
        <tr style="width:100%">
          <td>
            <div style="display:flex;justify-content:center"><img alt="Comp Sci High Library Logo" src="https://vygjxzhtqazwuskkaxpz.supabase.co/storage/v1/object/public/logos/black.png" style="display:block;outline:none;border:none;text-decoration:none;height:1.25rem" /></div>
            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="margin-top:1.5rem;margin-bottom:1.5rem">
              <tbody>
                <tr>
                  <td>
                    <p style="font-size:1rem;line-height:1.75rem;margin:16px 0;margin-top:1rem">Dear <!-- -->${studentName}<!-- -->,</p>
                    <p style="font-size:1rem;line-height:1.75rem;margin:16px 0">We are writing to inform you that the book &quot;<!-- -->${bookName}<!-- -->&quot; was due on <!-- -->${dueDate}<!-- -->, and has not yet been returned. Please return the book as soon as possible.</p>
                    <p style="font-size:1rem;line-height:1.75rem;margin:16px 0;margin-top:1rem">If you have lost &quot;<!-- -->${bookName}<!-- -->,&quot; please contact your English teacher for further instructions.</p><a href="google.com" class="hover:bg-gray-800" style="color:rgb(255,255,255);text-decoration:none;background-color:rgb(0,0,0);font-weight:700;padding-top:0.75rem;padding-bottom:0.75rem;padding-left:1rem;padding-right:1rem;border-radius:0.25rem;margin-top:2rem;display:block;text-align:center" target="_blank">Return book</a>
                  </td>
                </tr>
              </tbody>
            </table>
            <p style="font-size:1rem;line-height:1.75rem;margin:16px 0;margin-top:1rem">Best Regards,<br />CSH Library Team</p>
            <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-top-width:1px;border-color:rgb(209,213,219);margin-top:3rem" />
            <p style="font-size:0.75rem;line-height:1rem;margin:16px 0;color:rgb(75,85,99);margin-left:0.25rem">Urban Assembly Charter School for Computer Science</p>
            <p style="font-size:0.75rem;line-height:1rem;margin:16px 0;color:rgb(75,85,99);margin-left:0.25rem">1300 Boynton Ave, Bronx, NY 10472</p>
          </td>
        </tr>
      </tbody>
    </table>
  </body>
</html>`;

  const RESEND_API_KEY = "re_fC2bHA2D_Fnxw9HMKW2LhNJxcr8FBSW2Z";
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: "isaac@isaacstar.com",
      to: studentEmail,
      subject: "Missing Book",
      html: newHtml,
    }),
  });

  if (res.ok) {
    const data = await res.json();
    return data;
  } else {
    // Handle the case where the fetch request isn't successful
    return new Response("Failed to send email", { status: 500 });
  }
};

const handler = async (): Promise<Response> => {
  // Step #1: Get a list of all the user who currenlty have books past their due date which have not been returned
  const currentDate = new Date().toISOString().slice(0, 10);
  const { data: allMissingBooks, error } = await supabase
    .from("borrows")
    .select("*")
    .eq("returned", false)
    .lte("return_due_date", currentDate);

  if (error) {
    return new Response(`Failed to send email: ${error.message}`, {
      status: 500,
    });
  }

  // Step #2: Get all the user metadata which is used to get the user's name
  const promiseArrGettingStudentMetaData = allMissingBooks.map((borrow) => {
    return getStudentMetaDataById(borrow.user);
  });
  const studentMetaData = await Promise.all(promiseArrGettingStudentMetaData);
  const studentMetaDataFlatted = studentMetaData.flat();

  // Step #3 Get all the book data which is used ot display the book the user borrowed
  const promiseArrGettingBookData = allMissingBooks.map((borrow) => {
    return getBookDataById(borrow.isbn);
  });
  const bookData = await Promise.all(promiseArrGettingBookData);

  // Step #4: Send emails to about the book they are missing
  const promiseArrEmails = allMissingBooks.map((borrow, index) => {
    const studentEmail = studentMetaDataFlatted[index].email;
    const studentName = studentMetaDataFlatted[index].user_name;
    const bookName = bookData[index].title;
    const dueDateNormalPerson = borrow.return_due_date;
    const dueDateAmerican = new Date(dueDateNormalPerson).toLocaleDateString(
      "en-US",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    );

    return sendMissingBookEmail(
      studentName,
      studentEmail,
      bookName,
      dueDateAmerican
    );
  });
  await Promise.all(promiseArrEmails);

  return new Response(null, {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// Cron job that runs every minute
Deno.cron("sample cron", "0 9 * * *", () => {
  handler();
});
