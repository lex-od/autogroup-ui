import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <div className="p-4 grid gap-4">
      <h1>Basic elements</h1>

      <Input className="max-w-xs" />

      <div className="grid grid-flow-col gap-4 auto-cols-max">
        <Button className="min-w-20">Ok</Button>
        <Button className="min-w-20" variant="secondary">
          Cancel
        </Button>
      </div>
    </div>
  );
}
