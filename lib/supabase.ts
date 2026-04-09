import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://banmianrqijczgtuxpqd.supabase.co";
const supabaseKey = "sb_publishable_s9IxaQ7X8LTbjHtottAFig_3PKHJihn";

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);
