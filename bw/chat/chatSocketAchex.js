$.fn.extend({
  ChatSocket: function(opciones) {
    var ChatSocket = this;

    var setrooms = getUrlVars()["room"];

    var idChat = $(ChatSocket).attr("id");
    defaults = {
      ws,
      Room: setrooms,
      pass: "1",
      lblTitulChat: " Nettie Beeldzorg Chat",
      lblCampoEntrada: "bericht",
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

    var opciones = $.extend({}, defaults, opciones);

    var ws;
    var Room = opciones.Room;
    var pass = opciones.pass;
    var lblTitulChat = opciones.lblTitulChat;
    var lblCampoEntrada = opciones.lblCampoEntrada;
    var lblEnviar = opciones.lblBtnEnviar;
    var textoAyuda = opciones.textoAyuda;
    var Nombre = opciones.Nombre;

    var urlImg = opciones.urlImg;
    var btnEntrar = opciones.btnEntrar;
    var btnEnviar = opciones.btnEnviar;
    var lblBtnEnviar = opciones.lblBtnEnviar;
    var lblTxtEntrar = opciones.lblTxtEntrar;
    var lblTxtEnviar = opciones.lblTxtEnviar;
    var lblBtnEntrar = opciones.lblBtnEntrar;
    var idDialogo = opciones.idDialogo;
    var classChat = opciones.classChat;
    var idOnline = opciones.idOnline;
    var lblUsuariosOnline = opciones.lblUsuariosOnline;
    var lblEntradaNombre = opciones.lblEntradaNombre;
    var panelColor = opciones.panelColor;
    if ($("#" + idOnline).length == 0) {
      idOnline = idChat + "listaOnline";
      $("#" + idChat).append('<br/><div id="' + idOnline + '"></div>');
    }

    function IniciarConexion() {
      conex = '{"setID":"' + Room + '","passwd":"' + pass + '"}';
      ws = new WebSocket("wss://echo.websocket.org:443");

      ws.onopen = function() {
        ws.send(conex);
      };
      ws.onmessage = function(Mensajes) {
        var MensajesObtenidos = Mensajes.data;
        var obj = jQuery.parseJSON(MensajesObtenidos);
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
      ws.onclose = function() {
        alert("connection closed");
      };
    }
    IniciarConexion();
    function iniciarChat() {
      Nombre = $("#" + lblTxtEntrar).val();
      $("#" + idDialogo).hide();
      $("#" + idOnline).show();

      CrearChat();
      UsuarioOnline();
      getOnline();
    }

    function CrearEntrada() {
      $("#" + idChat).append(
        '<div id="' +
          idDialogo +
          '" class="' +
          classChat +
          '" id="InputNombre"><div class="panel-footer" style="margin-top:100px;"><div class="input-group"><input id="' +
          lblTxtEntrar +
          '" type="text" class="form-control input-sm" placeholder="' +
          lblEntradaNombre +
          '"><span class="input-group-btn"><button id="' +
          btnEntrar +
          '" class="btn btn-success btn-sm" >' +
          lblBtnEntrar +
          "</button></span></div></div></div>"
      );
      $("#" + idOnline).append(
        ' <div class="panel panel-' +
          panelColor +
          '"><div class="panel-heading"><span class="glyphicon glyphicon-user"></span> ' +
          lblUsuariosOnline +
          '</div><div class="panel-body"><ul class="list-group" id="listaOnline"></ul></div><div class="panel-footer"><div class="input-group"></span></div></div></div>'
      );
      $("#" + lblTxtEntrar).keyup(function(e) {
        if (e.keyCode == 13) {
          iniciarChat();
        }
      });
      $("#" + btnEntrar).click(function() {
        iniciarChat();
      });
    }

    function CrearChat() {
      $("#" + idChat).append(
        '<div class="' +
          classChat +
          '"><div class="panel panel-' +
          panelColor +
          '"><div class="panel-heading"><span class="glyphicon glyphicon-comment"></span>' +
          lblTitulChat +
          " : " +
          Nombre +
          '</div><div class="panel-body"><ul class="chatpluginchat"></ul></div><div class="panel-footer"><div class="input-group"><input id="' +
          lblTxtEnviar +
          '" type="text" class="form-control input-sm" placeholder="' +
          lblCampoEntrada +
          '" /><span class="input-group-btn"><button  class="btn btn-warning btn-sm" id="' +
          btnEnviar +
          '">' +
          lblEnviar +
          '</button></span></div></div></div></div><li class="left clearfix itemtemplate" style="display:none"><span class="chat-img pull-left"><img src="' +
          urlImg +
          '" alt="User Avatar" class="img-circle" id="Foto"/></span><div class="chat-body clearfix"><div class="header"><strong class="primary-font" id="Nombre">Nombre</strong><small class="pull-right text-muted"><span class="glyphicon glyphicon-asterisk"></span><span id="Tiempo">12 mins ago</span></small></div> <p id="Contenido">Contenido</p></div></li>'
      );

      $("#" + lblTxtEnviar).keyup(function(e) {
        if (e.keyCode == 13) {
          EnviarMensaje();
        }
      });
      $("#" + btnEnviar).click(function() {
        EnviarMensaje();
      });
    }

    function EnviarMensaje() {
      ws.send(
        '{"to":"' +
          Room +
          '","Nombre":"' +
          Nombre +
          '","Contenido":"' +
          $("#" + lblTxtEnviar).val() +
          '"}'
      );
      $("#" + lblTxtEnviar).val("");
    }
    function UsuarioOnline() {
      ws.send('{"to":"' + Room + '","Nombre":"' + Nombre + '"}');
    }
    function AgregarItem(Obj) {
      if (Obj.Contenido != null && Obj.Nombre != null) {
        if (document.getElementById("txtEntrar").value != Obj.Nombre)
          console.log("new chat message");
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
        Fecha = h + ":" + min;

        $(".chatpluginchat .itemtemplate #Tiempo").html(Fecha);
        $(".chatpluginchat .itemtemplate").removeClass("itemtemplate");
      }
    }
    function getOnline() {
      setInterval(UsuarioOnline, 3000);
    }

    function popup() {}

    CrearEntrada();
    // Fin
  }
});

function startup() {
  var name = getUrlVars()["name"];
  document.getElementById("txtEntrar").value = name;
  document.getElementById("btnEntrar").click();
}
function getUrlVars() {
  var vars = [],
    hash;
  var hashes = window.location.href
    .slice(window.location.href.indexOf("?") + 1)
    .split("&");
  for (var i = 0; i < hashes.length; i++) {
    hash = hashes[i].split("=");
    vars.push(hash[0]);
    vars[hash[0]] = hash[1];
  }
  return vars;
}
