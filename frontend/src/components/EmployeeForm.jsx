
const inputClass =
  "mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10";

function EmployeeForm({
  form,
  setForm,
  editingId,
  onSubmit,
  onCancel,
  saving,
}) {
  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  };

  return (
    <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-7 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-blue-600" />
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-blue-700">
              Employee details
            </span>
          </div>

          <h2 className="text-xl font-bold tracking-tight text-slate-900">
            {editingId ? "Edit employee" : "Add new employee"}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {editingId
              ? "Update the employee information below."
              : "Fill in the details to add a team member."}
          </p>
        </div>

        {editingId && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
          >
            Cancel edit
          </button>
        )}
      </div>

      <form onSubmit={onSubmit}>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <label className="text-sm font-semibold text-slate-700">
            Full name
            <input
              className={inputClass}
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Aarav Sharma"
              autoComplete="name"
              minLength={2}
              maxLength={100}
              required
            />
          </label>

          <label className="text-sm font-semibold text-slate-700">
            Email address
            <input
              className={inputClass}
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="name@company.com"
              autoComplete="email"
              maxLength={150}
              required
            />
          </label>

          <label className="text-sm font-semibold text-slate-700">
            Job role
            <input
              className={inputClass}
              name="role"
              value={form.role}
              onChange={handleChange}
              placeholder="e.g. Software Engineer"
              maxLength={100}
              required
            />
          </label>
        </div>

        <div className="mt-7 flex flex-wrap justify-end gap-3 border-t border-slate-100 pt-5">
          {editingId && (
            <button
              type="button"
              onClick={onCancel}
              className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              Discard changes
            </button>
          )}

          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-sm shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? (
              "Saving..."
            ) : (
              <>
                <span aria-hidden="true">{editingId ? "✓" : "+"}</span>
                {editingId ? "Save changes" : "Add employee"}
              </>
            )}
          </button>
        </div>
      </form>
    </section>
  );
}

export default EmployeeForm;
