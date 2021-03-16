def centuryFromYear(year)
    return (year%100 == 0)? year/100: (year - year%100)/100  + 1
end

p centuryFromYear(1705)
p centuryFromYear(1900)
p centuryFromYear(1601)
p centuryFromYear(2000)