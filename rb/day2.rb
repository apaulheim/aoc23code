require 'csv'

input = File.read('day2.txt')
lines = input.split("\n")
games = lines.map do |line|
  _, sets_str = line.split(': ')
  sets_str.split('; ').map do |set|
    set.split(', ').map do |cube|
      num, color = cube.split(' ')
      { color: color, num: num.to_i }
    end
  end
end

silver = games.each_with_index.reduce(0) do |acc, (game, index)|
  acc + (game.all? do |set|
    set.all? do |cube|
      case cube[:color]
      when 'red'
        cube[:num] <= 12
      when 'green'
        cube[:num] <= 13
      when 'blue'
        cube[:num] <= 14
      else
        puts 'parsing error'
        false
      end
    end
  end ? index + 1 : 0)
end

puts "silver #{silver}"

gold = games.reduce(0) do |acc, game|
  red = 0
  green = 0
  blue = 0
  game.each do |set|
    set.each do |cube|
      case cube[:color]
      when 'red'
        red = [red, cube[:num]].max
      when 'green'
        green = [green, cube[:num]].max
      when 'blue'
        blue = [blue, cube[:num]].max
      else
        puts 'parsing error'
      end
    end
  end
  acc + red * green * blue
end

puts "gold #{gold}"
