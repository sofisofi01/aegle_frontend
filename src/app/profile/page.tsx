// src/app/profile/page.tsx
import React from "react";
import { ProfilePage } from "@/landings/profile";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function Profile() {
  return (
    <ProtectedRoute>
      <ProfilePage />
    </ProtectedRoute>
  );
}
