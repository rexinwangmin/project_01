// // 定义options参数对象
// let options = {
//     methods: '',
//     url: '',
//     data: '',
//     success: function(res) {

//     }

// }

// 将参数对象转换为字符串
function resolveData(data) {
    let arr = []

    for(let k in data ){
        let str = k + '=' + data[k]
        arr.push(str)
    }
    return arr.join('&')
}

// console.log( resolveData({1:1,age:20}))

function itheima(options) {
    let xhr = new XMLHttpRequest()

    // 把外界传递过来的参数对象，转换为查询字符串
    let qs = resolveData(options.data)

    if(options.method.toUpperCase() === 'GET'){
        // 发起get请求
        xhr.open(options.method, options.url + '?' + qs)
        xhr.send()
    }
    else if(options.method.toUpperCase() === 'POST'){
        // 发起post请求
        xhr.open(options.method, options.url)
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        xhr.send(qs)
    }

    xhr.onreadystatechange = function() {
        if(xhr.readyState === 4 && xhr.status === 200){
            let result = JSON.parse(xhr.responseText)
            options.success(result)
        }
    }
}

