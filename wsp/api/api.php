<?php
    require "MysqliDb.php";
    if(count($_GET)>0){
        $action = $_GET["action"];
        $data = json_decode($_GET["data"]);
        if($action=="retiro.cedula.v1"){
            $db->where("cedula",$data->cedula);
            $iduser = $db->getValue("usuarios","id");
            $db->where("cedula",$data->cedula);
            $nombre = $db->getValue("usuarios","nombre");
            if(is_null($iduser)){
                $salida = ["salida"=>"error","dato"=>"no existe el usuario"];
                echo json_encode($salida);
                exit;
            }
            $deuda = $db->rawQuery("SELECT COALESCE(sum(total),0) as total FROM facturas where idcliente=? and estado='No pagado'", [$iduser]);
            $saldo = $db->rawQuery("SELECT COALESCE(SUM(monto),0) as total FROM saldos where iduser=? and estado='no cobrado' GROUP BY iduser", [$iduser]);
            $total = $deuda[0]["total"]+$saldo[0]["total"];
            if($total>5000){
                $salida = ["salida"=>"exito","dato"=>"no cumple","usuario"=>$nombre,"deuda"=>$total];
                echo json_encode($salida);
                exit;
            } else{
                $salida = ["salida"=>"exito","dato"=>"si cumple","usuario"=>$nombre];
                echo json_encode($salida);
                exit;
            }
        }else{
            if($action=="deuda.factura"){
                $db->where("cedula",$data->cedula);
                $iduser = $db->getValue("usuarios","id");
                $db->where("cedula",$data->cedula);
                $nombre = $db->getValue("usuarios","nombre");
                if(is_null($iduser)){
                    $salida = ["salida"=>"error","dato"=>"no existe el usuario"];
                    echo json_encode($salida);
                    exit;
                }
                $deuda = $db->rawQuery("SELECT COALESCE(sum(total),0) as total FROM facturas where idcliente=? and estado='No pagado'", [$iduser]);
                $saldo = $db->rawQuery("SELECT COALESCE(SUM(monto),0) as total FROM saldos where iduser=? and estado='no cobrado' GROUP BY iduser", [$iduser]);
                if(isset($deuda[0])){
                    $total = $deuda[0]["total"];
                    if(isset($saldo[0])){
                        $total+=$saldo[0]["total"];
                    }
                }
                
               
                $salida = ["salida"=>"exito","usuario"=>$nombre,"deuda"=>$total];
                echo json_encode($salida);
                exit;
                
            }else{
                if($action=="mostrar.planes"){
                    $lugar = $data->ubicacion;
                    $ubicaciones = [ "rural Pitalito","barrio Pitalito","san Adolfo", "villas de sanroque","timana","quituro","guayabal","garzon","potrerillo","criollo","higueron"];
                    $salidas = ["ruralPitalito","barrioPitalito","sanAdolfo","villasRoque","timana","quituro","guayabal","garzon","potrerillo","criollo","higueron"];
                    $valor = 0;
                    $entro = false;
                    $i= 0;
                    foreach($ubicaciones as $ubicacion){

                        similar_text($ubicacion, $lugar, $porcentaje);
                        if($porcentaje>=70){
                            $entro = true;
                            $valor = $i;
                            break;
                        }
                        $i++;
                    }
                    if($valor == 0){
                        similar_text($data->tipo, "antena", $porcentaje2);
                        if ($porcentaje2 >=50) {
                            $ubicacion = $salidas[0]."Antena";
                        }
                    }else{
                        $ubicacion = $salidas[$valor];
                    }
                    

                    $db->where("cedula",$data->cedula);
                    $iduser = $db->getValue("usuarios","id");
                    $db->where("cedula",$data->cedula);
                    $nombre = $db->getValue("usuarios","nombre");
                    if(is_null($iduser)){
                        $salida = ["salida"=>"error","dato"=>"no existe el usuario"];
                        echo json_encode($salida);
                        exit;
                    }
                    if(!$entro){
                        $salida = ["salida"=>"exito","ubicacion"=>"no existe la zona indicada"];
                        echo json_encode($salida);
                        exit;
                    }
                    $salida = ["salida"=>"exito","usuario"=>$nombre,"ubicacion"=>$ubicacion];
                    echo json_encode($salida);
                }else{
                    
                    if($action=="consulta.usuario"){
                        $db->where("cedula",$data->cedula);
                        $user = $db->getOne("usuarios");
                        if(count($user)<2){
                            $salida = ["salida"=>"error","dato"=>"no existe el usuario"];
                            echo json_encode($salida);
                            exit;
                        }else{
                            $salida = ["salida"=>"exito","codigo"=>$user["codigo"],"cedula"=>$user["cedula"],"usuario"=>$user["nombre"]];
                            echo json_encode($salida);
                            exit;
                        }
                        
                        
                        
                    }
                    if($action == "verbarrios.ventas"){
                        $barrios= [
                            "palmarito"  ,
                            "las americas"  ,
                            "los pinos"  ,
                            "cristo rey"  ,
                            "altos de magdalena"  ,
                            "calamo"  ,
                            "villa matilde"  ,
                            "simon bolivar"  ,
                            "villa del prado"  ,
                            "lara bonilla"  ,
                            "san mateo"  ,
                            "las acacias"  ,
                            "cristales"  ,
                            "barrio calamo"  ,
                            "brisas del guarapas"  ,
                            "santa monica"  ,
                            "tequendama"  ,
                            "divino niño"  ,
                            "ciudad de laboyos"  ,
                            "antonio naranjo"  ,
                            "cambulos"  ,
                            "barrio los andes"  ,
                            "los lagos"  ,
                            "barrio paraiso"  ,
                            "los rosales"  ,
                            "villa catalina"  ,
                            "leon trece"  ,
                            "los nogales"  ,
                            "venecia"  ,
                            "barrio la pradera"  ,
                            "bosques de la riviera"  ,
                            "centro"  ,
                            "agua blanca"  ,
                            "sucre"  ,
                            "trinidad"  ,
                            "quinche"  ,
                            "san antonio"  ,
                            "los guaduales"  ,
                            "la virginia"  ,
                            "aldea la libertad"  ,
                            "solarte"  ,
                            "siglo 21",
                            "villa cafe" 
                        ];
                        $veredas= [
                            "Holanda"  ,
                            "Cerritos"  ,
                            "cabullal del cedro"  ,
                            "cabeceras"  ,
                            "guandinosa"  ,
                            "normandia"  ,
                            "el cabullo"  ,
                            "versalles"  ,
                            "albania"  ,
                            "la castilla"  ,
                            "palmar de crillos"  ,
                            "ingali"  ,
                            "criollo"  ,
                            "el recuerdo"  ,
                            "palmeras"  ,
                            "libano"  ,
                            "jardin"  ,
                            "contador"  ,
                            "rincon de contador"  ,
                            "hacienda de laboyos"  ,
                            "san francisco"  ,
                            "santa ines"  ,
                            "llano grande"  ,
                            "camberos"  ,
                            "el maco"  ,
                            "el limon"  ,
                            "regueros"  ,
                            "la sibila"  ,
                            "raicitas"  ,
                            "acacos"  ,
                            "anserma"  ,
                            "nueva zelanda"  ,
                            "corinto"  ,
                            "la coneca"  ,
                            "la parada"  ,
                            "la reserva"  ,
                            "guamal"  ,
                            "aguanegra"  ,
                            "charco del oso"  ,
                            "cabaña de vencecia"  ,
                            "san luis"  ,
                            "mortiñal"  ,
                            "honda porvenir"  ,
                            "paraiso"  ,
                            "vereda paraiso"  ,
                            "charguayaco"  ,
                            "macal"  ,
                            "santa rita"  ,
                            "higueron"  ,
                            "terminal"  ,
                            "chillurco"  ,
                            "filo de chillurco"  ,
                            "meseta"  ,
                            "barzalosa"  ,
                            "montebonito"  ,
                            "rosal"  ,
                            "la paz"  ,
                            "vrd pradera"  ,
                            "vrd calamo"  ,
                            "aguadas"  ,
                            "danuvio"  ,
                            "pedregal"  ,
                            "alto los pinos"  ,
                            "las granjas"  ,
                            "risaralda"  ,
                            "lucitania"  ,
                            "santa rosa"  ,
                            "vrd los andes"  ,
                            "cafarnaum"  ,
                            "el diviso"  ,
                            "vista hermosa",
                            "quituro",
                            "la pampa",
                            "porvenir",
                            "cascajal",
                            "cinco veredas",
                            "pantanos" 
                        ];
                        if(in_array($data->ubicacion,$barrios)){
                            echo json_encode(["salida"=>"exito","data"=>"barrio","mensaje"=>"
+++OFERTA PROMOCIONAL INTERNET BANDA ANCHA FUTUTEL SOLO PARA EL BARRIO ".$data->ubicacion." DE PITALITO++++++++++++

NAVEGACIÓN. Los Gigas de navegación son SIN Límite. Puede gastar los Gigas que quieras sin ver disminuida la velocidad. Es Banda Ancha. Pueden estar conectados todo el día y noche y el internet No se gasta.

+++++++++++++Precios por Velocidades++++++++++++++

2 Megas:  $34 900

3 Megas: $39 900

5 Megas: $44 900

6 Megas: $49 900


+++++++TODOS Los Planes INCLUYEN+++++++++++++

Router con WiFi con propia clave.

Navegación SIN Límites. Consumes todos los Gigas que desees por el mismo precio.

+++++++++++GARANTÍA DE SATISFACCIÓN+++++++++++++++++

Pruebas antes de Pagar. Te damos 3 días de Prueba/Demostración Gratis para que te des cuenta de la Excelente Calidad del Servicio.

+++++++++++FORMA DE PAGO+++++++++++++++++

Es pago de mes Adelantado. El primer pago se realiza entre el 4to o 5to día después de la instalación. Pagas solo los días restantes hasta fin de mes.

Las siguientes facturaciones se generá los primeros de cada mes con plazo de pago los primeros 10 días calendario de cada mes.

+++++++++++++++Suscripción++++++++++++++++

NO tiene costo de Suscripción ni instalación. Por ello hay una pequeña CLÁUSULA de Permanencia de solo 3 meses.

+++++++++++++Cobertura+++++++++++++++

Sujeto a Disponibilidad.

++++++++++++Contacto++++++++++++++

Celular/Whatsapp: 318 726 7705

PBX - Bogotá: 031 220 5225 

https://facebook.com/phone2call

++++++++++++Cómo Pedir El servicio++++++++++++++++++++++++++++

Si te interesa contratar el servicio, envíanos estos datos: Nombre, Cédula, Dirección, 2 N° Celular, para que te agendemos la instalación. El día de la instalación se requiere una copia de la cédula de ciudadanía del titular.
                            {markunread}{pause}"]);
                        }else{
                            if(in_array($data->ubicacion,$veredas)){
                                echo json_encode(["salida"=>"exito","data"=>"vereda","mensaje"=>"🌎 Para la vereda ".$data->ubicacion." es necesario validar cobertura, para ello puedes enviarnos la ubicación, desde Whatsapp, ubicación actual para confirmar cobertura. 📌Gracias.{markunread}{pause}"]);
                            }else{
                                echo json_encode(["salida"=>"error","mensaje"=>"el lugar indicado es incorrecto o no tenemos covertura en la zona especificada{markunread}{pause}"]);
                            }
                        }

                    }
                    
                }
            }
        }
    }
?>