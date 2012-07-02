$(function() {
  window.log = function(message) {
    console.log(message);
  };

  processCC = function() {
    var settings = {
      "Forma": "CartaoCredito",
      "Instituicao": "Visa",
      "Parcelas": "1",
      "Recebimento": "AVista",
      "CartaoCredito": {
        "Numero": "4073020000000002",
        "Expiracao": "12/15",
        "CodigoSeguranca": "123",
        "Portador": {
          "Nome": "Jésus Lopes",
          "DataNascimento": "30/12/1987",
          "Telefone": "(11)3165-4020",
          "Identidade": "222.222.222-22"
        }
      }
    }
    MoipWidget(settings);
  };

  moipSuccess = function(data){
    log(data);
  };

  moipError = function(data) {
    log(data);
  };

  $('a.confirm').live('click', function() {
    processCC();
  });

  $('#userInformation').validate();

});
