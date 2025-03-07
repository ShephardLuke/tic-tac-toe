import { ReactNode } from "react";

export default function IconText({children, className}: {children: ReactNode, className?: string}) {
    return <span className={"flex flex-row justify-start gap-2 " + className}>{children}</span>
}