import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="flex flex-col max-w-screen min-h-screen items-center justify-center">
      <div className="p-4 shadow-2xl rounded-lg flex flex-col gap-6">
        <div className="text-2xl font-bold">
          <p>Admin Panel for Lending Hub</p>
          <p className="text-sm font-mono font-medium text-gray-500 text-center" >"This page just for test"</p>
        </div>
        <div>
          <Link to={"signin"}>
            <Button type="submit" className="w-full mt-2">
              Sign in
            </Button>
          </Link>
          <Link to={"signup"}>
            <Button type="submit" className="w-full mt-2">
              Sign in
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
