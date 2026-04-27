import { RecipesPage } from "@/landings/recipes";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function Page() {
  return (
    <ProtectedRoute>
      <RecipesPage />
    </ProtectedRoute>
  );
}
