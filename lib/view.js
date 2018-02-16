'use strict';
const fs = require('fs');
class View {
    /**
     * 
     * @param {Response} res HTML Response
     * @param {string} file File name
     * @param {Object} data Extra data for putting into the HTML file
     */
    static render(res, file, data){
        if(data === undefined || data === null || !data instanceof Object){
            data = {title: 'General Title'};
        }
        fs.readFile('view/' + file, (err, html) => {
            if(err) throw err;
            var htmlString = html.toString();
            for(let key in data){
                let regExp = new RegExp('{' + key + '}', 'g');
                htmlString = htmlString.replace(regExp, data[key]);
            }
            res.send(htmlString);
        });
    }
}

module.exports = View;