
const response = (userMessage) => {
    let responseBot = '';
    switch (userMessage) {
        case 'hola camarada bot':
            responseBot = 'foo';
            return responseBot;
        case 'adios camarada bot':
            responseBot = 'foo2';
            return responseBot;
        case 'lofi':
            responseBot = 'https://www.youtube.com/watch?v=5qap5aO4i9A'
            return responseBot;
            // Default
        default:
            responseBot = 'No entender ah';
            return responseBot;
    }

};

exports.response = response;
