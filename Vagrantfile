Vagrant.configure(2) do |config|

    config.vm.box = "ubuntu/trusty64" 
    config.ssh.insert_key = true

    config.vm.provider "virtualbox" do |v|
      v.memory = 8000
      v.cpus = 4
    end

    config.vm.network :forwarded_port, host: 8012, guest: 80 # Apache
    config.vm.network :forwarded_port, host: 9207, guest: 9200 # ElasticSearch

    config.vm.provision "ansible_local" do |ansible|
        ansible.playbook = "provision/rolesplaybook.yaml"
    end

    config.vm.provision "ansible_local" do |ansible|
        ansible.playbook = "provision/playbook.yaml"
    end

end