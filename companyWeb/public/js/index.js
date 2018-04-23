window.onload = function(){
    var Paper = Raphael('pos', 1000, 130);
    var p = Paper.image('../images/pos.jpg',0, 0, 120, 120);

    // p.attr('height',180);
    p.animate({"transform":"t800,100r65t-100,10 r205t"},1000,'bounce',function(r){
        // console.log(r);
    });
    p.click(function(res){
      alert(123);
      console.log(res);
    })
    //     var circle = paper.circle(10, 50, 10)
    //     circle.attr({"fill":"yellow"})
    //     circle.animate({cx: 10, cy: 20, r: 8, "fill": "blue"},1000,function(){
    //     });
      // var rect = paper.rect(50, 50, 50, 50);
      // rect.attr("fill", "blue");
      // rect.attr("stroke", "#fff");

      // rect.translate(50,50);

}
