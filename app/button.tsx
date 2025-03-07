import { ReactNode } from "react";

export default function Button({children, clicked=()=>{}}: {children: ReactNode, clicked:() => void}) {
    return <button className="border-2 border-black hover:bg-gray-100 active:bg-gray-200 transition ease-in-out duration-150 hover:scale-105" onClick={clicked}>{children}</button>
}