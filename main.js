const url = 'https://gist.githubusercontent.com/josejbocanegra/b1873c6b7e732144355bb1627b6895ed/raw/d91df4c8093c23c41dce6292d5c1ffce0f01a68b/newDatalog.json';

fetch(url).then(response => response.json())
    .then(data => {
        const tbody = document.getElementById("bodyT1");
        let list_event = [];
        for (i = 0; i<data.length;i++){
            let tr = document.createElement("tr");
            let eventos = data[i].events;
            let td1 = document.createElement("td");
            td1.innerHTML = i+1;
            tr.appendChild(td1);
            let td2 = document.createElement("td");
            for(j = 0; j<eventos.length; j++){
                td2.innerHTML += eventos[j];
                if (j+1<eventos.length){
                    td2.innerHTML += ', ';
                }
            }
            tr.appendChild(td2);
            let td3 = document.createElement("td");
            let squirrel = data[i].squirrel;
            td3.innerHTML = squirrel;
            tr.appendChild(td3);
            if (Boolean(squirrel)){
                tr.style.backgroundColor = "#f9c6cb";
            }
            tbody.appendChild(tr);
            list_event.push(...eventos);
        }
        list_event = [... new Set(list_event)];
        let conteoTP = {};
        
        for (i = 0; i<list_event.length;i++){
            conteoTP[list_event[i]] = 0;
        }

        let conteoTN = {...conteoTP};
        let conteoFP = {...conteoTP};
        let conteoFN = {...conteoTP};
        let mcc = {...conteoTP};
        for (i = 0; i<data.length;i++){
            let eventos = data[i].events;
            let squirrel = data[i].squirrel;
            if(Boolean(squirrel)){
                for(j = 0; j<list_event.length; j++){
                    let esta = false;
                    for(k = 0; k<eventos.length;k++){
                        if(list_event[j] == eventos[k]){
                            esta = true
                        }
                    }
                    if(esta){
                        conteoTP[list_event[j]] +=1;
                    }
                    else{
                        conteoFP[list_event[j]] += 1;
                    }
                }
            }
            else{
                for(j = 0; j<list_event.length; j++){
                    let esta = false;
                    for(k = 0; k<eventos.length;k++){
                        if(list_event[j] == eventos[k]){
                            esta = true
                        }
                    }
                    if(esta){
                        conteoFN[list_event[j]] +=1;
                    }
                    else{
                        conteoTN[list_event[j]] += 1;
                    }
                }
            }
         
        }
        for(i=0; i<list_event.length;i++){
            
            let TP = conteoTP[list_event[i]];
            let TN = conteoTN[list_event[i]];
            let FP = conteoFP[list_event[i]];
            let FN = conteoFN[list_event[i]];
            mcc[list_event[i]] = ((TP*TN)-(FP*FN))/(Math.sqrt((TP+FP)*(TP+FN)*(TN+FP)*(TN+FN)));
        }
        
        var sortable = [];
        for(i= 0 ;i<list_event.length;i++){
            sortable.push([list_event[i],mcc[list_event[i]]]);
        }
        sortable.sort(function(a,b){
            return  b[1] - a[1];
        });
        
        const tbody2 = document.getElementById("bodyT2");
        for (i = 0; i<sortable.length;i++){
            let tr = document.createElement("tr");
            let evento = sortable[i];
            let td1 = document.createElement("td");
            td1.innerHTML = i+1;
            tr.appendChild(td1);
            let td2 = document.createElement("td");
            td2.innerHTML = evento[0];
            tr.appendChild(td2);
            let td3 = document.createElement("td");
            td3.innerHTML = evento[1];
            tr.appendChild(td3);
            tbody2.appendChild(tr);
            
        }
    });


