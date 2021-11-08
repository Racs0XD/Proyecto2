import json
import os
import time
from collections import Counter
from flask import Flask, jsonify, request
from flask_cors import CORS

# jsonify facilita la lectura json
# request proporciona lo datos enviados a travez de peticiones http

# ------------------------------------------------------
# ------------------------------------------------------
# ---------------- este es el servidor -----------------
# ------------------------------------------------------
# ------------------------------------------------------
app = Flask(__name__)
CORS(app)
# -----------------------------------------------------------------------------------------------------------------------------------
# -----------------------------------------------------------------------------------------------------------------------------------
# --------------------------------------------------- Vista Admin -------------------------------------------------------------
# -----------------------------------------------------------------------------------------------------------------------------------
# -----------------------------------------------------------------------------------------------------------------------------------


# ------------------------------------------------------
# ------------------------------------------------------
# ----------------------- Metodos ----------------------
# methods=['GET'] ---> predeterminada
# methods=['POST'] ---> guarda datos
# methods=['PUT'] ---> actualiza datos
# methods=['DELETE'] ---> elimina datos
# ------------------------------------------------------
# ------------------------------------------------------

# ------------------------------------------------------
# ------------------------------------------------------
# -------------- creación de archivo json --------------
# ------------------------------------------------------
# ------------------------------------------------------
def crearJson():
    path, _ = os.path.split(os.path.abspath(__file__))
    with open(path+f'/users.json', 'w') as file:
        json.dump(users, file)


def crearJsonP():
    path, _ = os.path.split(os.path.abspath(__file__))
    with open(path+f'/publications.json', 'w') as file:
        publications['imagenes'] = imagenesP
        publications['videos'] = videosP
        json.dump(publications, file)

    with open(path+f'/publicationsTemp.json', 'w') as file:
        json.dump(temporalLikes, file)


# ------------------------------------------------------
# ------------------------------------------------------
# --------------- lectura de archivo json --------------
# ------------------------------------------------------
# ------------------------------------------------------
# --------------------------------------------------- lee los usuarios -------------------------------------------------------------
def leerJson():
    path, _ = os.path.split(os.path.abspath(__file__))
    global users
    users = []
    with open(path+f'/users.json') as file:
        users = json.load(file)

# --------------------------------------------------- Lee las Publicaciones -------------------------------------------------------------
def leerJsonP():
    path, _ = os.path.split(os.path.abspath(__file__))
    global publications, imagenesP, videosP
    imagenesP = []
    videosP = []
    publications = []

    with open(path+f'/publications.json') as file:
        publications = json.load(file)
        imagenesP = publications['imagenes']
        videosP = publications['videos']

    global temporalLikes
    temporalLikes = []
    with open(path+f'/publicationsTemp.json') as file:
        temporalLikes = json.load(file)

# ---------------------------------crea una lista nueva de publicaciones para ver videos -------------------------------------------------------------
def idVideo():
    leerJsonP()
    global listaV, listaI, listaTemp, pb, topLike, topLikeEnv
    listaV = []
    listaI = []
    listaTemp = []
    pb = []
    topLike = []
    topLikeEnv = []
    publicaciones = any
    for publicaciones in videosP:
        nUrl = publicaciones['url']
        urlSeparado = nUrl.split('watch?v=')
        url = urlSeparado[1]
        videosTem = {
            "url": url,
            "date": publicaciones['date'],
            "category": publicaciones['category']
        }
        listaV.append(videosTem)

    for publicaciones in temporalLikes:
        nUrl = publicaciones['url']
        urlSeparado = nUrl.split('watch?v=')
        comp = urlSeparado[0]
        if(comp == "https://www.youtube.com/"):
            tm1 = {
                "user": publicaciones['user'],
                "like": publicaciones['like'],
                "url": urlSeparado[1],
                "date": publicaciones['date'],
                "category": publicaciones['category']
            }
            pb.append(tm1)
        else:
            tm = {
                "user": publicaciones['user'],
                "like": publicaciones['like'],
                "url": publicaciones['url'],
                "date": publicaciones['date'],
                "category": publicaciones['category']
            }
            pb.append(tm)
    topLike = pb
    listaTemp = imagenesP + listaV

