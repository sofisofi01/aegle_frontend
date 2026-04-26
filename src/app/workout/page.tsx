import { WorkoutPage } from "@/landings/workout";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function Page() {
  return (
    <ProtectedRoute>
      <WorkoutPage />
    </ProtectedRoute>
  );
}
