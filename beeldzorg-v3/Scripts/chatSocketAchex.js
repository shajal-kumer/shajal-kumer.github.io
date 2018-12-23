var htmlDOM = {
  idChat: "Elchat",
  ws: null,
  Room: null,
  pass: "1",
  lblTitulChat: " Nettie Beeldzorg Chat",
  lblCampoEntrada: "Enter",
  lblEnviar: "Send",
  textoAyuda: "Nettie Beeldzorg",
  Nombre: "Anónimo",

  urlImg: "http://placehold.it/50/55C1E7/55C1E7",
  btnEntrar: "btnEntrar",
  btnEnviar: "btnEnviar",
  lblBtnEnviar: "Stuur",
  lblTxtEntrar: "txtEntrar",
  lblTxtEnviar: "txtMensaje",
  lblBtnEntrar: "Enter",
  idDialogo: "DialogoEntrada",
  classChat: "",
  idOnline: "ListaOnline",
  lblUsuariosOnline: "Users joined",
  lblEntradaNombre: "Name:",
  panelColor: "success"
};

htmlDOM.Nombre = document.getElementById("tempname").innerHTML;

setTimeout(() => {
  function CrearChat() {
    $("#" + htmlDOM.idChat).append(
      '<div class="' +
        htmlDOM.classChat +
        '"><div class="panel panel-' +
        htmlDOM.panelColor +
        '"><div class="panel-heading"><span class="glyphicon glyphicon-comment"></span>' +
        htmlDOM.lblTitulChat +
        " : " +
        htmlDOM.Nombre +
        '</div><div class="panel-body"><ul class="chatpluginchat"></ul></div><div class="panel-footer"><div class="input-group"><input id="' +
        htmlDOM.lblTxtEnviar +
        '" type="text" class="form-control input-sm" placeholder="' +
        htmlDOM.lblCampoEntrada +
        '" /><span class="input-group-btn"><button  class="btn btn-warning btn-sm" id="' +
        htmlDOM.btnEnviar +
        '">' +
        htmlDOM.lblEnviar +
        '</button></span></div></div></div></div><li class="left clearfix itemtemplate" style="display:none"><span class="chat-img pull-left"><img src="' +
        htmlDOM.urlImg +
        '" alt="User Avatar" class="img-circle" id="Foto"/></span><div class="chat-body clearfix"><div class="header"><strong class="primary-font" id="Nombre">Nombre</strong><small class="pull-right text-muted"><span class="glyphicon glyphicon-asterisk"></span><span id="Tiempo">12 mins ago</span></small></div> <p id="Contenido">Contenido</p></div></li>'
    );
  }
  CrearChat();
}, 1000);

function aa(token) {
  htmlDOM.Room = token;

  function IniciarConexion() {
    var conex =
      '{"setID":"' + htmlDOM.Room + '","passwd":"' + htmlDOM.pass + '"}';
    htmlDOM.ws = new WebSocket("wss://ws.achex.ca/");

    htmlDOM.ws.onopen = function() {
      htmlDOM.ws.send(conex);
    };
    htmlDOM.ws.onmessage = function(Mensajes) {
      var MensajesObtenidos = Mensajes.data;
      var obj = jQuery.parseJSON(MensajesObtenidos);
      console.log(obj);
      AgregarItem(obj);

      if (obj.sID != null) {
        if ($("#" + obj.sID).length == 0) {
          $("#listaOnline").append(
            '<li class="list-group-item" id="' +
              obj.sID +
              '"><span class="label label-success">&#9679;</span> - ' +
              obj.Nombre +
              "</li>"
          );
        }
      }
    };
    htmlDOM.ws.onclose = function() {
      alert("connection closed");
    };
  }

  IniciarConexion();

  $("#" + htmlDOM.lblTxtEnviar).keyup(function(e) {
    if (e.keyCode == 13) {
      EnviarMensaje();
    }
  });

  $("#" + htmlDOM.btnEnviar).click(function() {
    EnviarMensaje();
  });

  function EnviarMensaje() {
    htmlDOM.ws.send(
      '{"to":"' +
        htmlDOM.Room +
        '","Nombre":"' +
        htmlDOM.Nombre +
        '","Contenido":"' +
        $("#" + htmlDOM.lblTxtEnviar).val() +
        '"}'
    );
    $("#" + htmlDOM.lblTxtEnviar).val("");
  }

  function AgregarItem(Obj) {
    if (Obj.Contenido != null && Obj.Nombre != null) {
      if (document.getElementById("txtMensaje").value != Obj.Nombre)
        if (!$(".chat__box-field").hasClass("open")) {
          $(".chat__box--btn").addClass("active");
        }

      $(".itemtemplate")
        .clone()
        .appendTo(".chatpluginchat");
      $(".chatpluginchat .itemtemplate").show(10);
      $(".chatpluginchat .itemtemplate #Nombre").html(Obj.Nombre);
      $(".chatpluginchat .itemtemplate #Contenido").html(Obj.Contenido);

      var formattedDate = new Date();
      var d = formattedDate.getUTCDate();
      var m = formattedDate.getMonth();
      var y = formattedDate.getFullYear();
      var h = formattedDate.getHours();
      var min = formattedDate.getMinutes();

      // Fecha = d + "/" + m + "/" + y + " " + h + ":" + min;
      var Fecha = h + ":" + min;

      $(".chatpluginchat .itemtemplate #Tiempo").html(Fecha);
      $(".chatpluginchat .itemtemplate").removeClass("itemtemplate");
    }
  }
}

//Get LocalStorage
function getLocalStorage(key) {
  var value = localStorage.getItem(key);
  return null == value ? "" : value;
}

//Set LocalStorage
function setLocalStorage(key, value) {
  localStorage.setItem(key, null == value ? "" : value);
}

function startup(conversationtoken) {
  setLocalStorage("Doctorconversationtoken", conversationtoken);
  aa(conversationtoken);
}