# --------------------------------------------------- Ordena la lista -------------------------------------------------------------

def bubble_sort(lista):
    for i in range(len(lista)):
        for j in range(len(lista)-1):
            if time.strptime(lista[j]['date'], "%d/%m/%Y") < time.strptime(lista[j+1]['date'], "%d/%m/%Y"):
                temp = lista[j]
                lista[j] = lista[j+1]
                lista[j+1] = temp

def bubbleLikes(lista):
    for i in range(len(lista)):
        for j in range(len(lista)-1):
            if (lista[j]['like'] < lista[j+1]['like']):
                temp = lista[j]
                lista[j] = lista[j+1]
                lista[j+1] = temp


# --------------------------------------------------- Carga Masiva-------------------------------------------------------------

@app.route('/admin/usuarios/carga', methods=['POST'])
def cargandoJson(archivoJson):
    return jsonify({"Mensaje": archivoJson})
# ------------------------------------------------------
# ------------------------------------------------------
# ---------- ruta para llamar el listado json ----------
# ------------------------------------------------------
# -----------------------------------------------------
# --------------------------------------------------- retorna la información base -------------------------------------------------------------
@app.route('/info')
def info():
    return jsonify({"Usuario":"Bienvenido a Ublog, un lugar en el que podrás compartir imagenes y videos utilizando su enlace url sin la necesidad de descargar ningun archivo, consigue ser uno de los usuarios en el top 5 con más publicaciones y aumentarás las probabilidades que una de tus publicaciones entre en el top 5 de publicaciones con más likes, disfruta del contenido compartido por otros usuarios y compite por ser el mejor estando entre los primeros 5."})

@app.route('/infoC')
def infoCreadir():
    return jsonify({"Usuario":"Este sitio web fue creado por Oscar Eduardo Morales Girón, estudiante de ingeniería en Ciencias y Sistemas de la Universidad de San Carlos de Guatemala con el numero de carné 201603028"})

# --------------------------------------------------- retorna la lista de usuarios-------------------------------------------------------------
@app.route('/admin/usuarios')
def listado():
    leerJson()
    return jsonify(users)

# --------------------------------------------------- retorna la lista de imagnes -------------------------------------------------------------
@app.route('/admin/publicacionesI')
def listadoI():
    idVideo()
    return jsonify(imagenesP)

# --------------------------------------------------- retorna la lista de videos -------------------------------------------------------------
@app.route('/admin/publicacionesV')
def listadoV():
    idVideo()
    return jsonify(listaV)

# ------------------------------------------- retorna la lista de publicaciones para blog -------------------------------------------------------------
@app.route('/blog/publico')
def listaBlog():
    idVideo()
    bubble_sort(pb)
    return jsonify(pb)

# --------------------------------------------- retorna la lista que almacena top likes -------------------------------------------------------------
@app.route('/blog/likes')
def rankLikeM():
    idVideo()    
    bubbleLikes(topLike)
    likelist = []
    rank = any
    for rank in range(len(topLike)):
        if(rank <= 4):
            likelist.append(topLike[rank])         
    return jsonify(likelist)

# --------------------------------------------retorna la lista de publicaciones para pdf -------------------------------------------------------------
@app.route('/blog/likesM')
def rankLike():
    idVideo()    
    bubbleLikes(temporalLikes)
    likelista = []
    rank = any
    for rank in range(len(temporalLikes)):
        if(rank <= 4):
            likelista.append(temporalLikes[rank])         
    return jsonify(likelista)

