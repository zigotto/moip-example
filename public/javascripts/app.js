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

  moipSuccess = function(data) {
    var div = '<p>Sua transação foi processada pelo Moip Pagamentos S/A. <br /> A sua transação está "'+ data.Status +'" e o código Moip é "'+ data.CodigoMoIP +'". <br /> Caso tenha alguma dúvida referente a transação, entre em contato com o Moip.';
    $('#moip_response').html(div);
  };

  moipError = function(data) {
    var div = 'Algo de errado aconteceu: '+ data.Mensagem +'';
    $('#moip_response').html(div);
  };

  $('a.confirm').live('click', function(event) {
    event.preventDefault();
    processCC();
  });

  $('#userInformation').validate({
    submitHandler: function(form) {
      var data = $(':input', form).serialize();
      $(':submit', form).val('Aguarde...');

      $.post(form.action, data, function(response) {
        $('#check').html(response);
        $(form).hide();
      });
    }
  });

});
