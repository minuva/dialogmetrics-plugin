/* global module */
/* eslint no-undef: "error" */
const ROLE_USER = 'user';
const ROLE_AGENT = 'agent';

// Plugin method that runs on plugin load
async function setupPlugin({ config }) {
    console.log(config.dialog_size)
}

async function makePostRequest(url, data) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
  
      if (response.status === 200) {
        const responseData = await response.json();
        return responseData;
      } else {
        console.error("Request failed with status code: " + response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
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

    toxic_url = config.toxic_url;
    console.log("toxic_url: ", toxic_url)
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

    // Get conversation toxicity
    const textRoles = [];
    for (const userUtterance of utterances.user) {
        textRoles.push({ text: userUtterance, role: ROLE_USER });
    }

    for (const agentUtterance of utterances.agent) {
        textRoles.push({ text: agentUtterance, role: ROLE_AGENT });
    }

    console.log("textRoles", textRoles)
    res = await makePostRequest(toxic_url, textRoles);
    console.log("returned res", res)

    return event;
}

// The plugin itself
module.exports = {
    setupPlugin,
    processEvent
}
