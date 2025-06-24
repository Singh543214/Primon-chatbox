let prompt=document.querySelector("#prompt")
let chatcontainer=document.querySelector(".chat-area");
let imagebtn=document.querySelector("#image");
let submitbtn=document.querySelector("#submit");

const API_url="https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=AIzaSyB2wqRlKJTL9CoaPqF11lrnmF3ZvW8AubY"

let user={
    data:null,
};

async function GenerateResponse(ai_chat) {
    let text=ai_chat.querySelector(".ai-chat");
    let requestText = user.data;

    let Request_opt={
        method:"POST",
        headers:{'Content-Type': 'application/json'},
        body:JSON.stringify({
            "contents":[{
        "parts": [
          {
            "text": requestText
          }
        ]
      }]
    })
    }
   try{
     let response = await fetch(API_url,Request_opt);
     let data=await response.json();
     let apiRes=data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g,"$1").trim();
     text.innerHTML=apiRes;
     
   }
   catch(error){
    console.log(error);
   }
   finally{
      chatcontainer.scrollTo({top:chatcontainer.scrollHeight,behavior:"smooth"});

   }
}

function createChatBox(html,classes){
    let div=document.createElement("div");
    div.innerHTML=html;
    div.classList=classes;
    return div;
}

function UserInput(message){
    user.data=message;
    let html=`<img src="programmer.png" alt="" id="user-img" width="50">
            <div class="user-chat">${user.data}</div>`;
            prompt.value=null;
    let userChatbox=createChatBox(html,"user-box");  
    chatcontainer.appendChild(userChatbox);
  chatcontainer.scrollTo({top:chatcontainer.scrollHeight,behavior:"smooth"});

    setTimeout(()=>{
        let html=`<img src="ai.png" alt="" id="ai-img" width="50">
            <div class="ai-chat"><img src="loading_spinner_white.gif" alt="" width="30"></div>`;
        let ai_chat=createChatBox(html,"ai-box");
        chatcontainer.appendChild(ai_chat); 
        GenerateResponse(ai_chat);   
    },50);
}

prompt.addEventListener("keydown",(e)=>{
    if(e.key=="Enter"){
    UserInput(prompt.value);
    }
})
submitbtn.addEventListener("click",()=>{
  UserInput(prompt.value);
})
imagebtn.addEventListener("click",()=>{
  imagebtn.querySelector("input").click();
})

//submitbtn.addEventListener("click",UserInput(prompt.value))