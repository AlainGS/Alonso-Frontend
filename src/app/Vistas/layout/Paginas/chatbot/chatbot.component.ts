// import { Component, OnInit } from '@angular/core';
// import { WatsonAssistantV2 } from 'ibm-watson/assistant/v2';
// import { IamAuthenticator } from 'ibm-watson/auth';
// import { HttpClient } from '@angular/common/http';

// @Component({
//     selector: 'app-chatbot',
//     templateUrl: './chatbot.component.html',
//     styleUrls: ['./chatbot.component.scss']
//   })

// export class ChatbotComponent implements OnInit {
//     private watsonAssistant: WatsonAssistantV2;
    
//     constructor(private http: HttpClient) {}
    
//     ngOnInit() {
//       this.watsonAssistant = new WatsonAssistantV2({
//         authenticator: new IamAuthenticator({
//           apikey: 'ugHn2Sb2aCFZFuz4TJ8IIZJdqECIRPtjhCCNASUBwWHU',
//         }),
//         serviceUrl: 'https://api.us-south.assistant.watson.cloud.ibm.com/instances/12a02f7b-c87e-42da-ae5d-b7792941b766',
//         version: '2021-09-01',
//       });
//     }

//     private getAzureData() {
//         this.http.get('URL_DEL_API_AZURE').subscribe((data) => {
//         console.log(data);
//         // Procesa los datos de respuesta como desees
//     });
//     }
    
//     // Resto del código del componente...
//   }

  