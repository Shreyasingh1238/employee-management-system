
import Swal from "sweetalert2";

export const confirmDeleteEmployee = async (employeeName) => {
  const result = await Swal.fire({
    title: "Delete employee?",
    text: `Are you sure you want to delete ${employeeName}? This action cannot be undone.`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete",
    cancelButtonText: "Cancel",
    confirmButtonColor: "#dc2626",
    cancelButtonColor: "#64748b",
    reverseButtons: true,
    focusCancel: true,
  });

  return result.isConfirmed;
};
