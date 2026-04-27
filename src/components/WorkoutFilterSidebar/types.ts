export type WorkoutFilterSidebarProps = {
  isOpen: boolean;
  onClose: () => void;
  selectedMuscles: string[];
  selectedEquipment: string[];
  onMuscleToggle: (muscle: string) => void;
  onEquipmentToggle: (equipment: string) => void;
  onResetFilters: () => void;
};
