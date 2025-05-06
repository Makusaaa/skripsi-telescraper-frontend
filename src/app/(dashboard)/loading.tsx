import { LoaderIcon } from "lucide-react";

export default function Loading(){
    return (
        <div className="bg-muted flex flex-1 flex-col gap-4 p-4">
            <LoaderIcon className="animate-spin m-auto" />
        </div>
    )
}