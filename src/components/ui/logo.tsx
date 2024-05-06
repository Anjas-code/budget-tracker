import { PiggyBank } from "lucide-react";
import Link from "next/link";

export const Logo = () => {
    return (
        <Link href="/" className="flex items-center gap-2 px-4 py-2 md:p-0 ">
            <PiggyBank className="h-11 w-11 stroke-amber-500 stroke-[1.5]" />
            <p className="whitespace-break-spaces capitalize bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-sm md:text-3xl font-bold leading-tight tracking-tighter text-transparent md:whitespace-nowrap">
                budget tracking
            </p>
        </Link>
    );
};
