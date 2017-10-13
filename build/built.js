/*! my-grunt-project - v1.0.0 - 2017-09-28 */
(function(window,undefined){
    function add(a,b){
        return a + b;
    }
    var addresult = add(10,100);
    $('#mygrunt').html('10+100的结果为' + addresult + '你也来试试！');
})(window);
;(function(window,undefined){
    console.log('i am from test2.js');
})(window);