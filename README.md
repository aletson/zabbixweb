# zabbixweb
A frontend monitoring board for Zabbix server.

This is a GUI dashboard for Zabbix hosts. It will list the hostname, OS, Load ÷ CPU cores, number of processes, memory usage, ping, traffic on the default interface, and disk usage.

Installation is super easy:

-Download and extract the files on your Zabbix server, somewhere web-accessible.
-Edit index.html and change the line `var zabbix = new $.zabbix ('http://zabbix.org/zabbix/api_jsonrpc.php', 'guest', '');` as follows:
-Change http://zabbix.org to the IP or DNS name of your Zabbix server (but leave the `/zabbix/api_jsonrpc.php`)
-Change `guest` and the empty string to the username and password (respectively) of a Zabbix user that the GUI will use to access the data.

-You may have to add an item for each of these keys to your host Templates:
-system.cpu.num (Decimal)
-system.cpu.load (float)
-vm.memory.size[total] (Decimal)
-vm.memory.size[free] (Decimal)
-vm.memory.size[cached] (Decimal)
-vm.memory.size[inactive] (Decimal)

-Open a web browser page to http://yourzabbixserver/zabbixweb-0.1-release/index.html

-Enjoy!
