def min(arr)
    min = arr[0];
    arr.each do |i|
        if min > i 
            min = i
        end
    end
    return min
end


puts min([1,2,3,0])
puts min([34, 15, 88, 21])