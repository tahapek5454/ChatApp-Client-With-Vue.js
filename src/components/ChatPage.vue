<template>
    <div id="root" class="d-flex">
        <div class="sidebar">
            <h3>Self Chat</h3>
            <div class="list-group list-group-flush border-bottom scrollarea">
                <span  @click="setActive(user.userName)" v-for="user in users" :key="user.userName" style="cursor: pointer;"  :class="`list-group-item list-group-item-action ${activeTargetUser == user.userName ? 'active' : ''} border-0 py-3`" aria-current="true">
                    <div class="d-flex w-100 align-items-center justify-content-between">
                        <strong class="mb-1">{{ user.userName }}</strong>
                        <small>1 min</small>
                    </div>
                </span>
            </div>
        </div>
        <div class="mainContent bg-body-tertiary p-5">
            <header class="d-flex justify-content-between align-items-center">
                <div class="activeUser d-flex gap-3">
                    <img class="userImg" src="../assets/person.jpg" alt="" />
                    <div class="userInfo d-flex flex-column justify-content-center">
                        <strong class="UserName">{{ activeTargetUser }}</strong>
                        <small class="userStatus">Online</small>
                    </div>
                </div>
                <div class="chatOptions">
                    <a class="chatOption" onclick=""><i class="fa fa-user-o" aria-hidden="true"></i></a>
                    <a class="chatOption" onclick=""><i class="fa fa-star-o" aria-hidden="true"></i></a>
                    <a class="chatOption" onclick=""><i class="fa fa-info-circle" aria-hidden="true"></i></a>
                    <a class="chatOption" onclick=""><i class="fa fa-ellipsis-v" aria-hidden="true"></i></a>
                </div>
            </header>
            <hr>
            <main class="activeUserChat">
                <div v-for="(messageObject, index) in allMessages" :key="index" :class="`${messageObject.to ==  this.$store.getters['getUser'].userName ? 'incomingMessageWrapper' : 'sendingMessageWrapper'}`">
                    <img v-if="messageObject.to ==  this.$store.getters['getUser'].userName" src="../assets/person.jpg" alt="No Image" class="sendingMessageUser">
                    <div :class="`${messageObject.to ==  this.$store.getters['getUser'].userName ? 'incomingMessage' : 'sendingMessage'}`">{{ messageObject.message }}</div>
                    <img v-if="messageObject.from ==  this.$store.getters['getUser'].userName" src="../assets/person.jpg" alt="No Image" class="sendingMessageUser">
                </div>
            </main>
            <hr>
            <div class="textMessage">
                <a class="messageAttachment me-2" href=""><i class="fa fa-paperclip" aria-hidden="true"></i></a>
                <input v-model="sendMessageContent" class="messageInput w-100 border-0" type="text" placeholder="Write your message ...">
                <a class="messageEmoji me-3" href=""><i class="fa fa-smile-o" aria-hidden="true"></i></a>
                <button  @click="sendMessage" :class="`sendMessageButton   ${sendMessageContent && activeTargetUser ? '' : 'disabled'}`" ><i class="fa fa-paper-plane-o"
                        aria-hidden="true"></i></button>
            </div>
        </div>
    </div>
</template>



<script>
import { defineComponent } from 'vue';
import { HubConnectionBuilder } from '@microsoft/signalr'