# -------------------------------------------- retorna las publicaciones de un usuario -------------------------------------------------------------
@app.route('/blog/usuario/<string:user_name>')
def pbUser(user_name):
    idVideo()
    global listaPublicaciones, mandar
    listaPublicaciones = []
    mandar = []
    usuario = any
    for usuario in temporalLikes:
        if (usuario['user'] == user_name):
            listaPublicaciones.append(usuario)

    for publicaciones in listaPublicaciones:
        nUrl = publicaciones['url']
        urlSeparado = nUrl.split('watch?v=')
        comp = urlSeparado[0]
        if(comp == "https://www.youtube.com/"):
            tm1 = {
                "user": publicaciones['user'],
                "like": publicaciones['like'],
                "url": urlSeparado[1],
                "date": publicaciones['date'],
                "category": publicaciones['category']
            }
            mandar.append(tm1)
        else:
            tm = {
                "user": publicaciones['user'],
                "like": publicaciones['like'],
                "url": publicaciones['url'],
                "date": publicaciones['date'],
                "category": publicaciones['category']
            }
            mandar.append(tm)
    bubble_sort(mandar)
    return jsonify(mandar)

# ----------------------------------------------- retorna a los usuarios con más likes -------------------------------------------------------------
@app.route('/top/publicaciones')
def topUsuarioPubli():
    idVideo()
    rankPubliUsiarop = []
    topTem = []
    ordenado = []
    envioTop = []
    listaFinal = []

    for publicaciones in temporalLikes:
        rankPubliUsiarop.append(publicaciones['user'])
    topTem = Counter(rankPubliUsiarop)
    ordenado = json.dumps(topTem.most_common())
    lista1 = ordenado.replace('",', '":')
    lista2 = lista1.replace('],', '},')
    lista3 = lista2.replace('[[', '[{')
    lista4 = lista3.replace(']]', '}]')
    lista5 = lista4.replace('["', '{"')
    envioTop = json.loads(lista5)
    for rank in range(len(envioTop)):
        if(rank <= 4):
            listaFinal.append(envioTop[rank])         
    return jsonify(listaFinal)

# -------------------------------------------- retorna la posición de un usuario en el top -------------------------------------------------------------
@app.route('/top/posicion/<string:user_name>')
def posUsuario(user_name):
    idVideo()   
    rankPubliUsiarop = []

    for publicaciones in temporalLikes:
        rankPubliUsiarop.append(publicaciones['user'])
    topTem = Counter(rankPubliUsiarop).most_common()
    lista = dict(topTem) 
    tuRank = list(lista).index(user_name)+1
    return jsonify(tuRank)

# ----------------------------------------------- retorna la posición del usuario -------------------------------------------------------------
@app.route('/top/publicaciones/<string:user_name>')
def publiUsuario(user_name):
    idVideo()   
    rankPubliUsiarop = []

    for publicaciones in temporalLikes:
        rankPubliUsiarop.append(publicaciones['user'])
    topTem = Counter(rankPubliUsiarop).most_common()
    lista = dict(topTem) 
    posicion = any
    contador = 0

    for key in lista.items():
        contador + 1
        if key[0] == user_name:
            posicion = key[1]
            break
    return jsonify(posicion)

# -------------------------------------------------retorna la lista para el pdf -------------------------------------------------------------
@app.route('/top/maspublicados')
def listaPubliUsuario():
    idVideo()   
    rankPubliUsiarop = []
    reportePdf = []

    for publicaciones in temporalLikes:
        rankPubliUsiarop.append(publicaciones['user'])
    topTem = Counter(rankPubliUsiarop).most_common()
    lista = dict(topTem) 
    cont = 0

    for key in lista.items():
        cont = cont+1
        if cont <= 5:
            usuarioEncontrado = [usuarios for usuarios in users if usuarios['name'] == key[0]]
            if (len(usuarioEncontrado) > 0):
                tm = {
                "name": usuarioEncontrado[0]['name'],
                "gender":usuarioEncontrado[0]['gender'],
                "username":usuarioEncontrado[0]['username'],
                "email":usuarioEncontrado[0]['email'],
                "password":usuarioEncontrado[0]['password'],
                "publications":key[1]
                }
                reportePdf.append(tm)  

                print(cont)
                
    return jsonify(reportePdf)                 

# ------------------------------------------------------
# ------------------------------------------------------
# ------- ruta para buscar un objeto específico --------
# ------------------------------------------------------
# ------------------------------------------------------

