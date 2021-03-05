module PortableDevice
    attr_accessor :battery_level
    def initialize
        self.battery_level = 52
    end
    def check_cell_signal
        puts "Searching cell site..."
    end
    def charge
        self.battery_level += 1
    end
end

module ComputeDevice
    def boot
        puts "Booting device..."
    end
end



class Phone
    include PortableDevice
    include ComputeDevice
end
class Laptop
    include PortableDevice
    include ComputeDevice
end
class Computer
    include ComputeDevice
end

ph = Phone.new
l = Laptop.new
c = Computer.new

c.boot
ph.boot
l.boot
p ph.battery_level
p l.battery_level
ph.check_cell_signal
l.check_cell_signal
ph.charge
l.charge
p l.battery_level
p ph.battery_level
