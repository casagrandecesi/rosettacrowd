lingua = "it";
db = {};
storico = {};
conta = 0;
// Preso da https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function randInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}
function codiceLingua(lingua) {
  if (lingua === "Italiano" || lingua === "Italian" || lingua === "Italien")
    return "it";
  else if (lingua === "Inglese" || lingua === "English" || lingua === "Anglais")
    return "en";
  else
    return "fr";
}
function cambiaLingua(lingua) {
  if (lingua == "it") {
    setProperty("label_setup_lingua_madre", "text", "La tua lingua madre");
    setProperty("label_setup_lingua_traduzioni", "text", "Lingua per le traduzioni");
    setProperty("button_setup_avanti", "text", "Iniziamo!");
    setProperty("dropdown_setup_lingua_traduzioni", "options", ["Inglese", "Francese"]);
    setProperty("label_no_traduzioni", "text", "Al momento non ci sono più traduzioni da fare, riprova più tardi...");
    setProperty("button_riprova", "text", "Riprova");
    setProperty("button_sito", "text", "Sito");
    setProperty("button_informazioni", "text", "Dettagli");
    setProperty("button_invia", "text", "Invia");
    setProperty("button_non_so", "text", "Non saprei...");
    setProperty("label_traduzione_ok", "text", "Grazie per la traduzione!");
    setProperty("label_traduzione_ko", "text", "Non ti preoccupare, prova con un'altra traduzione!");
    setProperty("text_area_guida", "text", "Rosetta Crowd \consente a chiunque di esplorare il mondo del software opensource contribuendo allo stesso tempo al suo sviluppo! Non è necessario essere programmatori esperti: anche tradurre parole o piccole frasi è un servizio utilissimo per favorire la diffusione del software a sorgente aperto!");
    setProperty("label_classe", "text", "Classe IV A 2022-23");
    setProperty("label_setup", "text", "Configurazione");
    setProperty("label_setup_sub", "text", "Supporta il software opensource traducendo parole o brevi frasi!");
  }
  if (lingua == "en") {
    setProperty("label_setup_lingua_madre", "text", "Your mother tongue");
    setProperty("label_setup_lingua_traduzioni", "text", "Translation language");
    setProperty("button_setup_avanti", "text", "Let's begin!");
    setProperty("dropdown_setup_lingua_traduzioni", "options", ["Italian", "French"]);
    setProperty("label_no_traduzioni", "text", "There are no translations left at the moment, you may try again later...");
    setProperty("button_riprova", "text", "Try again");
    setProperty("button_sito", "text", "Website");
    setProperty("button_informazioni", "text", "Details");
    setProperty("button_invia", "text", "Send");
    setProperty("button_non_so", "text", "I don't know...");
    setProperty("label_traduzione_ok", "text", "Thank you for the translation!");
    setProperty("label_traduzione_ko", "text", "Don't worry, try with another translation!");
    setProperty("text_area_guida", "text", "Rosetta Crowd allows anyone to explore the opensource software world while contributing to its development! You don't need to be an expert software engineer: even translating words or short sentences helps the worldwide diffusion of opensource software.");
    setProperty("label_classe", "text", "Class IV A 2022-23");
    setProperty("label_setup", "text", "Setup");
    setProperty("label_setup_sub", "text", "Support opensource software by translating words or short sentences!");
  }
  if (lingua == "fr") {
    setProperty("label_setup_lingua_madre", "text", "Ta langue maternelle");
    setProperty("label_setup_lingua_traduzioni", "text", "Langue de traduction");
    setProperty("button_setup_avanti", "text", "Commençons!");
    setProperty("dropdown_setup_lingua_traduzioni", "options", ["Italien", "Anglais"]);
    setProperty("label_no_traduzioni", "text", "Il n'y a plus de traductions pour le moment, vous pouvez réessayer plus tard...");
    setProperty("button_riprova", "text", "Réessayez");
    setProperty("button_sito", "text", "Site");
    setProperty("button_informazioni", "text", "Détails");
    setProperty("button_invia", "text", "Envoyez");
    setProperty("button_non_so", "text", "Je ne sais pas...");
    setProperty("label_traduzione_ok", "text", "Merci pour la traduction !");
    setProperty("label_traduzione_ko", "text", "Ne vous inquiétez pas, essayez avec une autre traduction !");
    setProperty("text_area_guida", "text", "Rosetta Crowd permet à chacun d'explorer le monde du logiciel open source tout en contribuant à son développement ! Vous n'avez pas besoin d'être un ingénieur logiciel expert : même la traduction de mots ou de petites phrases aide à la diffusion mondiale des logiciels open source.");
    setProperty("label_classe", "text", "Classe IV A 2022-23");
    setProperty("label_setup", "text", "Configuration");
    setProperty("label_setup_sub", "text", "Soutenez les logiciels open source en traduisant des mots ou des petites phrases !");
  }
}
function scegliTraduzione() {
  var trad = false
  var conta = 0;
  var key = "";
  while (trad === false && conta < 100) {
    var progetto = randInt(0, db.length);
    var trans = db[progetto].translations[lang1];
    key = lang1;
    if (typeof trans === "undefined") {
      trans = db[progetto].translations[lang2];
      key = lang2;
    }
    if (typeof trans !== "undefined") {
      var parola = randInt(0, trans.length);
      var chiave = progetto + "-" + parola;
      if (typeof storico[chiave] === "undefined") {
        var v = key.split("-");
        trad = {
         progetto: db[progetto].project,
         sito: db[progetto].homepage,
         logo: db[progetto].logo,
         dettagli: db[progetto].description[lang_madre],
         parola: trans[parola],
         lang1: v[0],
         lang2: v[1]
        }
        storico[chiave] = true;
      }
    }
    ++conta;
  }
  return trad;
}
function traduci() {
  traduzione = scegliTraduzione();
  if (traduzione !== false) {
    setProperty("text_input_traduzione", "background-color", "rgb(167, 201, 236)");
    //setProperty("image_logo", "image", traduzione.logo);
    //setProperty("image_logo_dettagli", "image", traduzione.logo);
    $("#image_logo").attr("src", traduzione.logo).css("display", "block");
    $("#image_logo_dettagli").attr("src", traduzione.logo).css("display", "block");
    setProperty("text_area_dettagli", "text", traduzione.dettagli);
    setProperty("label_da_tradurre", "text", traduzione.parola);
    setProperty("label_lingua_madre", "text", traduzione.lang1.toUpperCase());
    setProperty("label_lingua_trad", "text", traduzione.lang2.toUpperCase());
    setProperty("text_input_traduzione", "text", "");
    setScreen("screen_traduci");
  } else {
    setScreen("screen_no_traduzioni");
  }
}
onEvent("button_setup_avanti", "click", function( ) {
  lang_madre_str = getText("dropdown_setup_lingua_madre");
  lang_trad_str = getText("dropdown_setup_lingua_traduzioni");
  var m = codiceLingua(lang_madre_str);
  var t = codiceLingua(lang_trad_str);
  lang_madre = m;
  lang1 = m + "-" + t;
  lang2 = t + "-" + m;
  traduci();
});
onEvent("dropdown_setup_lingua_madre", "change", function( ) {
  lingua = codiceLingua(getText("dropdown_setup_lingua_madre"));
  cambiaLingua(lingua);
});
onEvent("button_riprova", "click", function( ) {
  traduci();
});
onEvent("button_invia", "click", function ( ) {
  var traduzione = getProperty("text_input_traduzione", "value");
  if (traduzione.trim().length === 0) {
    setProperty("text_input_traduzione", "background-color", "rgb(251, 220, 220)");
    playSound("assets/category_alerts/airy_bell_notification.mp3");
    return;
  }
  ++conta;
  setProperty("screen_traduzione_ok", "image", "assets/OK-" + (conta % 2) + ".png");
  setScreen("screen_traduzione_ok");
  playSound("assets/category_achievements/peaceful_win_2.mp3")
  setTimeout(traduci, 2500);
});
onEvent("button_non_so", "click", function ( ) {
  ++conta;
  setProperty("screen_traduzione_ko", "image", "assets/KO-" + (conta % 2) + ".png");
  setScreen("screen_traduzione_ko");
  playSound("assets/category_points/negative_point_counter_2.mp3")
  setTimeout(traduci, 2500);
});
onEvent("button_sito", "click", function ( ) {
  open(traduzione.sito);
});
onEvent("button_informazioni", "click", function ( ) {
  setScreen("screen_dettagli");
});
onEvent("button_ok_dettagli", "click", function ( ) {
  setScreen("screen_traduci");
});
onEvent("button_guida_1", "click", function ( ) {
  last_screen = "screen_setup";
  setScreen("screen_guida");
});
onEvent("button_guida_2", "click", function ( ) {
  last_screen = "screen_traduci";
  setScreen("screen_guida");
});
onEvent("button_ok_guida", "click", function ( ) {
  setScreen(last_screen);
});
onEvent("button_riconfigura", "click", function ( ) {
  setScreen("screen_setup");
});
cambiaLingua("it");
startWebRequest("https://raw.githubusercontent.com/casagrandecesi/rosettacrowd/main/samples/1.json?x=3", function(status, type, content) {
  db = JSON.parse(content);
  setTimeout(function() {
    setScreen("screen_setup");
  }, 4000);
});
