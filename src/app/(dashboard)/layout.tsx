import { Navbar } from "@/components/ui/navbar";

const LayoutDashboardGroup = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="relative h-screen w-full flex flex-col">
            <Navbar />
            <div className="w-full">{children}</div>
        </div>
    );
};

export default LayoutDashboardGroup;
