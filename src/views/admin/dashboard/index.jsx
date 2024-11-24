const Dashboard = () => {
  return (
    <>
      <div className="grid gap-4 auto-rows-min md:grid-cols-1">
        <div className="flex-col flex-1 hidden h-full p-8 space-y-8 border md:flex rounded-xl">
          <div className="flex items-center justify-between space-y-2">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                Welcome back!
              </h2>
              <p className="text-muted-foreground">
                Here is a list of your tasks for this month!
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
