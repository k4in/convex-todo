import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ConvexProvider, ConvexReactClient } from "convex/react";

import "@/index.css";
import { env } from "@/lib/env.ts";
import { Toaster } from "@/components/shadcn/toast.tsx";
import { App } from "@/app.tsx";

const convex = new ConvexReactClient(env.VITE_CONVEX_URL);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConvexProvider client={convex}>
      <Toaster>
        <App />
      </Toaster>
    </ConvexProvider>
  </StrictMode>
);
