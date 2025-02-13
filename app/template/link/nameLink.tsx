// website-template v1.3

import React from "react";

export class NameLink {
    private label: string;
    private link: string;
    private enabled: boolean;
    
    constructor(label: string, link: string, enabled?: boolean) {
        this.label = label;
        this.link = link;
        this.enabled = enabled == undefined ? true : enabled;
    }

    getLabel() {
        return this.label;
    }
    
    getLink() {
        return this.link;
    }

    generateElement(): React.JSX.Element { // Returns as an a element if enabled or span if disabled, always opens link in new tab
        if (!this.enabled) {
            return <span className="disabledLinkStyle">{this.getLabel()}</span>
        }
        return <a key={this.getLabel()} href={this.getLink()} target="_blank">{this.getLabel()}</a>
    }

    setEnabled(enabled: boolean) {
        this.enabled = enabled;
    }

    isEnabled() {
        return this.enabled;
    }
}