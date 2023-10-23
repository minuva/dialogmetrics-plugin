/* global module */
/* eslint no-undef: "error" */

// Plugin method that runs on plugin load
async function setupPlugin({ config }) {
    console.log(config)
}

async function splitDialogText(dialog_text) {
    
    const userPattern = /user:(.*?)(?=(agent:|$))/gs;
    const agentPattern = /agent:(.*?)(?=(user:|$))/gs;
    
    const userMatches = dialog_text.matchAll(userPattern);
    const agentMatches = dialog_text.matchAll(agentPattern);

    const userUtterances = [...userMatches].map(match => match[1]);
    const agentUtterances = [...agentMatches].map(match => match[1]);
    
    return { user: userUtterances, agent: agentUtterances };

}

async function processEvent(event, { config, cache }) {

    if (!event.properties) {
        event.properties = {};
    }

    if (!event.properties['text']) {
        return event
    }

    dialog = event.properties['text']
    const utterances = await splitDialogText(dialog);
    total_size = utterances.user.length + utterances.agent.length;

    // Calculate dialog size
    event.properties['dialog_size'] = total_size;
    console.log("total_size", total_size)
    return event;
}

// The plugin itself
module.exports = {
    setupPlugin,
    processEvent
}
