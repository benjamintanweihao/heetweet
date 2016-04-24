ExUnit.start

Mix.Task.run "ecto.create", ~w(-r Heetweet.Repo --quiet)
Mix.Task.run "ecto.migrate", ~w(-r Heetweet.Repo --quiet)
Ecto.Adapters.SQL.begin_test_transaction(Heetweet.Repo)

