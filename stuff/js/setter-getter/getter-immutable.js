function buildImmutableMessage(message) {
	return {
		get body() {
			return message;
        }
    };
}

var myMessage = buildImmutableMessage('my super message');

myMessage
// {}
myMessage.body
//"my super message"
myMessage.body = 'other message'
//"other message"
myMessage.body
//"my super message"
myMessage.subject = 'wtf';
//"wtf"
myMessage
//{subject: "wtf"}
myMessage.body
//"my super message"