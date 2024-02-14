import { toast } from "react-toastify";

export const SuccessToast = (msg, time) =>  
toast.info(msg, {
    position: "top-right",
    autoClose: time?time:2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });

export const ErrToast = (msg, time) =>  
toast.error(msg, {
    position: "top-right",
    autoClose: time?time:2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });



export const isEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
}


export function isImage(e) {
        var file= e.target?e.target.value:e;
             var reg = /(.*?)\.(jpg|bmp|jpeg|png|svg)$/;
             if(!file.match(reg))
             {
                 
                 return false;
             }
             return true;
             
}

export function isVideo(e) {
        var file= e.target?e.target.value:e;
             var reg = /(.*?)\.(mp4|mov|wmv)$/;
             if(!file.match(reg))
             {
                
                 return false;
             }
             return true;
             
}

export function isAudio(e) {
        var file= e.target?e.target.value:e;
             var reg = /(.*?)\.(mp3|weba)$/;
             if(!file.match(reg))
             {
                 
                 return false;
             }
             return true;
             
} 


function getCookie(cName) {
    const name = cName + "=";
    const cDecoded = decodeURIComponent(document.cookie); //to be careful
    const cArr = cDecoded .split('; ');
    let res;
    cArr.forEach(val => {
        if (val.indexOf(name) === 0) res = val.substring(name.length);
    })
    return res;
}

export const setCookie = (cName, data, hrs) => {
    let date = new Date();
    date.setTime(date.getTime()+(hrs*60*60*1000));
    document.cookie = cName + " = " + JSON.stringify(data) + "; expires = " +date.toGMTString();
}



export const isAuthenticated = () => {
    
    if(getCookie("user"))
    {
        return JSON.parse(getCookie("user"))
    }
    else{
       return false
    }
}


export const getPlayer = () => {
    if(getCookie("player"))
    {
        return JSON.parse(getCookie("player"))
    }
    else{
       return false
    }
}


export const getDisplayFormatDate = (date) => {
    const InputDate = new Date(date)
    const month = InputDate.toLocaleString('default', { month: 'long', });
    const day = InputDate.getDate();
    const year = InputDate.getFullYear()
    const formattedDate = day +" "+ month+" "+ year
    return formattedDate;
}



export const getTimeDifference = (time) => {
    var currTime = new Date();
    var InputTime = new Date(time)
    const diff =  currTime - InputTime;
    return Math.floor(diff/1e3);
}



export const areEqualArr = (arr1,arr2) => {
    let result = true
    if(arr1.length==arr2.length)
      {
        arr2.map((obj, i) => {
            if(!arr1.includes(parseInt(obj)))
            {
              return false
            }
          })
      }
      else{
        result = false
      }
      return result
}