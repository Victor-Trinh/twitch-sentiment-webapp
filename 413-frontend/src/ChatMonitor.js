const tmi = require('tmi.js');

export default class ChatMonitor {
    constructor(channel, msg_buffer_size){
        this.queue = []
        this.channel = channel
        this.msg_buffer_size = msg_buffer_size
    }

    monitor_chat(callback) {
        console.log(`Starting monitor for ${this.channel}`);
        const client = new tmi.Client({
            options: { 
                debug: false,
                skipUpdatingEmotesets: true,
                updateEmoteSetsTimer: 0
            },
            identity: {
                username: process.env.TWITCH_NAME,
                password: process.env.TWITCH_OATH
            },
            channels: [ this.channel ],
        });

        client.connect().catch(console.error);
        client.on('message', (channel, tags, message, self) => {
            if(self) return;
            this.queue.push(message)
            if (this.queue.length >= this.msg_buffer_size) {
                
                // send stuff to backend
                const endpoint = "http://127.0.0.1:5000/sentiment"
                fetch(endpoint, 
                    {
                        method: 'POST', // body is not allowed for GET
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({"messages": this.queue}), 
                    }
                    ).then(response=>response.json()).then(data=>{
                        console.log(`Setting sentiment to ${data.sentiment}`)
                        callback(data.sentiment)
                    })

                this.queue = []
            }
        });
    }
}
