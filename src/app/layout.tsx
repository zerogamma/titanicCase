"use client";

import NavBar from "./componets/NavBar";
import "./globals.css";
import { Inter } from "next/font/google";
import { ErrorBoundary } from "react-error-boundary";
import Error from "./error";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar />
        <ErrorBoundary
          fallback={
            <Error
              error={{ name: "", message: "" }}
              reset={function (): void {}}
            />
          }
        >
          {children}
        </ErrorBoundary>
      </body>
    </html>
  );
}
