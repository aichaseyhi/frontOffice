const Pusher = require("pusher");

const pusher = new Pusher({
  appId: "1793765",
  key: "8a3ed820322ff1c8eb10",
  secret: "c580f6f32688b68b2e33",
  cluster: "eu",
  useTLS: true
});

pusher.trigger("my-channel", "my-event", {
  message: "hello world"
});
