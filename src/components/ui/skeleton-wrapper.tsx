import { cn } from "@/lib/utils"
import { Skeleton } from "./skeleton"

export const SkeletonWrapper = ({ children, isLoading, fullWidth }: {
    children: React.ReactNode,
    isLoading: boolean,
    fullWidth?: boolean
}) => {

    return isLoading ? (
        <Skeleton className={cn(fullWidth && "w-full")}>
            <div className="opacity-0">
                {children}
            </div>
        </Skeleton>
    ) : children
}