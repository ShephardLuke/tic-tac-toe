// header.tsx V1

import Link from "next/link";
import { NameLink } from "./nameLink";
import { JSX } from "react";

class NavLink extends NameLink {
    constructor(label: string, customLink?: string) {
        super(label, customLink ? customLink : "/" + label.toLowerCase())
    }    

    generateElement(): JSX.Element {
        return <Link key={this.getLabel()} className="text-2xl" href={this.getLink()}>{this.getLabel()}</Link>
    }
}

export default function Header({currentPage}: {currentPage?: string}) {

    const MAIN_TITLE = "Tic Tac Toe";
    
    const PAGES = [
        new NavLink("Play", "/"),
        new NameLink("View on Github", "https://github.com/shephardluke/tic-tac-toe"),
        new NameLink("Main Website", "https://shephardluke.co.uk")
    ]
    const pageLinks = PAGES.map(page => {
        const label = page.getLabel();
        if (currentPage == label) {
            return <div key={"currentPage"} className="underline header">{page.generateElement()}</div>
        } 
        return page.generateElement();
    })

    return (
        <div className="flex justify-between p-10 header">
            <Link className="basis-1/2 text-4xl" href={"/"}>{MAIN_TITLE}</Link>
            <div key={"links"} className="basis-1/2 flex justify-around header">
                {pageLinks}
            </div>
        </div>

    )
}
