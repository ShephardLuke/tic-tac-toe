// website-template v1.3

import Link from "next/link";
import { NameLink } from "../link/nameLink";
import { NavLink } from "../link/navLink";

export default function Header({currentPage}: {currentPage?: string}) {

    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const pk = require("../../../package.json");
    const repo = pk.name;

    const MAIN_TITLE = "Tic Tac Toe";
    
    const PAGES = [ // List of pages that will show on the nav bar. NavLink internal links, NameLink is for external links and will open in a new tab
        new NavLink("Play", "/"),
        new NameLink("View on GitHub", "https://github.com/shephardluke/" + repo),
    ]

    const pageLinks = PAGES.map(page => { // Turns each element into a link, with the current page having linkStyle class
        const label = page.getLabel();
        if (currentPage == label) {
            return <div key={"currentPage"} className="underline header linkStyle">{page.generateElement()}</div>
        } 
        return page.generateElement();
    })

    return (
        <div className="flex justify p-10 header">
            <div className="header whitespace-nowrap">
                <Link className="text-4xl" href={"/"}>{MAIN_TITLE}</Link>
            </div>
            <div key={"links"} className="flex justify-around header text-2xl items-center w-full">
                {pageLinks}
            </div>
        </div>
    )
}
