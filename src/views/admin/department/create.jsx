const DepartmentCreate = () => {
  return (
    <>
      <div className="grid gap-4 auto-rows-min md:grid-cols-1">
        <div className="flex-col flex-1 h-full p-8 space-y-8 border rounded-xl">
          <div className="flex items-center justify-between space-y-2">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Form Tambah Jabatan</h2>
              <p className="text-muted-foreground">Kelola data jabatan</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DepartmentCreate;
