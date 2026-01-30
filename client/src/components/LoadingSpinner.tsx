import { Loader } from "lucide-react";

const LoadingSpinner = ({ message }: { message?: string }) => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-secondary/50">
            <div className="flex flex-col items-center gap-4">
                <Loader className="w-8 h-8 animate-spin text-primary" />
                <p className="text-muted-foreground">{message ?? "Loading"}...</p>
            </div>
        </div>
    );
}

export default LoadingSpinner;