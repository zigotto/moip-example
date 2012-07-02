# encoding: utf-8

configure do
  enable :sessions
  set :url, "https://desenvolvedor.moip.com.br/sandbox/ws/alpha/EnviarInstrucao/Unica"
end

configure :development do
  raise "No keys.yml was found" unless File.exist?(keys_file = "config/keys.yml")
  $keys = YAML.load(File.read(keys_file))
  $token, $key = $keys['token'], $keys['key']
end

configure :production do
  $token, $key = ENV['TOKEN'], ENV['KEY']
end

class Client
  include HTTParty
  basic_auth $token, $key
end

get "/" do
  haml :index
end

post "/check" do
  builder = Nokogiri::XML::Builder.new(:encoding => 'UTF-8') do |xml|
    xml.EnviarInstrucao {
      xml.InstrucaoUnica(:TipoValidacao => "Transparente") {
        xml.Razao "Pagamento para loja Exemplo"
        xml.Valores {
          xml.Valor(:moeda => "BRL") { xml.text(params[:check][:value]) }
        }
        xml.IdProprio Time.now.to_i
        xml.Pagador {
          xml.Nome params[:check][:name]
          xml.Email params[:check][:email]
          xml.IdPagador params[:check][:email]
          xml.EnderecoCobranca {
            xml.Logradouro params[:check][:address]
            xml.Numero params[:check][:number]
            xml.Complemento params[:check][:complement]
            xml.Bairro params[:check][:district]
            xml.Cidade params[:check][:city]
            xml.Estado params[:check][:state]
            xml.Pais "BRA"
            xml.CEP params[:check][:zip_code]
            xml.TelefoneFixo params[:check][:phone]
          }
        }
      }
    }
  end
  @xml = builder.to_xml

  response = Client.post(options.url, :body => @xml)
  @token = response.parsed_response["EnviarInstrucaoUnicaResponse"]["Resposta"]
  haml :check
end
