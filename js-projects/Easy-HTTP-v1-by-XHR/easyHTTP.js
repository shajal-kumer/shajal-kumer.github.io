(function (global) { 
    function easyHTTP() { 
        this.http = new XMLHttpRequest();
     }
     // Make an HTTP get REquest
     easyHTTP.prototype.get = function(url, calback) {
        this.http.open('GET', url, true);
    
        let self = this;
        this.http.onload = function () { 
            if(self.http.status === 200) {
                calback(null, self.http.responseText);
            } else {
                calback('Error: '+ self.http.status);
            }
         };
    
        this.http.send();
     };
    
     // Make an HTTP POST Request

    easyHTTP.prototype.post = function (url, data, calback) {
        this.http.open('POST', url, true);
        this.http.setRequestHeader('Content-type', 'application/json');
        
        let self = this;
        this.http.onload = function () { 
            
                calback(null, self.http.responseText);
          
         };

        this.http.send(JSON.stringify(data));
      };
    
     // Make an HTTP Put Request
      
     easyHTTP.prototype.put = function (url, data, calback) {
        this.http.open('PUT', url, true);
        this.http.setRequestHeader('Content-type', 'application/json');
        
        let self = this;
        this.http.onload = function () { 
            
                calback(null, self.http.responseText);
          
         };

        this.http.send(JSON.stringify(data));
      };
    
    
     // Make an HTTP DELETE Request

     easyHTTP.prototype.delete = function(url, calback) {
        this.http.open('DELETE', url, true);
    
        let self = this;
        this.http.onload = function () { 
            if(self.http.status === 200) {
                calback(null, 'Post Deleted');
            } else {
                calback('Error: '+ self.http.status);
            }
         };
    
        this.http.send();
     };


     global.easyHTTP = new easyHTTP;
 }(window));