# ---------------------------------------  usuarios  ---------------------------------------
@app.route('/admin/usuarios/<string:user_name>')
def getUsuario(user_name):
    usuarioEncontrado = [usuarios for usuarios in users if usuarios['username'] == user_name]
    if (len(usuarioEncontrado) > 0):
        return jsonify(usuarioEncontrado[0])
    return jsonify({"Mensaje": "Usuario no encontrado"})

# ------------------------------------  publicaciones  -------------------------------------


@app.route('/admin/publicaciones/<string:url>')
def getPublication(url):
    idVideo()

    ruta = url.replace('[ ]', '/')
    rutaV = "https://www.youtube.com/watch?v="+url

    imagenEncontrado = [
        imagenes for imagenes in imagenesP if imagenes['url'] == ruta]
    videoEncontrado = [videos for videos in videosP if videos['url'] == rutaV]

    if (len(imagenEncontrado) > 0):
        return jsonify(imagenEncontrado[0])
    elif (len(videoEncontrado) > 0):
        return jsonify(videoEncontrado[0])
    return jsonify({"Mensaje": "Publicacion no encontrada"})





# ------------------------------------------------------
# ------------------------------------------------------
# --------------- ruta para crear objetos --------------
# ------------------------------------------------------
# ------------------------------------------------------


@app.route('/admin/usuarios', methods=['POST'])
@app.route('/registro', methods=['POST'])
def addUsuario():
    new_user = {
        "name": request.json['name'],
        "gender": request.json['gender'],
        "username": request.json['username'],
        "email": request.json['email'],
        "password": request.json['password']
    }

    usuarioEncontrado = [usuarios for usuarios in users if usuarios['username'] == request.json['username']]
    contcontra = len(request.json['password'])
    conNumeros = any(chr.isdigit() for chr in request.json['password'])
    validador = False
    validador2 = False
    for valor in request.json['password']:
        if (valor == '.' or valor == ',' or valor == '-' or valor == '_' or valor == '+' or valor == '*' or valor == '/' or valor == '#' or valor == '$' or valor == '%'or valor == '&'or valor == '/'or valor == '(' or valor == ')' or valor == '!' or valor == '¿' or valor == '¡' or valor == '?' or valor == '=' ):
            validador = True         
            break   
        else:
            validador = False

    for valor in request.json['gender']:
        if (valor == 'm' or valor == 'M' or valor == 'f' or valor == 'F' ):
            validador2 = True     
            break       
        else:
            validador2 = False


    
    if(validador2 == False):
        return jsonify({"Mensaje": "Ingrese M para masculino o F para femenino"})  
    elif(contcontra <= 7):
        return jsonify({"Mensaje": "La contraseña debe de contener al menos 8 caracteres "})
    elif(conNumeros == False or validador == False):
        return jsonify({"Mensaje": "La contraseña debe de contener al menos un numero y un símbolo"})
    elif(request.json['name'] == '' or request.json['gender'] == '' or request.json['username'] == '' or request.json['email'] == '' or request.json['password'] == ''):
        return jsonify({"Mensaje": "Hay campos vacíos"})     
    else:
        if (len(usuarioEncontrado) > 0):
            return jsonify({"Mensaje": "El nombre de usuario o correo ya fue registrado"})
        else:
            users.append(new_user)
            crearJson()
            print(request.json)
            return jsonify({"Usuario": "Usuario agreado satisfactoriamente"})


# ------------------------------------  publicaciones  -------------------------------------

