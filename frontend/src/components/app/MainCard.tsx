import Stepper from "@/components/app/Stepper";

export default function MainCard(): JSX.Element {
  return (
    <section className="max-w-[500px] xl:max-w-[600px] w-full rounded-xl border border-yellow-500 bg-black">
      <Stepper />
    </section>
  );
}
