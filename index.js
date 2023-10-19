/* global module */
/* eslint no-undef: "error" */


// Plugin method that runs on plugin load
async function setupPlugin({ config }) {
    console.log(config.dialog_size)
}

// Plugin method that processes event
async function processEvent(event, { config, cache }) {
    if (!event.properties) {
        event.properties = {};
    }

    if (!event.properties['text']) {
        return event
    }

    dialog = event.properties['text']

    const userUtterances = dialog.match(/user:.*?(?=(agent:|$))/g) || [];
    const agentUtterances = dialog.match(/agent:.*?(?=(user:|$))/g) || [];
    const merged = userUtterances.concat(agentUtterances);

    event.properties['dialog_size'] = merged.length;
    return event;
}

// The plugin itself
module.exports = {
    setupPlugin,
    processEvent
}
