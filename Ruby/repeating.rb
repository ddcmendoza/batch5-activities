=begin Given a string s consisting of small English letters, find and return the first instance of a non-repeating character in it. If there is no such character, return '_'.
Example
For s = "abacabad", the output should be
firstNotRepeatingCharacter(s) = 'c'.
There are 2 non-repeating characters in the string: 'c' and 'd'. Return c since it appears in the string first.
For s = "abacabaabacaba", the output should be
firstNotRepeatingCharacter(s) = '_'.
There are no characters in this string that do not repeat.
Input/Output
[input] string s
A string that contains only lowercase English letters.
Guaranteed constraints:
1 ≤ s.length ≤ 105.
[output] char
The first non-repeating character in s, or '_' if there are no characters that do not repeat. 
=end

def firstNotRepeatingCharacter(s)
    counts = Hash.new(0)
    tmp = s.split("")
    tmp.each { |item| counts[item] += 1 }
    ans = s.length
    flag = false
    for i in counts
        if i[1] == 1
            flag = true
            ans = (s.index(i[0])<ans)? s.index(i[0]) : ans
        end
    end
    if flag
        return s[ans]
    else
        return -1
    end
end

p firstNotRepeatingCharacter("abacabad")
p firstNotRepeatingCharacter("abacabaabacaba")