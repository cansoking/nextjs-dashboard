import "@/app/ui/global.css";

import { roboto } from "@/app/ui/fonts";
import { Metadata } from "next";

// 集成MUI
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";

import theme from "@/theme";
import { ThemeProvider } from "@mui/material/styles";

export const metadata: Metadata = {
  title: {
    template: "%s | Acme Dashboard",
    default: "Acme Dashboard",
  },
  description: "The official Next.js Course Dashboard, built with App Router.",
  metadataBase: new URL("https://next-learn-dashboard.vercel.sh"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
