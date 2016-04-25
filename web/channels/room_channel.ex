defmodule Heetweet.RoomChannel do
  use Heetweet.Web, :channel

  def join("tweets:lobby", _payload, socket) do
    {:ok, socket}
  end

  # Channels can be used in a request/response fashion
  # by sending replies to requests from the client

  def handle_in("start_stream", payload, socket) do
    stream = ExTwitter.stream_filter(locations: ['-180,-90,180,90'])
    |> Stream.map(fn x -> x.coordinates end)

    # Twitter gives us coordinates in reverse order (long first, then lat)
    for %{coordinates: [lng, lat]} <- stream do
      push socket, "new_tweet", %{lat: lat, lng: lng}
    end

    {:reply, {:ok, payload}, socket}
  end

  # This is invoked every time a notification is being broadcast
  # to the client. The default implementation is just to push it
  # downstream but one could filter or change the event.
  def handle_out(event, payload, socket) do
    push socket, event, payload
    {:noreply, socket}
  end

end
