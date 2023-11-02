/* global module */
/* eslint no-undef: "error" */

// Plugin method that runs on plugin load
async function setupPlugin({ config }) {
    console.log(config)
}

async function processEvent(event, { config, cache }) {

    if (!event.properties) {
        event.properties = {};
    }

    if (!event.properties['$dialog']) {
        return event
    }

    dialog = event.properties['$dialog']
    console.log("before parsing dialog", dialog)
    var dialog = JSON.parse(dialog);
    console.log("after parsing dialog", dialog)
    var dialogSize = dialogItems.length;
    // Calculate dialog size
    event.properties['dialog_size'] = dialogSize;
    console.log("total_size", dialogSize)
    return event;
}

// The plugin itself
module.exports = {
    setupPlugin,
    processEvent
}
