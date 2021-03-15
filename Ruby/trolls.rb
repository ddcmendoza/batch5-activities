def remove_vowels(s)
    s.gsub(/[aeiouAEIOU]/i,'')
end


p remove_vowels("The quick brown fox")