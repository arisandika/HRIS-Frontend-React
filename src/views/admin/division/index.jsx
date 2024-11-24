import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { PlusCircle } from "lucide-react";
import DataTable from "./columns";

const Division = () => {
  return (
    <>
      <div className="grid grid-cols-3 gap-4 p-2 space-y-2">
        <div className="flex-col flex-1 h-full col-span-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Divisi</h2>
              <p className="text-muted-foreground">Kelola data divisi</p>
            </div>
            <Button type="button">
              <Link to="/admin/divisi/create" className="flex items-center">
                <PlusCircle strokeWidth={1.5} className="w-4 h-4 mr-2" /> Tambah
                Divisi
              </Link>
            </Button>
          </div>
        </div>
        <div className="col-span-3 p-6 border rounded-lg">
          <DataTable />
        </div>
      </div>
    </>
  );
};

export default Division;
