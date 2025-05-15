import { Badge } from "@/components/ui/badge";
import { StatusEnum, StatusName } from "@/lib/moduleconstants"
import { ComponentProps } from "react";

interface StatusBadgeProps {
  status: StatusEnum
}

export function StatusBadge({ status }: StatusBadgeProps) {
    const label = StatusName[status];
    return (
        <Badge key={label} variant={getBadgeVariantFromLabel(status)}>
            {label}
        </Badge>
    )
}

function getBadgeVariantFromLabel(
  status: StatusEnum
): ComponentProps<typeof Badge>["variant"] {
    if (status == StatusEnum.Open) return "default"
    if (status == StatusEnum.Closed) return "outline"
    return "secondary"
}