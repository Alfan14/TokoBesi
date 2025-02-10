// hooks/supabase.js
import { createClient } from "@supabase/supabase-js";

const useSupbase = () => {
  const supabase = createClient(
    "your-project-url",
    "your-anon-public-key"
  );

  return supabase;
};

export default useSupbase;