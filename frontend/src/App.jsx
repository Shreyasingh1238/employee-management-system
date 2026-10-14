
import { useCallback, useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeTable from "./components/EmployeeTable";
import { confirmDeleteEmployee } from "./components/DeleteEmployeeModal";
import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getApiErrorMessage,
} from "./services/employeeService";

const emptyForm = { name: "", email: "", role: "" };
const PAGE_SIZE = 5;

function App() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const loadEmployees = useCallback(async (showLoader = true) => {
    if (showLoader) setLoading(true);

    try {
      const records = await getEmployees();
      setEmployees(Array.isArray(records) ? records : []);
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "Unable to load employees",
        text: getApiErrorMessage(error),
        confirmButtonColor: "#2563eb",
      });
    } finally {
      if (showLoader) setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadEmployees();
  }, [loadEmployees]);

  const filteredEmployees = useMemo(() => {
    const query = search.trim().toLowerCase();

    return employees.filter((employee) =>
      [employee.name, employee.email, employee.role].some((value) =>
        String(value || "").toLowerCase().includes(query)
      )
    );
  }, [employees, search]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredEmployees.length / PAGE_SIZE)
  );

  const visibleEmployees = filteredEmployees.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  const handleSearch = (event) => {
    setSearch(event.target.value);
    setPage(1);
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleEdit = (employee) => {
    setEditingId(employee.id);
    setForm({
      name: employee.name,
      email: employee.email,
      role: employee.role,
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      role: form.role.trim(),
    };

    if (!payload.name || !payload.email || !payload.role) {
      await Swal.fire({
        icon: "warning",
        title: "Missing information",
        text: "Please complete all employee fields.",
        confirmButtonColor: "#2563eb",
      });
      return;
    }

    setSaving(true);

    try {
      if (editingId !== null) {
        await updateEmployee(editingId, payload);
      } else {
        await createEmployee(payload);
      }

      resetForm();
      setSearch("");
      setPage(1);

      await loadEmployees(false);

      await Swal.fire({
        icon: "success",
        title: editingId !== null ? "Employee updated!" : "Employee added!",
        text:
          editingId !== null
            ? "Employee details have been updated successfully."
            : "The new employee has been added successfully.",
        timer: 1800,
        showConfirmButton: false,
      });
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "Unable to save employee",
        text: getApiErrorMessage(error),
        confirmButtonColor: "#2563eb",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (employee) => {
    const confirmed = await confirmDeleteEmployee(employee.name);

    if (!confirmed) return;

    try {
      await deleteEmployee(employee.id);

      if (editingId === employee.id) resetForm();

      await loadEmployees(false);

      const remaining = filteredEmployees.length - 1;
      const lastPage = Math.max(1, Math.ceil(remaining / PAGE_SIZE));
      setPage((current) => Math.min(current, lastPage));

      await Swal.fire({
        icon: "success",
        title: "Employee deleted",
        text: `${employee.name} has been removed.`,
        timer: 1600,
        showConfirmButton: false,
      });
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "Delete failed",
        text: getApiErrorMessage(error),
        confirmButtonColor: "#2563eb",
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-sm font-black text-white shadow-lg shadow-blue-600/20">
              ED
            </div>
            <div>
              <p className="font-bold tracking-tight">PeopleDesk</p>
              <p className="text-xs text-slate-500">Employee management</p>
            </div>
          </div>

          <div className="hidden items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700 sm:flex">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Directory workspace
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-10">
        <section className="mb-8 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-blue-700">
              People &amp; organization
            </p>
            <h1 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              Employee Directory
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
              Manage employee records, update roles and keep your team
              information organized in one place.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:min-w-64">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-medium text-slate-500">
                Total employees
              </p>
              <p className="mt-2 text-3xl font-black tracking-tight">
                {employees.length}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-medium text-slate-500">
                Search results
              </p>
              <p className="mt-2 text-3xl font-black tracking-tight">
                {filteredEmployees.length}
              </p>
            </div>
          </div>
        </section>

        <div className="mb-7">
          <EmployeeForm
            form={form}
            setForm={setForm}
            editingId={editingId}
            onSubmit={handleSubmit}
            onCancel={resetForm}
            saving={saving}
          />
        </div>

        <section>
          <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Team members
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                View, search and manage employee records.
              </p>
            </div>

            <div className="relative w-full sm:max-w-sm">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                ⌕
              </span>
              <input
                value={search}
                onChange={handleSearch}
                placeholder="Search name, email or role..."
                aria-label="Search employees"
                className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              />
            </div>
          </div>

          <EmployeeTable
            employees={visibleEmployees}
            loading={loading}
            onEdit={handleEdit}
            onDelete={handleDelete}
            page={page}
            pageSize={PAGE_SIZE}
            totalEmployees={filteredEmployees.length}
            onPageChange={setPage}
          />
        </section>

        <footer className="py-8 text-center text-xs text-slate-400">
          PeopleDesk · React · Tailwind CSS · Express · PostgreSQL
        </footer>
      </main>
    </div>
  );
}

export default App;