export default defineComponent({

    data() {
        return {

            hubConnection: new HubConnectionBuilder().withUrl("https://localhost:7279/chatHub").build(),

            users: null,

            activeTargetUser: null,
            sendMessageContent: null,

            allMessages: []
        }
    },
    methods: {

        sendMessage() {
            this.hubConnection.invoke('SendMessage', this.activeTargetUser, this.sendMessageContent).then(e => {
                console.log(e);
                this.allMessages.push({
                    message: this.sendMessageContent,
                    to: this.activeTargetUser,
                    from: this.$store.getters["getUser"].userName
                });
                this.sendMessageContent = null;

            }).catch(e => {
                console.log(e)

            });
        },
        setActive(userName) {
            this.activeTargetUser = userName;
        }

    },
    watch: {
        activeTargetUser(newValue) {
            this.$appAxios.get(`Messages/${this.$store.getters["getUser"].userName}/${newValue}`).then(r => {
                this.allMessages = r.data;
            });
        }
    },
    async created() {
        await this.hubConnection.start();

        this.hubConnection.invoke("GetUserName", this.$store.getters["getUser"].userName).catch(e => {
            console.log(e);
        });

        this.hubConnection.on("clientJoined", userName => {
            console.log(userName);
        });

        this.hubConnection.on("users", users => {
            console.log(users);
            this.users = users;
        });

        this.hubConnection.on("receiveMessage", messageObject => {
            this.allMessages.push(messageObject);
        })
    },

    async beforeUnmount() {
        await this.hubConnection.stop();
    }

})
</script>


<style>
#root{
    height: calc(100vh - 60px);
}
.sidebar{
    display: flex;
    flex-direction: column;
    align-items: stretch;
    flex-shrink: 0;
    width: 380px;
    overflow-y: scroll;
    gap: 20px;
    padding: .5rem;
    border-right: 1px solid blue;
}
.searchInput{
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    width: 100%;
    font-weight: 400;
    line-height: 1.5;
}
input[type="text"], input[type="password"], input[type="search"], textarea {
    border: none;
    outline: none;
  }
/* width */
::-webkit-scrollbar {
    width: 5px;
  }
  
  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  
  /* Handle */
  ::-webkit-scrollbar-thumb {
    border-radius: 100px;
    background: linear-gradient(to bottom, #30FCD0 0%, blue 100%);
  }
  
  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: blue;
  }

.list-group-item.active::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0px; /* Sol taraftaki 10px'lik kısım */
    width: 5px;
    border-radius: 50px;
    height: 100%;
    background-color: blue; /* Mavi renk */
  }

  .active{
    background-color: var(--bs-list-group-bg) !important;
    color:  var(--bs-list-group-color) !important;
    border-bottom: 1px solid blue !important;
  }
  .active strong{
    background: linear-gradient(to right, #30FCD0 0%, #330867 100%);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
  }

.mainContent{
    width: 100%;
    max-height: 100vh;
    display: flex;
    flex-direction: column;
    gap: 30px;
}

.activeUser .userImg{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: contain;
}
.activeUser small{
    color: grey;
}
.chatOptions{
    display: flex;
    align-items: center;
    gap: 10px;
}
.chatOption{
    cursor: pointer;
    font-size: 20px;
}
.activeUserChat{
    display: flex;
    height: 550px;
    overflow-y: scroll;
    flex-direction: column;
    gap: 20px;
}
.incomingMessageWrapper{
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;
}
.sendingMessageWrapper{
    display: flex;
    align-items: center;
    margin-left: auto;
    gap: 10px;
}
.incomingMessageUser,
.sendingMessageUser{
    width: 30px;
    height: 30px;
    border-radius: 50%;
    object-fit: contain;
}
.incomingMessage{
    padding: 10px;
    border-radius: 10px;
    background-color: #e5e5ea;
    color: black;
    font-size: 14px;
    font-weight: 500;
}
.sendingMessage{
    padding: 10px;
    border-radius: 10px;
    background-color: blue;
    color: white;
    font-size: 14px;
    font-weight: 500;
}

.textMessage{
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
}
.messageAttachment,
.messageEmoji{
    cursor: pointer;
    font-size: 20px;
}
.messageInput,
.searchInput{
    border: none;
    background: transparent;
}
.sendMessageButton{
    border: none;
    background: blue;
    color: white;
    border-radius: 50%;
    width: 50px;
    height: 50px;
}
.sendMessageButton:hover{
    background: linear-gradient(to right, #30FCD0 0%, #330867 100%);
}
</style>