@app.route('/publicar/<string:tipo>', methods=['POST'])
def crearPublicacion(tipo):
    idVideo()
    nuevaPublicaion = {
        "url": request.json['url'],
        "date": request.json['date'],
        "category": request.json['category']
    }

    blogPublicaion = {
        "user": request.json['user'],
        "like": request.json['like'],
        "url": request.json['url'],
        "date": request.json['date'],
        "category": request.json['category']
    }

    urlSeparado = request.json['url'].split('watch?v=')
    url = urlSeparado[0]

    if(request.json['url'] == '' or request.json['date'] == '' or request.json['category'] == ''):
        return jsonify({"Mensaje": "Hay campos vacíos"})
    else:
        if (tipo == 'imagen'):
            if(url == "https://www.youtube.com/"):
                return jsonify({"Mensaje": "Esto no es una imagen"})
            else:
                temporalLikes.append(blogPublicaion)
                imagenesP.append(nuevaPublicaion)
                crearJsonP()
                print(request.json)
                return jsonify({"Usuario": "Publicacion agreada satisfactoriamente"})

        elif (tipo == 'video'):
            if(url == "https://www.youtube.com/"):
                temporalLikes.append(blogPublicaion)
                videosP.append(nuevaPublicaion)
                crearJsonP()
                print(request.json)
                return jsonify({"Usuario": "Publicacion agreada satisfactoriamente"})
            else:
                return jsonify({"Mensaje": "Esto no es un video de youtube"})


# ------------------------------------------------------
# ------------------------------------------------------
# ------------ ruta para actualizar objetos ------------
# ------------------------------------------------------
# ------------------------------------------------------

@app.route('/admin/usuarios/<string:user_name>', methods=['PUT'])
def editUsuario(user_name):
    usuarioEncontrado = [usuarios for usuarios in users if usuarios['username'] == user_name]

    if(request.json['name'] == '' or request.json['gender'] == '' or request.json['username'] == '' or request.json['email'] == '' or request.json['password'] == ''):
        return jsonify({"Mensaje": "Hay campos vacíos"})

    else:
        if (len(usuarioEncontrado) > 0):
            usuarioEncontrado[0]['name'] = request.json['name']
            usuarioEncontrado[0]['gender'] = request.json['gender']
            usuarioEncontrado[0]['username'] = request.json['username']
            usuarioEncontrado[0]['email'] = request.json['email']
            usuarioEncontrado[0]['password'] = request.json['password']
            crearJson()
            return jsonify({"Usuario": "Usuario Actualizado"})
        return jsonify({"Mensaje": "Usuario no encontrado"})

# ------------------------------------  publicaciones  -------------------------------------


@app.route('/admin/publicaciones/<string:url>', methods=['PUT'])
def editPublicacion(url):
    idVideo()

    ruta = url.replace('[ ]', '/')
    rutaV = "https://www.youtube.com/watch?v="+url

    imagenEncontrado = [imagenes for imagenes in imagenesP if imagenes['url'] == ruta]
    videoEncontrado = [videos for videos in videosP if videos['url'] == rutaV]

    imagenEn = [imagenes for imagenes in temporalLikes if imagenes['url'] == ruta]
    videoEn = [videos for videos in temporalLikes if videos['url'] == rutaV]

    if(request.json['url'] == '' or request.json['date'] == '' or request.json['category'] == ''):
        return jsonify({
            "Mensaje": "Hay campos vacíos"
        })
    else:
        if (len(imagenEncontrado) > 0 and len(imagenEn) > 0):
            imagenEncontrado[0]['url'] = request.json['url']
            imagenEncontrado[0]['date'] = request.json['date']
            imagenEncontrado[0]['category'] = request.json['category']

            imagenEn[0]['url'] = request.json['url']
            imagenEn[0]['date'] = request.json['date']
            imagenEn[0]['category'] = request.json['category']
            crearJsonP()
            return jsonify({"Publicacion": "Publicacion Actualizada"})
        elif (len(videoEncontrado) > 0, len(videoEn) > 0):
            videoEncontrado[0]['url'] = request.json['url']
            videoEncontrado[0]['date'] = request.json['date']
            videoEncontrado[0]['category'] = request.json['category']

            videoEn[0]['url'] = request.json['url']
            videoEn[0]['date'] = request.json['date']
            videoEn[0]['category'] = request.json['category']
            crearJsonP()
            return jsonify({"Publicacion": "Publicacion Actualizada"})
        return jsonify({"Mensaje": "Publicacion no encontrada"})
    
    


# ------------------------------------  likes  -------------------------------------


