const logic = {
username : '',
password: '',

    _callUsersApi(path, method = 'get', body) {
       
        if (body) config.body = JSON.stringify(body)

        return fetch('https://localhost:8080' + path)
            .then(res => res.json())
            .then(res => {
                if (res.status === 'KO') throw Error(res.error)

                return res;
            })
    },

    // user's

    registerUser(username, password) {
        const param = {
            "username" : username,
            "password" : password
          } 

       return axios({
            method: 'post',
            url: 'http://localhost:8080/register',
            data: param
         })
          .then(res => {
              
              return res
          })
          .catch(error => {
            
            return error
          })
            
    },

};

//export default logic;
if (typeof module !== 'undefined') module.exports = logic;