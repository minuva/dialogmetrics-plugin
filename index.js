/* global module */
/* eslint no-undef: "error" */

// Plugin method that runs on plugin load
async function setupPlugin({ config }) {
    console.log("App start", config)
}

async function processEvent(event, { config, cache }) {

    if (!event.properties) {
        event.properties = {};
    }

    if (!event.properties['$dialog']) {
        return event
    }

    dialog = event.properties['$dialog']
    var dialog = JSON.parse(dialog);
    var dialogSize = dialog.length;
    event.properties['dialog_size'] = dialogSize;
    return event;
}

// The plugin itself
module.exports = {
    setupPlugin,
    processEvent
}
