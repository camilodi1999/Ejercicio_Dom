const url = 'https://gist.githubusercontent.com/josejbocanegra/b1873c6b7e732144355bb1627b6895ed/raw/d91df4c8093c23c41dce6292d5c1ffce0f01a68b/newDatalog.json';

fetch(url).then(response => response.json())
    .then(data => {
        console.log(data);
        for (i = 0; i<data.length; i++){
            let text = document.createTextNode("events: "+ data[i].events +", squirrel: "+ data[i].squirrel);
            let tag = document.createElement("p");
            tag.appendChild(text);
            let element = document.getElementsByTagName("body")[0];
            element.appendChild(tag);
        }
    });


