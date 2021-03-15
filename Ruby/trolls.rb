def remove_vowels(s)
    s.gsub(/[aeiou]/i,'')
end


p remove_vowels("The quick brown fox")