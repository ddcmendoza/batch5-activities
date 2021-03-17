def formatter(list)
    str = ''
    list.each_with_index do |item,index|
        if index < list.length - 2
            str += item[:name] + ", "
        elsif index == list.length - 1
            str += item[:name]
        elsif index == list.length - 2
            str += item[:name] + " & "
        end
    end
    return str
end

p formatter([{name: 'Bart'},{name: 'Lisa'},{name: 'Maggie'}])
p formatter([{name: 'Bart'},{name: 'Lisa'}])
p formatter([{name: 'Bart'}])
p formatter([])