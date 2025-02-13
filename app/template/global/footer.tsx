// website-template v1.3

import { NameLink } from "../link/nameLink";

export default function Footer() {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const pk = require("../../../package.json");
    const repo = pk.name;
    const releaseNotesLink = new NameLink("Release notes", "https://github.com/shephardluke/" + repo + "/releases/tag/v" + pk.version).generateElement()

    return (
        <>
            <div className="text-center p-10 flex-col justify-center gap-4 bg-darkest-blue">
                <p className="text-xl">{repo} v{pk.version}</p>
                <p className="text-base">{releaseNotesLink}</p>
            </div>
        </>
    )
}
