#Programa desenvolupat per el TFG


#Llibreries necessaries
import requests
import time
import json
from datetime import datetime
import os
from hashlib import md5
import base64
from Crypto.Cipher import AES
import pythonencrypt as pe


'''
Funcions necessàries per encriptar la informacio
'''
BLOCK_SIZE = 16
#key = 'My Super Secret Password'
key = 'TFG'

def enviarDades (url, dades):
    print("Enviant dades al servidor...")
    enviar_api = []
    enviar_api.append({
        'full': dades,
        })
    #S'envia un JSON sencer de dades
    respuesta = requests.post(url, json=dades)
    print("La respuesta del servidor es:")
    print(respuesta)

#Enviament de dades individuals al servidor amb la API
def enviarUnaInstancia(url,dades):
    print("Enviant dades al servidor...")
    #S'envia instancia per instancia
    respuesta = requests.post(url, json=dades)
    print("La respuesta del servidor es:")
    print(respuesta)

#Enviament de l'estat del kit de sensors
def enviarEstat(url, nom):
    print("Enviant estat al servidor...")
    hora_act = datetime.now().time()
    hoy = datetime.now()
    hoy_str = hoy.strftime('%Y/%m/%d')
    hora_str = hora_act.strftime('%H:%M:%S')
    print (url)


    enviar_estat=({
            'Lat': '41.13305619083466',
            'Lon': '1.2429567426459924',
            'Data': hoy_str,
            'Hora': hora_str,
            'Nom' : nom
                })

    with open('data.json', 'w') as file:
        json.dump(enviar_estat, file, indent=4)

    with open('data.json','rb') as f:
        info = f.read()

    output = pe._encrypt(key,info.decode('utf-8'))
    print('\nPython encrypt:\n', output)

    decrypt = pe._decrypt(key,output)
    print('\nPython decrypt:\n', decrypt)


    myobj = {'ESTAT': output}
    respuesta = requests.post(url, json=myobj)
    print(respuesta)


#Enviament de l'estat del kit de sensors
def actualitzarEstat(url, nom):
    print("Enviant estat al servidor...")
    hora_act = datetime.now().time()
    hoy = datetime.now()
    hoy_str = hoy.strftime('%Y-%m-%d')
    hora_str = hora_act.strftime('%H:%M:%S')
    print (url)

    enviar_estat=({
            'Lat': '41.13305619083466',
            'Lon': '1.2429567426459924',
            'Data': hoy_str,
            'Hora': hora_str,
            'Nom' : nom
                })
    print (enviar_estat)
    respuesta = requests.post(url, json=enviar_estat)
    print(respuesta)

if __name__ == '__main__':
    #Variables constants
    URL = "http://192.168.1.79:3000/api/enviar"
    URL_ESTAT = "http://192.168.1.79:3000/api/up"
    URL_SETUP = "http://192.168.1.79:3000/api/setup/encriptat"
    NOM = "Kit Campus Sescelades"

    enviarEstat(URL_SETUP, NOM)
    data=[]
    #Cos del programa per a fer les funcions necessaries:
    while True:

        try:
            #Variables que s'han d'inicialitzar cada vegada:
            hora_act = datetime.now().time()
            hoy = datetime.now()
            temperature_c = 25
            humidity = 56
            hoy_str = hoy.strftime('%d/%m/%Y')
            hora_str = hora_act.strftime('%H:%M:%S')

            enviar_api=({
                'Temperatura': temperature_c,
                'Humitat': humidity,
                'Data': hoy_str,
                'Hora': hora_str
                })
            enviarUnaInstancia(URL, enviar_api)

            actualitzarEstat(URL_ESTAT, NOM)


        except RuntimeError as error:
            # Errors happen fairly often, DHT's are hard to read, just keep going
            print(error.args[0])
            time.sleep(2.0)
            continue
        except Exception as error:
            #Error d'execució dins del programa.
            raise error
        time.sleep(60)
