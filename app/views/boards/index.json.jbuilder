json.array!(@board) do |board|
  json.partial!("boards/board", :board => board)
en