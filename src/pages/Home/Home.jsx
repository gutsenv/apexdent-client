import ScheduleAppointmentBtn from "@/components/common/ScheduleAppointmentBtn";

function Home() {
  return (
    <div className="h-full mt-40 w-full flex flex-col gap-2 justify-center items-center">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-6xl text-secondary-foreground pb-2">
        ApexDent
      </h1>
      <h2 className="scroll-m-20 pb-2 text-lg tracking-tight opacity-85">
        Our comprehensive dental service delivers expert care and radiant smiles
        for every patient.
      </h2>
      <p className="text-sm text-muted-foreground">Clinic Details: lorem ipsum dolor set amet</p>
      <p className="text-sm text-muted-foreground mb-4">Services Offered: lorem ipsum dolor set amet</p>
      <ScheduleAppointmentBtn />
    </div>
  );
}

export default Home;
