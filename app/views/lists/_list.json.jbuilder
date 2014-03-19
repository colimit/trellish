json.(list, :id ,:title, :rank, :created_at, :updated_at, :board_id)

json.moves { json.array! @moves } if @moves
