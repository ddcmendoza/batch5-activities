=begin Activity:
1. Create a dictionary (hash) with 10 city names, where the city name (key) will be a string, and the area code would be the value.
2. Display the city names to the user for cities which are available in the dictionary
3. Get input from the user on the city name
4. Display area code based on user's city choice
5. Loop - keep the program running and prompt the user for new city names to lookup
6. Complete the two methods to lookup city names and to find area code based on city names
=end

dial_book = {
    "newyork" => "212",
    "newbrunswick" => "732",
    "edison" => "908",
    "plainsboro" => "609",
    "sanfrancisco" => "301",
    "miami" => "305",
    "paloalto" => "650",
    "evanston" => "847",
    "orlando" => "407",
    "lancaster" => "717"
  }
# Get city names from the hash
def get_city_names(somehash)
    somehash.keys
# Write code here
end
# Get area code based on given hash and key
def get_area_code(somehash, key)
# Write code here
    res = somehash[key]
    res ||= "not available"
end
ans = nil
# Execution flow
loop do
# Write your program execution code here
p "List of available cities:"
p get_city_names(dial_book)
p "Type city name to get area code: (type 'x' to end program)"
ans = gets.chomp
break if ans == 'x'
p "The area code is #{get_area_code(dial_book, ans.downcase)}"
p '-----------------------------------------------------------'
end

