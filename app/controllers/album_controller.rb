class AlbumController < ApplicationController
  def index
	require "net/http"

	uri = URI.parse("https://itunes.apple.com/search")
	args = {term: params["string"], media: "music"}
	uri.query = URI.encode_www_form(args)
	http = Net::HTTP.new(uri.host, uri.port)
	http.use_ssl = true

	request = Net::HTTP::Get.new(uri.request_uri)

	response = http.request(request)
	render :json => response.body
  end
end