const dialogflow = require('@google-cloud/dialogflow');

const SESSION_FILE_PATH = '/.wwebjs_auth/session-client-cartera';

const fs = require('fs');
const CREDENTIALS = JSON.parse(fs.readFileSync(__dirname+'/carterabotkey.json'));

require('dotenv').config();
const { Client,LocalAuth  } = require('whatsapp-web.js');
require('dotenv').config();
const express = require('express');
const qrcode =  require('qrcode');
const webApp = express();
let pauseC= [];
let salid;
let salida = `<script type="text/javascript" src = "//code.jquery.com/jquery-3.6.1.min.js"></script>
<div id = 'salida'>espere</div>
<script>


let hola = setInterval(\`viewstate()\`,1000);

function viewstate(){
    
    $.post(window.location.href).done(function (data){
        $("#salida").empty();
        $("#salida").append(data);
    });
};

</script>`;
var init = false;
// Webapp settings
webApp.use(express.urlencoded({
    extended: true
}));
webApp.use(express.json());

// Server Port
const PORT = process.env.PORT || 1004;

function initclient(){
    salid = "espere";
    let client = new Client({
        authStrategy: new LocalAuth({ clientId: "client-cartera" }),
        puppeteer: {
            args: ['--no-sandbox','--disable-setuid-sandbox'],
        }
    });
    client.initialize(() =>{
        init = true;
    });
    
    client.on('disconnected', (reason) => {
        init = false;
        console.log("disconect");
        salid = "desconectado espere";
        if (fs.existsSync(SESSION_FILE_PATH)) {
           client.destroy();
        }
        client = initclient();
    });
    client.on('auth_failure', (reason) => {
        salid = "fallo";
        console.log("fallo");
    });
    client.on('ready',  () => {
    //imprime "Client is ready"
        console.log("ready");
        salid = 'Client is ready!';
        
    });
    client.on('qr', async qr => {
        //salida = ;
        console.log("qr");
        salid = await qrcode.toDataURL(qr);
        salid = "<img src=\""+salid+"\">";
        //console.log(qr);
    });
    client.on('message', async message => {
    
        console.log('recibi un mensaje');
        if(message.body.search("{pause}") >= 0){
            
            let numero = message.body.split(" ")[1]; 
    
            if(numero == null){
                numero = message.from;
            }else{
                numero = numero+"@c.us";
            }
            
            pauseC.push(numero);
            console.log("pause add "+ numero);
        }
    
        else if(message.body.search("{unpause}") >= 0){
            
            let numero = message.body.split(" ")[1]; 
            if(numero == null){
                numero = message.from;
            }else{
                numero = numero+"@c.us";
            }
            pauseC = pauseC.filter((item) => item !== numero)
            console.log("pause remove "+ numero);
    
        }
    
        else if(message.body == "{reset}"){
            console.log("reset all");
            pauseC.length = 0;
            pauseC = [];
        }
        else if(message.hasMedia && argumentos[1]=="c.us" && !pauseC.includes(message.from)){
            client.sendMessage(message.from,"Gracias, permítame un momento 😁");
            console.log("pause add for media "+ message.from);
            pauseC.push(message.from);
        }
        else if(!pauseC.includes(message.from)){
            sessionId = message.from;
            queryText = message.body;
            languageCode = "es";
            let cuerpo = message.from;
            let argumentos = cuerpo.split('@');
            
            //argumentos[0] = argumentos[0].substring(2,12);
            //si no es un grupo
    
            if(argumentos[1]=="c.us"){
                if(estado != 0){
                    if(queryText == "{stop}"){
                        estado = 0;
                    }else{
                       try {
    
                            let responseData = await detectIntent(languageCode, queryText, sessionId);
                            //console.log(sessionId +' '+ responseData.response);
                            if(responseData.response == null || responseData.response == ""){
                                pauseC.push(message.from);
                            }else{
    
                                if(responseData.response.search("{pause}") > 0){
                                    console.log("pause add "+ message.from+" "+responseData.response.search("{pause}"));
                                    pauseC.push(message.from);
                                    responseData.response = responseData.response.replace("{pause}","");
                                }
                                if(responseData.response.search("{unpause}") > 0){
                                    console.log("pause remove "+ message.from+" "+responseData.response.search("{unpause}"));
                                    pauseC = pauseC.filter((item) => item !== numero)
                                    responseData.response = responseData.response.replace("{unpause}","");
                                }
                                let mark = false; 
    
                                if(responseData.response.search("{markunread}") > 0){
                                    console.log("unread mark add "+ message.from);
                                    responseData.response = responseData.response.replace("{markunread}","");
                                    mark = true;
                                }
                                client.sendMessage(sessionId,responseData.response);
                                
                               if(mark){
                                    client.markChatUnread(sessionId);
                               }
                                
                            }
                            
                            
                            
                            
                        } catch (error) {
                            console.log(error);
                        }
                    }
                }else{
                    if(queryText == "{resume}"){
                        estado = 1;
                    }
                }
                
            }
        }
        
    
        
        
    });
    
}
initclient();
// Your credentials
//const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);
let estado = 0;







webApp.get('/', (req, res) => {
    res.send(salida);
});

webApp.post('/', (req, res) => {
    res.send(salid);
});

webApp.listen(PORT, () => {
    console.log(`Server is up and running at ${PORT}`);
});


// Other way to read the credentials

 

// Your google dialogflow project-id
const PROJECID = CREDENTIALS.project_id;

// Configuration for the client
const CONFIGURATION = {
    credentials: {
        private_key: CREDENTIALS['private_key'],
        client_email: CREDENTIALS['client_email']
    }
}

const sessionClient = new dialogflow.SessionsClient(CONFIGURATION);





// Detect intent method
const detectIntent = async (languageCode, queryText, sessionId) => {

    let sessionPath = sessionClient.projectAgentSessionPath(PROJECID, sessionId);

    // The text query request.
    let request = {
        session: sessionPath,
        queryInput: {
            text: {
                // The query to send to the dialogflow agent
                text: queryText,
                // The language used by the client (en-US)
                languageCode: languageCode,
            },
        },
    };

    // Send request and log result
    const responses = await sessionClient.detectIntent(request);
    const result = responses[0].queryResult;

    return {
        response: result.fulfillmentText
    };
}


