@app.route('/blog/publicaciones/<string:url>', methods=['PUT'])
def editLikes(url):
    idVideo()

    ruta = url.replace('[ ]', '/')
    rutaV = "https://www.youtube.com/watch?v="+url

    imagenEncontrado = [imagenes for imagenes in temporalLikes if imagenes['url'] == ruta]
    videoEncontrado = [videos for videos in temporalLikes if videos['url'] == rutaV]

    if (len(imagenEncontrado) > 0):
        imagenEncontrado[0]['like'] = request.json['like']
        crearJsonP()
        return jsonify({"Usuario": "Publicacion Actualizada"})
    elif (len(videoEncontrado) > 0):
        videoEncontrado[0]['like'] = request.json['like']
        crearJsonP()
        return jsonify({"Usuario": "Publicacion Actualizada"})
    return jsonify({"Mensaje": "Publicacion no encontrada"})


# ------------------------------------------------------
# ------------------------------------------------------
# ------------- ruta para eliminar objetos -------------
# ------------------------------------------------------
# ------------------------------------------------------
# ------------------------------------  usuaris  -------------------------------------


@app.route('/admin/usuarios/<string:user_name>', methods=['DELETE'])
def deleteUsuario(user_name):
    userFound = [
        usuarios for usuarios in users if usuarios['username'] == user_name]
    if (len(userFound) > 0):
        users.remove(userFound[0])
        crearJson()
        return jsonify({
            "Usuario": "Usuario eliminado"
        })
    return jsonify({"Mensaje": "Usuario no encontrado"})

# ------------------------------------  publicaciones  -------------------------------------


@app.route('/admin/publicaciones/<string:url>', methods=['DELETE'])
def eliminarPublicacion(url):
    idVideo()

    ruta = url.replace('[ ]', '/')
    rutaV = "https://www.youtube.com/watch?v="+url

    imagenEncontrado = [
        imagenes for imagenes in imagenesP if imagenes['url'] == ruta]
    videoEncontrado = [videos for videos in videosP if videos['url'] == rutaV]

    imagenEn = [
        imagenes for imagenes in temporalLikes if imagenes['url'] == ruta]
    videoEn = [videos for videos in temporalLikes if videos['url'] == rutaV]

    if (len(imagenEncontrado) > 0):
        imagenesP.remove(imagenEncontrado[0])
        temporalLikes.remove(imagenEn[0])
        crearJsonP()
    elif (len(videoEncontrado) > 0):
        videosP.remove(videoEncontrado[0])
        temporalLikes.remove(videoEn[0])
        crearJsonP()
    return jsonify({"Mensaje": "Publicacion no encontrada"})
# -----------------------------------------------------------------------------------------------------------------------------------
# -----------------------------------------------------------------------------------------------------------------------------------
# ---------------------------------------------------    Vista Usuario   -----------------------------------------------------------------
# -----------------------------------------------------------------------------------------------------------------------------------
# -----------------------------------------------------------------------------------------------------------------------------------

# ------------------------------------------------------
# ------------------------------------------------------
# ------------- ruta para iniciar sesión ---------------
# ------------------------------------------------------
# ------------------------------------------------------


@app.route('/inicio', methods=['POST'])
def inicioUsuario():
    log_user = {
        "username": request.json['username'],
        "password": request.json['password']
    }
    usuarioEncontrado = [usuarios for usuarios in users if usuarios['username'] ==
                         request.json['username'] and usuarios['password'] == request.json['password']]

    if (len(usuarioEncontrado) > 0):
        if(request.json['username'] == 'admin' and request.json['password'] == 'admin@ipc1'):
            return jsonify({"Admin": "Bienvenido Administrador"})
        else:
            return jsonify({"Usuario": usuarioEncontrado[0]['name']})
    else:
        return jsonify({"Mensaje": "Usuario o Contraseña incorrectos"})
# ------------------------------------------------------
# ------------------------------------------------------
# ---------------------- ejecucion ---------------------
# ------------------------------------------------------
# ------------------------------------------------------


if __name__ == '__main__':
    app.run(leerJson(), debug=True, port=4000)
