import discordInvite from "../endpoints/discord/invite";
import formContact from "../endpoints/forms/contact";
import gravatar from "../endpoints/gravatar";
import index from "../endpoints/index";
import lanyard from "../endpoints/lanyard";

export default {
    discord: {
        invite: discordInvite,
    },
    forms: {
        contact: formContact,
    },
    gravatar: gravatar,
    index: index,
    lanyard: lanyard,
}
