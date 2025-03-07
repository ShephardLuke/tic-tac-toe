import { ReactNode } from "react";

export default function Button({children, clicked=()=>{}}: {children: ReactNode, clicked:() => void}) {
    return <button className="border-2 border-black" onClick={clicked}>{children}</button>
}