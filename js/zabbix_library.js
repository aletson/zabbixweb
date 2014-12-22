//Congratulations! You get to see the result of my failure to adequately figure out callbacks and promises - hence the synchronous server pings.

//If you fix this up to suck less, please do let me know.
(function($) {
    $.zabbix = function(url, user, password) {
//	this.apiversion = apiversion;
       this.url = url;
        this.user = user;
        this.password = password;
        this.rpcid = 0;
        this.authid = null;

        this.call = function(method, params) { //i.e.: zabbix.call('host.get', {"search" : {"host" : ""}, "groupids" : "2", "output" : "extend", "sortfield" : "host", "searchWildcardsEnabled" : 1});
            var self = this;
            var result = new String;
            this.makeAjaxCall(self, method, params, function(data) {
                result = data.result;
            });
            return result; //screw you scoping

        };

        this.getApiVersion = function() {
			var self = this;
            var result = this.call('apiinfo.version', {});
			self.apiversion = result;
            return result;
        };

        this.authenticate = function() {
            this.rpcid = 0;
            var self = this;
			if(self.apiversion >= '2.4.3') {
				var authID = this.call('user.login', {
					'user': this.user,
					'password' : this.password
				});
			} else {
				var authID = this.call('user.authenticate', {
					'user': this.user,
					'password' : this.password
				});
			}
            self.authid = authID;
        };

        this.makeAjaxCall = function(self, method, params, callback) {
            $.ajax(
                {
                    type: 'POST',
                    url: self.url,
                    dataType: 'json',
                    async: false, //Like I said.
                    headers: {'Content-Type' : 'application/json-rpc'},
                    data: JSON.stringify({jsonrpc : '2.0', id: ++self.rpcid, auth: self.authid, method: method, params: params})
                })

                .done(callback)
                .fail(function(jqXHR) {
                    throw new Error(jqXHR.status + ' ' + jqXHR.statusText);
                });
        };


    } //Ends the plugin.


})(window.jQuery); //function($)


