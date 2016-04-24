defmodule Heetweet.PageController do
  use Heetweet.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
