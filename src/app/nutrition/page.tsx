import { NutritionPage } from "@/landings/nutrition";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function Page() {
  return (
    <ProtectedRoute>
      <NutritionPage />
    </ProtectedRoute>
  );
}
