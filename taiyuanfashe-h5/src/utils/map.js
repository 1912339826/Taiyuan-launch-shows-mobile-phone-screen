export function TMapCreate() {
    return new Promise(function(resolve, reject) {
        window.init = function() {
            resolve(qq)
        }
        var script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = 'http://map.qq.com/api/js?v=2.exp&callback=init&key=LZEBZ-F4OK5-ADZIG-QOGZM-UT7IZ-VBFTU'
        script.onerror = reject
        document.head.appendChild(script)
    })
}

export function TMap() {
    return new Promise(function(resolve, reject) {
        window.init = function() {
            resolve(qq)
        }
        var script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = 'http://map.qq.com/api/js?v=2.exp&callback=init&key=LZEBZ-F4OK5-ADZIG-QOGZM-UT7IZ-VBFTU'
        script.onerror = reject
        // document.head.appendChild(script)
    })
}

