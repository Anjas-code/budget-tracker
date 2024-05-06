import { Logo } from "@/components/ui/logo";

const LayoutAuthGroup = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="relative h-screen w-full flex flex-col items-center justify-center">
            <Logo />
            <div className="mt-12">{children}</div>
        </div>
    );
};

export default LayoutAuthGroup;
