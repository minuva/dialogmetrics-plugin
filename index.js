/* global module */
/* eslint no-undef: "error" */

async function splitText(dialog_text) {

    console.log("splitting text", dialog_text)
    // split text by "user:" or "agent:"
    pattern = /user:|agent:/g
    return dialog_text.split(pattern)
}

// Plugin method that runs on plugin load
async function setupPlugin({ config }) {
    console.log(config.dialog_size)
}

// Plugin method that processes event
async function processEvent(event, { config, cache }) {
    if (!event.properties) event.properties = {}

    console.log("processing event", event.properties['text'])
    texts = await splitText(event.properties['text'])
    event.properties['dialog_size'] = texts.length
    
    return event
}

// The plugin itself
module.exports = {
    setupPlugin,
    processEvent
}
