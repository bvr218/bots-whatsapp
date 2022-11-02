const express = require('express')
const axios = require('axios')
const app = express()
const port = 1099 
'use strict';
 
const {WebhookClient} = require('dialogflow-fulfillment');
 
process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

app.post('/', express.json(), (req, res) => {
    try {
        const agent = new WebhookClient({ request:req, response:res });
    process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statementsconst agent = new WebhookClient({ request, response });
    //console.log('Dialogflow Request headers: ' + JSON.stringify(req.headers));
    //console.log('Dialogflow Request body: ' + JSON.stringify(req.body));

    async function deudafactura(agent){
         
        //req.body.queryResult.action
        let action = req.body.queryResult.action;
        let parameters = JSON.stringify(req.body.queryResult.parameters);
        //agent.add("desde api antes");
        
        let response = await axios.get('https://internet2.fututel.com/admin/wsp/api/api?action='+action+'&data='+parameters)
        //console.log(response);
        if(response.data.salida == "exito"){
            agent.add(`SR(a) `+response.data['usuario']+` el valor a pagar es de `+response.data['deuda']+` recuerde que las fechas de pago son del primero al 10 de cada mes, puede realizar su pago por *EFECTY* al convenio Nro.*111300*  con su numero de cedula y el monto a pagar.`);
            agent.context.set({ name: 'otrosmedios', lifespan: 2, parameters: { cedula:  JSON.stringify(req.body.queryResult.parameters.cedula)}});
        } else{
            agent.add(`Lo sentimos, la nro de cedula `+JSON.stringify(req.body.queryResult.parameters.cedula)+` no existe en nuestra base de datos, verifica que la cedula sea del titular del servicio, quedo atento`);
            agent.context.set({ name: 'noexiste', lifespan: 2, parameters: { cedula:  JSON.stringify(req.body.queryResult.parameters.cedula)}});
        }
        

        //agent.add();
    }
    async function deudafacturasegundo(agent){
         
        //req.body.queryResult.action
        let action = req.body.queryResult.action;
        let parameters = JSON.stringify(req.body.queryResult.parameters);
        //agent.add("desde api antes");
        
        let response = await axios.get('https://internet2.fututel.com/admin/wsp/api/api?action='+action+'&data='+parameters)
        //console.log('https://internet2.fututel.com/admin/wsp/api/api?action='+action+'&data='+parameters);
        if(response.data.salida == "exito"){
            agent.add(`SR(a) `+response.data['usuario']+` el valor a pagar es de `+response.data['deuda']+`, desea conocer los medios de pago? 👍🏻😁`);
            //agent.context.set({ name: 'otrosmedios', lifespan: 2, parameters: { cedula:  JSON.stringify(req.body.queryResult.parameters.cedula)}});
        } else{
            agent.add(`Lo sentimos, la nro de cedula `+JSON.stringify(req.body.queryResult.parameters.cedula)+` no existe en nuestra base de datos, verifica que la cedula sea del titular del servicio, quedo atento`);
            agent.context.set({ name: 'noexiste', lifespan: 2, parameters: { cedula:  JSON.stringify(req.body.queryResult.parameters.cedula)}});
        }
        

        //agent.add();
    }
    async function consultausuario(agent){
         
        //req.body.queryResult.action
        let action = req.body.queryResult.action;
        let parameters = JSON.stringify(req.body.queryResult.parameters);
        //agent.add("desde api antes");
        
        let response = await axios.get('https://internet2.fututel.com/admin/wsp/api/api?action='+action+'&data='+parameters)
        //console.log(response);
        if(response.data.salida == "exito"){
            agent.add(`SR(a) `+response.data['usuario']+` puede consultar sus facturas en el siguiente link
http://internet2.fututel.com/
Para usuarios de Garzon  http://internetgarzon.fututel.com/
con los siguientes datos de acceso:

Usuario: `+response.data['cedula']+`
Contraseña: `+response.data['codigo']+`
            
            `);
            agent.context.set({ name: 'otrosmedios', lifespan: 2, parameters: { cedula:  JSON.stringify(req.body.queryResult.parameters.cedula)}});
        } else{
            agent.add(`Lo sentimos, la nro de cedula `+JSON.stringify(req.body.queryResult.parameters.cedula)+` no existe en nuestra base de datos, verifica que la cedula sea del titular del servicio, quedo atento`);
            agent.context.set({ name: 'noexiste', lifespan: 2, parameters: { cedula:  JSON.stringify(req.body.queryResult.parameters.cedula)}});
        }
        

        //agent.add();
    }
    async function deudacartera(agent){
         
        //req.body.queryResult.action
        let action = req.body.queryResult.action;
        let parameters = JSON.stringify(req.body.queryResult.parameters);
        //agent.add("desde api antes");
        
        let response = await axios.get('https://internet2.fututel.com/admin/wsp/api/api?action='+action+'&data='+parameters)
        //console.log(response);
        if(response.data.salida == "exito"){
            agent.add(`SR(a) `+response.data['usuario']+` el valor a pagar es de `+response.data['deuda']+`
*⚠️NO DEJES ACUMULAR DÍAS DE MORA⚠️ y define tu estado con nosotros*`);
            agent.context.set({ name: 'mediosdepago', lifespan: 4, parameters: { nombre: response.data['usuario'] ,cedula:  JSON.stringify(req.body.queryResult.parameters.cedula)}});
        } else{
            agent.add(`Lo sentimos, la nro de cedula `+JSON.stringify(req.body.queryResult.parameters.cedula)+` no existe en nuestra base de datos, verifica que la cedula sea del titular del servicio, quedo atento`);
            agent.context.set({ name: 'noexiste', lifespan: 2, parameters: { nombre: response.data['usuario'], cedula:  JSON.stringify(req.body.queryResult.parameters.cedula)}});
        }
        

        //agent.add();
    }

    async function barriosyveredas(agent){
         
        //req.body.queryResult.action
        let action = req.body.queryResult.action;
        let parameters = JSON.stringify(req.body.queryResult.parameters);
        //agent.add("desde api antes");
        
        let response = await axios.get('https://internet2.fututel.com/admin/wsp/api/api?action='+action+'&data='+parameters)
        //console.log(response);
        
        agent.add(response.data.mensaje); 

        agent.context.set({ name: 'barrios', lifespan: 0, parameters: { }});
        
        

        //agent.add();
    }

    async function promesafactura(agent){
         
        //req.body.queryResult.action
        let action = req.body.queryResult.action;
        let parameters = JSON.stringify(req.body.queryResult.parameters);
        //agent.add("desde api antes");
        
        let response = await axios.get('https://internet2.fututel.com/admin/wsp/api/api?action='+action+'&data='+parameters)
        //console.log(response);
        if(response.data.salida == "exito"){
            agent.add(`SR(a) `+response.data['usuario']+` el valor a pagar es de `+response.data['deuda']+`
*⚠️NO DEJES ACUMULAR DÍAS DE MORA⚠️ y define tu estado con nosotros*`);
            agent.context.set({ name: 'mediosdepago', lifespan: 4, parameters: { nombre: response.data['usuario'] ,cedula:  JSON.stringify(req.body.queryResult.parameters.cedula)}});
        } else{
            agent.add(`Lo sentimos, la nro de cedula `+JSON.stringify(req.body.queryResult.parameters.cedula)+` no existe en nuestra base de datos, verifica que la cedula sea del titular del servicio, quedo atento`);
            agent.context.set({ name: 'noexiste', lifespan: 2, parameters: { nombre: response.data['usuario'], cedula:  JSON.stringify(req.body.queryResult.parameters.cedula)}});
        }
        

        //agent.add();
    }

    async function suspensioncartera(agent){
         
        //req.body.queryResult.action
        let action = req.body.queryResult.action;
        let parameters = JSON.stringify(req.body.queryResult.parameters);
        //agent.add("desde api antes");
        
        let response = await axios.get('https://internet2.fututel.com/admin/wsp/api/api?action='+action+'&data='+parameters)
        //console.log(response);
        if(response.data.salida == "exito"){
            if(response.data['deuda']<5000){
                agent.add(`SR(a) `+response.data['usuario']+` su deuda con fututel es de `+response.data['deuda']+`
por lo tanto si cumple con el requisito para tomar la solicitud de suspension temporal. Me puede indicar por cuanto tiempo (en meses) desea suspender el servicio porfavor?`);
                agent.context.set({ name: 'cumplesuspension', lifespan: 4, parameters: { nombre: response.data['usuario'] }});
            } else {
                agent.add(`SR(a) `+response.data['usuario']+` su deuda con fututel es de `+response.data['deuda']+`
por lo tanto no cumple con el requisito para tomar la solicitud de suspension temporal, lo invitamos a ponerse al dia con Facturacion al numero 3163123623`);
                agent.context.set({ name: 'nocumplesuspension', lifespan: 4, parameters: { nombre: response.data['usuario'] }});
            }
            
            
        } else{
            agent.add(`Lo sentimos, la nro de cedula `+JSON.stringify(req.body.queryResult.parameters.cedula)+` no existe en nuestra base de datos, verifica que la cedula sea del titular del servicio, quedo atento`);
            agent.context.set({ name: 'noexiste', lifespan: 2, parameters: { nombre: response.data['usuario'], cedula:  JSON.stringify(req.body.queryResult.parameters.cedula)}});
        }
        

        //agent.add();
    }

    async function getplanesfactura(agent){
        let planes = {
            "ruralPitalito":{"1 mega":"34.900","2 megas":"42.900","3 megas":"49.900","4 megas":"56.900"},
            "barrioPitalito":{"2 megas":"34.900","3 megas":"39.900","5 megas":"44.900","6 megas":"49.900"},
            "ruralPitalitoAntena":{"1 megas":"39.900","2 megas":"49.900","3 megas":"56.900"},
             
            "sanAdolfo":{"1 megas":"34.900","2 megas":"39.900","3 megas":"44.900","4 megas":"49.900","5 megas":"54.900"},
            "villasRoque":{"1 megas":"34.900","2 megas":"39.900","3 megas":"44.900","4 megas":"49.900","5 megas":"54.900"},
            "timana":{"1 megas":"34.900","2 megas":"42.900","3 megas":"49.900"},
            "quituro":{"1 megas":"34.900","2 megas":"39.900","3 megas":"44.900","4 megas":"49.900","5 megas":"54.900"},
            "guayabal":{"1 megas":"34.900","2 megas":"39.900","3 megas":"44.900","4 megas":"49.900","5 megas":"54.900"},
            "garzon":{"2 megas":"34.900","3 megas":"39.900","5 megas":"44.900","6 megas":"49.900"},
            "potrerillo":{"1 mega":"34.900","2 megas":"42.900","3 megas":"49.900","4 megas":"56.900"},
            "criollo":{"1 mega":"34.900","2 megas":"42.900","3 megas":"49.900","4 megas":"56.900"},
            "higueron":{"1 mega":"34.900","2 megas":"42.900","3 megas":"49.900","4 megas":"56.900"}
        };
        
       
        let action = req.body.queryResult.action;
        let parameters = JSON.stringify(req.body.queryResult.parameters);
        
        let response = await axios.get('https://internet2.fututel.com/admin/wsp/api/api?action='+action+'&data='+parameters)
        //console.log(response.data);
        if(response.data.salida == "exito"){
            let salida = "";
            if(response.data.ubicacion == "no existe la zona indicada"){
                salida = "la zona indicada no esta entre nuestras opciones, podria indicarme la zona en la que vive nuevamente por favor";
            }else{
                salida = `SR(a) `+response.data['usuario']+` los planes para su ubicacion son:`;
                //planes[response.data.ubicacion];
                let plan = planes[response.data.ubicacion];
                Object.keys(plan).forEach(key => salida = salida+'\n'+key+" por "+plan[key]);
                salida = salida+"\nCual deseas contratar?";
                agent.context.delete('cambioplan');
                agent.context.set({ name: 'seleccionarplan', lifespan: 3, parameters: { nombre: response.data['usuario'],zona:response.data.ubicacion}});
            }
            
            
            agent.add(salida);
            
           
        } else{
            agent.add(`Lo sentimos, la nro de cedula `+JSON.stringify(req.body.queryResult.parameters.cedula)+` no existe en nuestra base de datos, verifica que la cedula sea del titular del servicio, quedo atento`);
            agent.context.set({ name: 'noexiste', lifespan: 2, parameters: { cedula:  JSON.stringify(req.body.queryResult.parameters.cedula)}});
        }
        

        //agent.add();
    }
    async function fechacambioplanfactura(agent){
        let today = new Date();
        let day = today.getDate();
        let month = today.getMonth()+1;
        let year = today.getFullYear();
        let diasF = new Date(year, month, 0).getDate();
        faltan = diasF - day;
        if(faltan<5){
            agent.add(`Claro que si, por favor indiqueme, en que zona se encuentra ubicado:
*Barrios Pitalito
*Zona rural Pitalito
*San Adolfo
*Villas de San Roque
*Quituro
*Zona rural Timana
*Guayabal-Suaza
*Garzon
*Potrerillos
*Higueron`);
            agent.context.set({ name: 'cambioplan', lifespan: 2, parameters: { }});
        }else{
            agent.add(`La solicitud de cambio de megas se debe realizar entre el 27 y ultimo día del mes.

            *Nota* Recuerda que la solicitud de cambio de megas, se recibe dos veces por anualidad. 😁👍`);
            agent.context.set({ name: 'cambioplan', lifespan: 0, parameters: { }});
        }

        
    
        

        //agent.add();
    }
    async function retirarcartera(agent) {
        
        //req.body.queryResult.action
        let action = req.body.queryResult.action;
        let parameters = JSON.stringify(req.body.queryResult.parameters);
        //agent.add("desde api antes");
        
        let response = await axios.get('https://internet2.fututel.com/admin/wsp/api/api?action='+action+'&data='+parameters)
        //console.log(response);
        if(response.data.salida == "exito"){
            if(response.data.dato=="no cumple"){
                agent.add(`SR(A) `+response.data['usuario']+` Hemos verificado su servicio y no cumple con las condiciones para poder aceptar la solicitud de retiro.
A continuación se muestra la información que debe de tener en cuenta para solicitar el retiro de nuestro servicio de internet: 
                
                
**Para el retiro del servicio se debe tener en cuenta lo siguiente:*
                
*-*  No tener vigente la clausula de permanencia.
                
*-* Estar al día con el servicio. (su deuda actual es de `+response.data['deuda']+`)
                
*-* Solicitar por lo menos 3 días *hábiles* (Los días hábiles no aplican a sábado, domingo ni festivo) antes del día de corte *(*Recuerde que la fecha de corte es último día del mes y que la nueva factura se genera todos los 1°  *)*.
                
*-* Realizar la entrega de los equipos para la poder dar el Paz y Salvo.
                
*NOTA:* Si presenta una solicitud con una anticipación menor, la terminación del servicio se dará en el siguiente periodo de facturación y se deberá cancelar el valor de la factura generada..`);
                agent.context.set({ name: 'nocumple', lifespan: 2, parameters: { nombre:  JSON.stringify(response.data.usuario)}});
            }else{
                agent.add(`SR(A) `+response.data['usuario']+` sentimos que deba retirarse de fututel internet, y confirmamos que cumple con las condiciones para el retiro, quisieramos que nos indique por favor el motivo de su retiro:
                
1. Problemas personales
2. Problemas económicos
3. Traslado hacia otra ciudad
4. Insatisfacción por fallas del servicio
5. Contratación  con otro operador
6. No requiere servicio de internet
7.Traslado hacia zona donde no hay cobertura
8. Traslado hacia otra zona

                `);
                agent.context.set({ name: 'sicumple', lifespan: 2, parameters: { nombre:  JSON.stringify(response.data.usuario)}});
            }
        } else{
            agent.add(`Lo sentimos, la nro de cedula `+JSON.stringify(req.body.queryResult.parameters.cedula)+` no existe en nuestra base de datos, verifica que la cedula sea del titular del servicio, quedo atento`);
            agent.context.set({ name: 'noexiste', lifespan: 2, parameters: { cedula:  JSON.stringify(req.body.queryResult.parameters.cedula)}});
        }
        

        //agent.add();
        
        
    }

    let intentMap = new Map();
    intentMap.set('cartera.suspension.v1 - more - si', suspensioncartera);
    intentMap.set('ventas.agendar.v1', barriosyveredas);
    intentMap.set('cartera.moroso.v1', deudacartera);
    intentMap.set('facturacion.dudasconlafactura.v1', consultausuario);
    intentMap.set('cartera.retirar.v1', retirarcartera);
    intentMap.set('facturacion.promesadepago.v1', promesafactura);
    intentMap.set('facturacion.cedulacambioplan.v1', getplanesfactura);
    intentMap.set('facturacion.valordefactura.v1', deudafactura);
    intentMap.set('facturacion.valormensualidad.v1', deudafacturasegundo);
    intentMap.set('facturacion.actualizaciondeplan.v1', fechacambioplanfactura);

    agent.handleRequest(intentMap);
    } catch (error) {
        console.log(error);
    }
    
    
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



 