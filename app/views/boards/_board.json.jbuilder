json.(board, :id, :title, :url, :created_at, :updated_at)

cards ||= nil
unless cards.nil?
  json.cards(cards) do |card|
    json.(card, :title, :description, :rank, :created_at, :updated_at, :list_id)
  end
end