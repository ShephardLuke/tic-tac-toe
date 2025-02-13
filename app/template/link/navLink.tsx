// website-template v1.3

import Link from "next/link"
import { NameLink } from "./nameLink"
import React from "react"

export class NavLink extends NameLink {
    constructor(label: string, customLink?: string) {
        super(label, customLink ? customLink : "/" + label.toLowerCase().replace(" ", "-"))
    }    

    generateElement(): React.JSX.Element { // Returns as a NextJS Link Component
        return <Link key={this.getLabel()} href={this.getLink()}>{this.getLabel()}</Link>
    }
}