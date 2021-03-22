require 'set'
a = [0,0,1,0,0]
b = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
c = [1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]

def find_uniq(arr)
    a = Set.new(arr)
    a.each do |x|
        if arr.count(x) == 1
            return x
        end
    end
end
p find_uniq(a)
p find_uniq(b)
p find_uniq(c)
